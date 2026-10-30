/* =========================================================================
   Cosmica — js/events.js : the sky calendar, all computed on the device (no internet).
   Moon phases · lunar & solar eclipses (with "can I see it from here?") · planet conjunctions ·
   Moon–planet meetings · oppositions · greatest elongations · equinoxes/solstices · meteor showers ·
   the analemma and the length of the day.
   No DOM in here, so it is unit-tested in Node (tests/events.test.js).
   ========================================================================= */
(function (root) {
  'use strict';
  var A = root.Astronomy, X = root.Cosmica = root.Cosmica || {}, astro = X.astro;
  var E = X.events = {};
  var D2R = Math.PI / 180, R2D = 180 / Math.PI, H = 3600000, DAY = 86400000, MIN = 60000;
  var T = function (m) { return A.MakeTime(new Date(m)); };
  var ms = function (t) { return t && t.date ? t.date.getTime() : (t instanceof Date ? t.getTime() : null); };
  var wrap180 = function (d) { d = ((d + 180) % 360 + 360) % 360 - 180; return d; };

  /* ---------------------------------------------------------------- geocentric positions */
  var geo = function (body, m) { var v = A.GeoVector(body, T(m), true), e = A.Ecliptic(v); return { lon: e.elon, lat: e.elat, v: v }; };
  var angle = function (a, b) { return A.AngleBetween(a, b); };

  /** find the instant in [a, b] where f changes sign (bisection), to about 20 seconds */
  var bisect = function (f, a, b) {
    var fa = f(a); for (var i = 0; i < 40 && b - a > 20000; i++) { var m = (a + b) / 2, fm = f(m); if ((fm <= 0) === (fa <= 0)) { a = m; fa = fm; } else b = m; }
    return (a + b) / 2;
  };

  /* ---------------------------------------------------------------- Moon phases */
  var FOLK = ['wolf', 'snow', 'worm', 'pink', 'flower', 'strawberry', 'buck', 'sturgeon', 'harvest', 'hunter', 'beaver', 'cold'];
  E.FOLK = FOLK;
  /** new / first quarter / full / last quarter moons between two instants. Full moons carry distance, super/micro/blue flags. */
  E.moonPhases = function (startMs, endMs, tz) {
    var out = [], full = [], mq = A.SearchMoonQuarter(new Date(startMs - 36 * DAY));
    for (var guard = 0; guard < 80; guard++) {
      var tm = ms(mq.time), q = mq.quarter;
      if (tm > endMs) break;
      var rec = { type: 'phase', q: q, t: tm };
      if (q === 0 || q === 2) {
        var km = geo(A.Body.Moon, tm).v; km = Math.sqrt(km.x * km.x + km.y * km.y + km.z * km.z) * A.KM_PER_AU;
        rec.km = Math.round(km); rec.near = km <= 361900; rec.far = km >= 405000;
      }
      if (q === 2) {
        var p = astro.tzParts(tm, tz); rec.month = p.mo; rec.folk = FOLK[p.mo - 1]; rec.ym = p.y * 12 + p.mo - 1;
        var prev = full[full.length - 1]; rec.blue = !!(prev && prev.ym === rec.ym); full.push(rec);
      }
      if (tm >= startMs) out.push(rec);
      mq = A.NextMoonQuarter(mq);
    }
    return out;
  };

  /* ---------------------------------------------------------------- eclipses */
  var moonAlt = function (m, loc) { return astro.altaz(A.Body.Moon, m, loc).alt; };
  var sunAlt = function (m, loc) { return astro.altaz(A.Body.Sun, m, loc).alt; };
  var upCount = function (list) { var n = 0; list.forEach(function (x) { if (x > 0) n++; }); return n; };

  E.lunarEclipses = function (startMs, endMs, loc) {
    var out = [], e = A.SearchLunarEclipse(new Date(startMs));
    for (var guard = 0; guard < 12; guard++) {
      var pk = ms(e.peak); if (pk > endMs) break;
      var span = function (sd) { return sd > 0 ? [pk - sd * MIN, pk + sd * MIN] : null; };
      var pen = span(e.sd_penum), par = span(e.sd_partial), tot = span(e.sd_total);
      var outer = pen, kind = e.kind === A.EclipseKind.Total ? 'total' : e.kind === A.EclipseKind.Partial ? 'partial' : 'penumbral';
      var core = kind === 'penumbral' ? pen : par;           // the part worth watching
      var alts = loc ? [moonAlt(core[0], loc), moonAlt(pk, loc), moonAlt(core[1], loc)] : [];
      out.push({
        type: 'lunar-eclipse', kind: kind, t: pk, pen: pen, partial: par, total: tot, outer: outer,
        alt: loc ? { start: alts[0], peak: alts[1], end: alts[2] } : null,
        vis: !loc ? null : upCount(alts) === 3 ? 'full' : upCount(alts) > 0 ? 'part' : 'none'
      });
      e = A.NextLunarEclipse(e.peak);
    }
    return out;
  };

  E.solarEclipses = function (startMs, endMs, loc) {
    var out = [], g = A.SearchGlobalSolarEclipse(new Date(startMs)), o = loc ? astro.observer(loc) : null;
    for (var guard = 0; guard < 12; guard++) {
      var pk = ms(g.peak); if (pk > endMs) break;
      var rec = {
        type: 'solar-eclipse', kind: g.kind === A.EclipseKind.Total ? 'total' : g.kind === A.EclipseKind.Annular ? 'annular' : 'partial', t: pk,
        lat: g.latitude, lon: g.longitude, local: null, vis: loc ? 'none' : null
      };
      if (o) {
        var l = null; try { l = A.SearchLocalSolarEclipse(new Date(pk - 2 * DAY), o); } catch (err) { l = null; }
        if (l && Math.abs(ms(l.peak.time) - pk) < 1.5 * DAY) {
          var a0 = l.partial_begin.altitude, a1 = l.peak.altitude, a2 = l.partial_end.altitude;
          rec.local = {
            kind: l.kind === A.EclipseKind.Total ? 'total' : l.kind === A.EclipseKind.Annular ? 'annular' : 'partial', obscuration: l.obscuration,
            begin: ms(l.partial_begin.time), peak: ms(l.peak.time), end: ms(l.partial_end.time), alt: { begin: a0, peak: a1, end: a2 },
            totalBegin: l.total_begin ? ms(l.total_begin.time) : null, totalEnd: l.total_end ? ms(l.total_end.time) : null
          };
          rec.vis = a1 > 0 && a0 > 0 && a2 > 0 ? 'full' : upCount([a0, a1, a2]) > 0 ? 'part' : 'none';
          if (rec.local.obscuration < 0.001) rec.vis = 'none';
        }
      }
      out.push(rec);
      g = A.NextGlobalSolarEclipse(g.peak);
    }
    return out;
  };

  /* ---------------------------------------------------------------- planets */
  var OUTER = [['mars', A.Body.Mars], ['jupiter', A.Body.Jupiter], ['saturn', A.Body.Saturn], ['uranus', A.Body.Uranus], ['neptune', A.Body.Neptune]];
  E.oppositions = function (startMs, endMs) {
    var out = [];
    OUTER.forEach(function (p) {
      var from = startMs - DAY;
      for (var guard = 0; guard < 4; guard++) {
        var ev = A.SearchRelativeLongitude(p[1], 0, new Date(from)), tm = ms(ev); if (tm > endMs) break;
        if (tm >= startMs) out.push({ type: 'opposition', id: p[0], t: tm, mag: A.Illumination(p[1], ev).mag, au: geo(p[1], tm).v.Length() });
        from = tm + 30 * DAY;
      }
    });
    return out;
  };

  E.elongations = function (startMs, endMs) {
    var out = [];
    [['mercury', A.Body.Mercury], ['venus', A.Body.Venus]].forEach(function (p) {
      var from = startMs - DAY;
      for (var guard = 0; guard < 12; guard++) {
        var ev = A.SearchMaxElongation(p[1], new Date(from)), tm = ms(ev.time); if (tm > endMs) break;
        if (tm >= startMs) out.push({ type: 'elongation', id: p[0], t: tm, evening: ev.visibility === 'evening', deg: ev.elongation });
        from = tm + 3 * DAY;
      }
    });
    return out;
  };

  E.seasons = function (startMs, endMs) {
    var out = [], y0 = new Date(startMs).getUTCFullYear(), y1 = new Date(endMs).getUTCFullYear();
    for (var y = y0; y <= y1; y++) {
      var s = A.Seasons(y);
      [['mar', s.mar_equinox], ['jun', s.jun_solstice], ['sep', s.sep_equinox], ['dec', s.dec_solstice]].forEach(function (k) {
        var tm = ms(k[1]); if (tm >= startMs && tm <= endMs) out.push({ type: 'season', key: k[0], t: tm });
      });
    }
    return out;
  };

  var BRIGHT = [['mercury', A.Body.Mercury], ['venus', A.Body.Venus], ['mars', A.Body.Mars], ['jupiter', A.Body.Jupiter], ['saturn', A.Body.Saturn]];
  var elong = function (body, m) { return A.AngleFromSun(body, T(m)); };

  /** planets passing close to each other (conjunction in ecliptic longitude), and the Moon passing planets */
  E.conjunctions = function (startMs, endMs, opt) {
    opt = opt || {}; var maxPP = opt.maxPlanet || 5, maxMoon = opt.maxMoon || 3.5, out = [], i, j;
    var step = DAY, n = Math.ceil((endMs - startMs) / step) + 2, grid = [];
    for (i = 0; i < n; i++) { var tm = startMs - step + i * step, row = {}; BRIGHT.forEach(function (p) { row[p[0]] = geo(p[1], tm).lon; }); grid.push({ t: tm, lon: row }); }
    for (i = 0; i < BRIGHT.length; i++) for (j = i + 1; j < BRIGHT.length; j++) {
      var a = BRIGHT[i], b = BRIGHT[j];
      for (var k = 0; k < grid.length - 1; k++) {
        var d0 = wrap180(grid[k].lon[a[0]] - grid[k].lon[b[0]]), d1 = wrap180(grid[k + 1].lon[a[0]] - grid[k + 1].lon[b[0]]);
        if (Math.abs(d0) > 60 || Math.abs(d1) > 60 || (d0 <= 0) === (d1 <= 0)) continue;
        var f = function (m) { return wrap180(geo(a[1], m).lon - geo(b[1], m).lon); };
        var tc = bisect(f, grid[k].t, grid[k + 1].t); if (tc < startMs || tc > endMs) continue;
        var sep = angle(geo(a[1], tc).v, geo(b[1], tc).v);
        if (sep > maxPP || elong(a[1], tc) < 12 || elong(b[1], tc) < 12) continue;
        out.push({ type: 'conj', a: a[0], b: b[0], t: tc, sep: sep });
      }
    }
    /* the Moon: ~every 27 days it passes each planet; keep the close ones that are not lost in the Sun's glare */
    var ms6 = 6 * H, nm = Math.ceil((endMs - startMs) / ms6) + 2, moonLon = [], tt = [];
    for (i = 0; i < nm; i++) { tt.push(startMs - ms6 + i * ms6); moonLon.push(geo(A.Body.Moon, tt[i]).lon); }
    BRIGHT.forEach(function (p) {
      var pl = tt.map(function (m) { return geo(p[1], m).lon; });
      for (var q = 0; q < nm - 1; q++) {
        var e0 = wrap180(moonLon[q] - pl[q]), e1 = wrap180(moonLon[q + 1] - pl[q + 1]);
        if (Math.abs(e0) > 60 || Math.abs(e1) > 60 || (e0 <= 0) === (e1 <= 0)) continue;
        var g = function (m) { return wrap180(geo(A.Body.Moon, m).lon - geo(p[1], m).lon); };
        var tc2 = bisect(g, tt[q], tt[q + 1]); if (tc2 < startMs || tc2 > endMs) continue;
        var s2 = angle(geo(A.Body.Moon, tc2).v, geo(p[1], tc2).v);
        if (s2 > maxMoon || elong(p[1], tc2) < 20 || (p[0] === 'mercury' && elong(p[1], tc2) < 15)) continue;
        out.push({ type: 'moonconj', id: p[0], t: tc2, sep: s2, illum: A.Illumination(A.Body.Moon, T(tc2)).phase_fraction });
      }
    });
    return out;
  };

  /* ---------------------------------------------------------------- meteor showers */
  var PREC = 0.0139697;                         // degrees per year the equinox moves (J2000 → date)
  var radiantAlt = function (sh, m, loc) { var t = T(m), hor = A.Horizon(t, astro.observer(loc), sh.ra, sh.dec, 'normal'); return hor.altitude; };
  /** the instant a shower peaks in a given year (from its solar longitude) */
  E.meteorPeak = function (sh, year) {
    var lon = sh.sl + PREC * (year + 0.5 - 2000), r = A.SearchSunLongitude(((lon % 360) + 360) % 360, new Date(Date.UTC(year, 0, 1)), 367);
    return r ? ms(r) : null;
  };
  E.meteors = function (startMs, endMs, loc, tz) {
    var out = [], list = X.meteors || [], y0 = new Date(startMs).getUTCFullYear(), y1 = new Date(endMs).getUTCFullYear();
    list.forEach(function (sh) {
      for (var y = y0; y <= y1; y++) {
        var pk = E.meteorPeak(sh, y); if (pk == null || pk < startMs - 12 * H || pk > endMs) continue;
        var rec = { type: 'meteor', id: sh.id, t: pk, zhr: sh.zhr, moon: A.Illumination(A.Body.Moon, T(pk)).phase_fraction };
        if (loc) {
          var dark = 0, moonUp = 0, best = null, bestFree = null, run = [];
          for (var h = -16; h <= 16; h++) {
            var m = pk + h * H, sa = sunAlt(m, loc); if (sa > -12) continue;
            var ra = radiantAlt(sh, m, loc), ma = moonAlt(m, loc); dark++; if (ma > 0) moonUp++;
            if (!best || ra > best.alt) best = { t: m, alt: ra, moonAlt: ma };
            if (ma <= 0 && (!bestFree || ra > bestFree.alt)) bestFree = { t: m, alt: ra, moonAlt: ma };
            if (ra >= 20 && ma <= 5) run.push(m);
          }
          rec.best = best; rec.bestFree = bestFree; rec.dark = dark;
          rec.watch = run.length ? [run[0], run[run.length - 1] + H] : null;
          var impact = dark ? rec.moon * (moonUp / dark) : 1;
          rec.impact = impact;
          var rate = !best || best.alt < 10 ? 'unseen' : impact < 0.2 ? 'great' : impact < 0.5 ? 'good' : impact < 0.75 ? 'fair' : 'poor';
          var cap = sh.zhr < 8 ? 'fair' : sh.zhr < 15 ? 'good' : 'great', order = ['unseen', 'poor', 'fair', 'good', 'great'];
          rec.rating = order.indexOf(rate) > order.indexOf(cap) ? cap : rate;      // a shower with only a handful of meteors an hour is never "great"

        }
        out.push(rec);
      }
    });
    return out;
  };

  /* ---------------------------------------------------------------- everything in one sorted list */
  var cache = { key: '', val: null };
  /** all events from `startMs` for `days` days, soonest first. loc/tz make eclipse and meteor visibility personal. */
  E.upcoming = function (startMs, days, loc, tz) {
    var key = [Math.floor(startMs / DAY), days, loc && loc.lat.toFixed(2), loc && loc.lon.toFixed(2), tz].join('|');
    if (cache.key === key) return cache.val;
    var end = startMs + days * DAY, all = [].concat(
      E.moonPhases(startMs, end, tz), E.lunarEclipses(startMs, end, loc), E.solarEclipses(startMs, end, loc), E.oppositions(startMs, end),
      E.elongations(startMs, end), E.conjunctions(startMs, end), E.seasons(startMs, end), E.meteors(startMs, end, loc, tz)
    );
    all.sort(function (p, q) { return p.t - q.t; });
    all.forEach(function (e) { e.uid = E.idOf(e); });
    cache = { key: key, val: all }; return all;
  };
  var ymd = function (m) { var d = new Date(m); return d.getUTCFullYear() + ('0' + (d.getUTCMonth() + 1)).slice(-2) + ('0' + d.getUTCDate()).slice(-2); };
  /** a stable id, the same on every device (used for reminders and calendar files) */
  E.idOf = function (e) {
    var k = e.type === 'phase' ? 'q' + e.q : e.type === 'meteor' ? e.id : e.type === 'conj' ? e.a + '-' + e.b : e.type === 'moonconj' || e.type === 'opposition' || e.type === 'elongation' ? e.id + (e.type === 'elongation' ? (e.evening ? 'e' : 'w') : '') : e.type === 'season' ? e.key : e.kind;
    return e.type + ':' + k + ':' + ymd(e.t);
  };

  /** events "worth a notification" for the Today card: eclipses you can see, meteor showers that are not ruined, close conjunctions, oppositions */
  E.notable = function (e) {
    if (e.type === 'lunar-eclipse') return e.vis !== 'none' && e.kind !== 'penumbral';
    if (e.type === 'solar-eclipse') return e.vis !== 'none';
    if (e.type === 'meteor') return e.rating === 'great' || e.rating === 'good';
    if (e.type === 'conj') return e.sep <= 2;
    if (e.type === 'opposition') return true;
    if (e.type === 'phase') return e.q === 2 && (e.near || e.blue);
    return false;
  };

  /* ---------------------------------------------------------------- the Sun through the year */
  /** equation of time in minutes (apparent minus mean solar time): about −14 in mid-February, +16 in early November */
  E.equationOfTime = function (m) {
    var t = T(m), Tc = t.tt / 36525, L0 = 280.46646 + 36000.76983 * Tc, sp = A.SunPosition(t), lam = sp.elon * D2R, eps = (23.4392911 - 0.0130042 * Tc) * D2R;
    var ra = Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)) * R2D;
    return wrap180(L0 - 0.0057183 - ra) * 4;
  };

  /** where the Sun is at the same clock time on every 4th day of a year — traces the figure-8 "analemma" */
  E.analemma = function (loc, tz, year, hour) {
    hour = hour == null ? 12 : hour; var pts = [];
    for (var d = 0; d < 366; d += 4) {
      var wall = Date.UTC(year, 0, 1 + d, Math.floor(hour), Math.round((hour % 1) * 60)), g = wall - astro.tzOffset(wall, tz), m = wall - astro.tzOffset(g, tz);
      var s = astro.altaz(A.Body.Sun, m, loc); pts.push({ d: d, t: m, alt: s.alt, az: s.az, dec: s.dec, eot: E.equationOfTime(m) });
    }
    return pts;
  };

  /** length of daylight through a year (every 5th day) */
  E.dayLengths = function (loc, tz, year) {
    var out = [];
    for (var d = 0; d < 366; d += 5) {
      var m = Date.UTC(year, 0, 1 + d, 12, 0) - astro.tzOffset(Date.UTC(year, 0, 1 + d, 12, 0), tz), s = astro.sunDay(m, loc, tz);
      out.push({ d: d, t: m, min: s.polar === 'day' ? 1440 : s.polar === 'night' ? 0 : s.dayLength != null ? s.dayLength / MIN : 0, sunrise: s.sunrise, sunset: s.sunset });
    }
    return out;
  };
})(typeof window !== 'undefined' ? window : globalThis);
