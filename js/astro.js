/* =========================================================================
   Cosmica — js/astro.js : all the sky maths, on top of astronomy-engine (MIT).
   No DOM in here, so it is unit-tested in Node (tests/astro.test.js).
   Everything is computed on the device: offline-safe.
   ========================================================================= */
(function (root) {
  'use strict';
  var A = root.Astronomy;
  var X = root.Cosmica = root.Cosmica || {};
  var D2R = Math.PI / 180, R2D = 180 / Math.PI, H = 3600000, DAY = 86400000;
  var astro = X.astro = {};

  /* ---------------------------------------------------------------- time zones */
  var fmtCache = {};
  var dtf = function (tz) {
    if (!fmtCache[tz]) fmtCache[tz] = new Intl.DateTimeFormat('en-CA', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return fmtCache[tz];
  };
  /** local wall-clock parts of an instant in a time zone */
  astro.tzParts = function (ms, tz) {
    var o = {}; dtf(tz).formatToParts(new Date(ms)).forEach(function (p) { if (p.type !== 'literal') o[p.type] = parseInt(p.value, 10); });
    return { y: o.year, mo: o.month, d: o.day, h: o.hour === 24 ? 0 : o.hour, mi: o.minute, s: o.second };
  };
  /** how far the zone is ahead of UTC at that instant (ms) */
  astro.tzOffset = function (ms, tz) {
    var p = astro.tzParts(ms, tz);
    return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - Math.floor(ms / 1000) * 1000;
  };
  /** the instant when the local calendar day containing `ms` began */
  astro.localMidnight = function (ms, tz) {
    var p = astro.tzParts(ms, tz), wall = Date.UTC(p.y, p.mo - 1, p.d);
    var g = wall - astro.tzOffset(ms, tz);
    return wall - astro.tzOffset(g, tz);
  };
  astro.dayWindow = function (ms, tz) {
    var s = astro.localMidnight(ms, tz);
    return [s, astro.localMidnight(s + 26 * H, tz)];
  };

  /* ---------------------------------------------------------------- basics */
  var observer = astro.observer = function (loc) { return new A.Observer(loc.lat, loc.lon, loc.elev || 0); };
  var T = function (ms) { return A.MakeTime(new Date(ms)); };
  var ms = function (t) { return t ? t.date.getTime() : null; };

  var COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  astro.compass = function (az) { return COMPASS[Math.round((((az % 360) + 360) % 360) / 22.5) % 16]; };
  /** the 8 main directions as keys for translation (n, ne, e …) */
  astro.dir8 = function (az) { return ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'][Math.round((((az % 360) + 360) % 360) / 45) % 8]; };

  var altaz = astro.altaz = function (body, tms, loc) {
    var t = T(tms), o = observer(loc), eq = A.Equator(body, t, o, true, true), hor = A.Horizon(t, o, eq.ra, eq.dec, 'normal');
    return { alt: hor.altitude, az: hor.azimuth, ra: eq.ra, dec: eq.dec, dist: eq.dist };
  };
  astro.sunAlt = function (tms, loc) { return altaz(A.Body.Sun, tms, loc).alt; };

  /* ---------------------------------------------------------------- sun */
  /** sunrise, sunset, solar noon and the three twilights for the local day that contains `tms` */
  astro.sunDay = function (tms, loc, tz) {
    var w = astro.dayWindow(tms, tz), t0 = T(w[0]), o = observer(loc), S = A.Body.Sun, len = (w[1] - w[0]) / DAY;
    var rise = A.SearchRiseSet(S, o, +1, t0, len), set = A.SearchRiseSet(S, o, -1, t0, len);
    var noonT = null; try { noonT = A.SearchHourAngle(S, o, 0, t0).time; } catch (e) { noonT = null; }
    var tw = function (alt) {
      var up = A.SearchAltitude(S, o, +1, t0, len, alt), dn = A.SearchAltitude(S, o, -1, t0, len, alt);
      return { start: ms(up), end: ms(dn) };
    };
    var r = ms(rise), s = ms(set);
    var out = { window: w, sunrise: r, sunset: s, noon: ms(noonT), civil: tw(-6), nautical: tw(-12), astro: tw(-18) };
    out.dayLength = (r != null && s != null) ? (s > r ? s - r : null) : null;
    // polar cases: sun stays up or down all day
    if (r == null && s == null) out.polar = altaz(S, w[0] + 12 * H, loc).alt > 0 ? 'day' : 'night';
    return out;
  };

  /* ---------------------------------------------------------------- moon */
  var PHASE_KEYS = ['new', 'waxcres', 'firstq', 'waxgib', 'full', 'wangib', 'lastq', 'wancres'];
  astro.moonInfo = function (tms, loc, tz) {
    var t = T(tms), ph = A.MoonPhase(t), il = A.Illumination(A.Body.Moon, t);
    var idx = Math.floor((((ph + 22.5) % 360) + 360) % 360 / 45);
    var out = {
      phaseDeg: ph, phaseKey: PHASE_KEYS[idx], illum: il.phase_fraction * 100, age: ph / 360 * 29.530588853, waxing: ph < 180,
      distanceKm: A.GeoVector(A.Body.Moon, t, true).Length() * A.KM_PER_AU,
      nextNew: ms(A.SearchMoonPhase(0, t, 40)), nextFull: ms(A.SearchMoonPhase(180, t, 40)),
      nextFirstQ: ms(A.SearchMoonPhase(90, t, 40)), nextLastQ: ms(A.SearchMoonPhase(270, t, 40)), mag: il.mag
    };
    if (loc && tz) {
      var w = astro.dayWindow(tms, tz), t0 = T(w[0]), o = observer(loc), len = (w[1] - w[0]) / DAY;
      out.moonrise = ms(A.SearchRiseSet(A.Body.Moon, o, +1, t0, len)); out.moonset = ms(A.SearchRiseSet(A.Body.Moon, o, -1, t0, len));
    }
    return out;
  };
  astro.PHASE_KEYS = PHASE_KEYS;

  /** when does the Moon rise / set during a night window, and is it already up at the start? */
  astro.moonNight = function (nw, loc) {
    var o = observer(loc), t0 = T(nw.start), len = (nw.end - nw.start) / DAY;
    return { rise: ms(A.SearchRiseSet(A.Body.Moon, o, +1, t0, len)), set: ms(A.SearchRiseSet(A.Body.Moon, o, -1, t0, len)), upAtStart: altaz(A.Body.Moon, nw.start, loc).alt > 0 };
  };

  /* ---------------------------------------------------------------- planets */
  var PLANETS = astro.PLANETS = [
    { id: 'mercury', body: A.Body.Mercury, eye: 'eye' }, { id: 'venus', body: A.Body.Venus, eye: 'eye' }, { id: 'mars', body: A.Body.Mars, eye: 'eye' },
    { id: 'jupiter', body: A.Body.Jupiter, eye: 'eye' }, { id: 'saturn', body: A.Body.Saturn, eye: 'eye' },
    { id: 'uranus', body: A.Body.Uranus, eye: 'binoc' }, { id: 'neptune', body: A.Body.Neptune, eye: 'scope' }
  ];
  var byId = {}; PLANETS.forEach(function (p) { byId[p.id] = p; });
  astro.planetById = function (id) { return byId[id]; };

  /** the dark part of the evening/night that follows the local day of `tms` (sunset → next sunrise) */
  astro.nightWindow = function (tms, loc, tz) {
    var day = astro.sunDay(tms, loc, tz), w = day.window;
    if (day.sunrise != null && tms < day.sunrise) { var prev = astro.sunDay(w[0] - 2 * H, loc, tz); if (prev.sunset != null) return { start: prev.sunset, end: day.sunrise, day: day }; }
    var next = astro.sunDay(w[1] + 2 * H, loc, tz);
    if (day.sunset != null && next.sunrise != null) return { start: day.sunset, end: next.sunrise, day: day };
    return { start: w[0] + 18 * H, end: w[0] + 30 * H, day: day, approx: true };      // polar fallback
  };

  var planetNow = function (p, tms, loc) {
    var t = T(tms), o = observer(loc), eq = A.Equator(p.body, t, o, true, true), hor = A.Horizon(t, o, eq.ra, eq.dec, 'normal');
    var il = A.Illumination(p.body, t), el = A.Elongation(p.body, t);
    return { alt: hor.altitude, az: hor.azimuth, mag: il.mag, illum: il.phase_fraction * 100, elong: el.elongation, east: el.visibility === 'evening', distAU: eq.dist };
  };
  astro.planetNow = planetNow;

  /** how well can this planet be seen during the night window? */
  astro.planetNight = function (p, nw, loc) {
    var step = 10 * 60000, best = null, bestTw = null, o = observer(loc);
    for (var tm = nw.start; tm <= nw.end; tm += step) {
      var sunAlt = altaz(A.Body.Sun, tm, loc).alt;
      var eq = A.Equator(p.body, T(tm), o, true, true), hor = A.Horizon(T(tm), o, eq.ra, eq.dec, 'normal');
      var rec = { t: tm, alt: hor.altitude, az: hor.azimuth, sun: sunAlt };
      if (sunAlt <= -6 && (!best || rec.alt > best.alt)) best = rec;
      if (sunAlt <= -0.8 && (!bestTw || rec.alt > bestTw.alt)) bestTw = rec;
    }
    return { dark: best, any: bestTw };
  };

  astro.planetDay = function (p, tms, loc, tz) {
    var nw = astro.nightWindow(tms, loc, tz), now = planetNow(p, nw.start + (nw.end - nw.start) / 2, loc), ng = astro.planetNight(p, nw, loc), o = observer(loc);
    var t0 = T(nw.start - 3 * H), len = (nw.end - nw.start + 6 * H) / DAY;
    var rise = ms(A.SearchRiseSet(p.body, o, +1, t0, len)), set = ms(A.SearchRiseSet(p.body, o, -1, t0, len));
    var best = ng.dark || ng.any, status;
    if (now.elong < 12) status = 'sun';                       // lost in the Sun's glare
    else if (ng.dark && ng.dark.alt >= 20) status = 'good';
    else if (best && best.alt >= 8) status = 'low';
    else status = 'none';
    return { id: p.id, eye: p.eye, status: status, mag: now.mag, elong: now.elong, illum: now.illum, evening: now.east, best: best, rise: rise, set: set, nightMid: now };
  };

  /** every planet for the night after the day that contains `tms`, brightest-visible first */
  astro.planetList = function (tms, loc, tz) {
    var rank = { good: 0, low: 1, none: 2, sun: 3 };
    var list = PLANETS.map(function (p) { return astro.planetDay(p, tms, loc, tz); });
    list.sort(function (a, b) { return rank[a.status] - rank[b.status] || a.mag - b.mag; });
    return list;
  };

  /* ---------------------------------------------------------------- the chart: sun, moon, planets, stars */
  astro.bodies = function (tms, loc) {
    var out = { sun: altaz(A.Body.Sun, tms, loc), moon: altaz(A.Body.Moon, tms, loc), planets: [] };
    out.moon.phase = A.MoonPhase(T(tms)); out.moon.illum = A.Illumination(A.Body.Moon, T(tms)).phase_fraction;
    PLANETS.forEach(function (p) { var n = planetNow(p, tms, loc); n.id = p.id; n.eye = p.eye; out.planets.push(n); });
    return out;
  };

  /** the star field: precomputes unit vectors once; project() gives altitude/azimuth for every star at a time */
  var StarField = astro.StarField = function (stars) {
    this.n = stars.length; this.ux = new Float64Array(this.n); this.uy = new Float64Array(this.n); this.uz = new Float64Array(this.n);
    this.alt = new Float64Array(this.n); this.az = new Float64Array(this.n);
    for (var i = 0; i < this.n; i++) {
      var ra = stars[i][0] * D2R, de = stars[i][1] * D2R, c = Math.cos(de);
      this.ux[i] = c * Math.cos(ra); this.uy[i] = c * Math.sin(ra); this.uz[i] = Math.sin(de);
    }
  };
  /** converts J2000 catalogue positions to the horizon for this place and moment (precession + nutation + sidereal time) */
  StarField.prototype.project = function (tms, loc) {
    var t = T(tms), m = A.Rotation_EQJ_EQD(t).rot, th = (A.SiderealTime(t) * 15 + loc.lon) * D2R, ph = loc.lat * D2R;
    var cth = Math.cos(th), sth = Math.sin(th), cph = Math.cos(ph), sph = Math.sin(ph);
    var upx = cph * cth, upy = cph * sth, upz = sph, nx = -sph * cth, ny = -sph * sth, nz = cph, ex = -sth, ey = cth;
    for (var i = 0; i < this.n; i++) {
      var x = this.ux[i], y = this.uy[i], z = this.uz[i];
      var X1 = m[0][0] * x + m[1][0] * y + m[2][0] * z, Y1 = m[0][1] * x + m[1][1] * y + m[2][1] * z, Z1 = m[0][2] * x + m[1][2] * y + m[2][2] * z;
      this.alt[i] = Math.asin(Math.max(-1, Math.min(1, X1 * upx + Y1 * upy + Z1 * upz))) * R2D;
      var az = Math.atan2(X1 * ex + Y1 * ey, X1 * nx + Y1 * ny + Z1 * nz) * R2D; this.az[i] = az < 0 ? az + 360 : az;
    }
  };
  /** same maths for a single J2000 point (used for constellation line ends and Milky Way outlines) */
  astro.makeProjector = function (tms, loc) {
    var t = T(tms), m = A.Rotation_EQJ_EQD(t).rot, th = (A.SiderealTime(t) * 15 + loc.lon) * D2R, ph = loc.lat * D2R;
    var cth = Math.cos(th), sth = Math.sin(th), cph = Math.cos(ph), sph = Math.sin(ph);
    var upx = cph * cth, upy = cph * sth, upz = sph, nx = -sph * cth, ny = -sph * sth, nz = cph, ex = -sth, ey = cth;
    return function (raDeg, decDeg, out) {
      var ra = raDeg * D2R, de = decDeg * D2R, c = Math.cos(de), x = c * Math.cos(ra), y = c * Math.sin(ra), z = Math.sin(de);
      var X1 = m[0][0] * x + m[1][0] * y + m[2][0] * z, Y1 = m[0][1] * x + m[1][1] * y + m[2][1] * z, Z1 = m[0][2] * x + m[1][2] * y + m[2][2] * z;
      out.alt = Math.asin(Math.max(-1, Math.min(1, X1 * upx + Y1 * upy + Z1 * upz))) * R2D;
      var az = Math.atan2(X1 * ex + Y1 * ey, X1 * nx + Y1 * ny + Z1 * nz) * R2D; out.az = az < 0 ? az + 360 : az; return out;
    };
  };

  /** faintest star magnitude you could see with the Sun at this altitude */
  astro.limitingMag = function (sunAlt) {
    var pts = [[-18, 6.2], [-12, 4.6], [-6, 2.6], [-1, 0.6], [2, -1.2]];
    if (sunAlt <= pts[0][0]) return pts[0][1]; if (sunAlt >= pts[4][0]) return pts[4][1];
    for (var i = 0; i < 4; i++) if (sunAlt <= pts[i + 1][0]) { var f = (sunAlt - pts[i][0]) / (pts[i + 1][0] - pts[i][0]); return pts[i][1] + f * (pts[i + 1][1] - pts[i][1]); }
    return pts[4][1];
  };

  /* ---------------------------------------------------------------- misc helpers */
  /** angle (degrees) between two sky positions given as alt/az pairs */
  astro.separation = function (a1, z1, a2, z2) {
    var p = a1 * D2R, q = a2 * D2R, d = (z1 - z2) * D2R;
    return Math.acos(Math.max(-1, Math.min(1, Math.sin(p) * Math.sin(q) + Math.cos(p) * Math.cos(q) * Math.cos(d)))) * R2D;
  };
  astro.constellationOf = function (raHours, decDeg) { return A.Constellation(raHours, decDeg); };

  /* ================================================================ v2 extras */
  /** is the planet moving "backwards" against the stars right now? (ecliptic longitude decreasing over the next day) */
  astro.retrograde = function (id, tms) {
    var p = byId[id]; if (!p) return false;
    var l1 = A.Ecliptic(A.GeoVector(p.body, T(tms), true)).elon, l2 = A.Ecliptic(A.GeoVector(p.body, T(tms + DAY), true)).elon;
    return (((l2 - l1 + 540) % 360) - 180) < 0;
  };

  /** 0–100 stargazing score for the night after the day of `tms`, from darkness length, Moon light and sky darkness (Bortle 1–9). Clouds are not included. */
  astro.stargazing = function (tms, loc, tz, bortle) {
    bortle = Math.max(1, Math.min(9, Math.round(bortle || 6)));
    var nw = astro.nightWindow(tms, loc, tz), step = 15 * 60000, darkMs = 0, n = 0, moonSum = 0, moonUp = 0;
    var illum = A.Illumination(A.Body.Moon, T((nw.start + nw.end) / 2)).phase_fraction;
    for (var t = nw.start; t <= nw.end; t += step) {
      if (altaz(A.Body.Sun, t, loc).alt > -18) continue;
      darkMs += step; n++;
      var ma = altaz(A.Body.Moon, t, loc).alt;
      if (ma > 0) { moonUp++; moonSum += Math.sin(ma * D2R) * illum; }
    }
    var moonP = n ? Math.min(45, 70 * moonSum / n) : 0, bortleP = (bortle - 1) * 5.5, shortP = 0;
    if (!n) shortP = 25; else if (darkMs < 6 * H) shortP = Math.min(18, (6 * H - darkMs) / H * 3);
    var score = Math.max(0, Math.min(100, Math.round(100 - moonP - bortleP - shortP)));
    var key = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : score >= 20 ? 'poor' : 'bad';
    return { score: score, key: key, darkMs: darkMs, moonUpPct: n ? Math.round(100 * moonUp / n) : 0, moonIllum: illum * 100, bortle: bortle, parts: { moon: Math.round(moonP), sky: Math.round(bortleP), short: Math.round(shortP) }, night: nw };
  };

  /** which planet is the best target over the next 7 nights? */
  astro.planetOfWeek = function (tms, loc, tz) {
    var best = null;
    PLANETS.forEach(function (p) {
      var val = 0, days = 0, bestV = 0, bestDay = null, bestInfo = null;
      for (var i = 0; i < 7; i++) {
        var d = astro.planetDay(p, tms + i * DAY, loc, tz), w = d.status === 'good' ? 2 : d.status === 'low' ? 1 : 0;
        if (!w) continue;
        var v = w * Math.max(0.5, 3.2 - d.mag); days++; val += v;
        if (v > bestV) { bestV = v; bestDay = tms + i * DAY; bestInfo = d; }
      }
      if (days && (!best || val > best.val)) best = { id: p.id, val: val, days: days, mag: bestInfo.mag, bestDay: bestDay, info: bestInfo };
    });
    return best;
  };

  /** first-crescent ("Chaand ka darshan") estimate for the next new Moon: the first two evenings after it.
      An astronomical estimate only — sighting decisions for festivals are made by local authorities. */
  astro.hilal = function (tms, loc, tz) {
    var nm = A.SearchMoonPhase(0, T(tms), 40), N = ms(nm), o = observer(loc), out = { newMoon: N, evenings: [] };
    var dayStart = N;
    for (var k = 0; k < 4 && out.evenings.length < 2; k++) {
      var sd = astro.sunDay(dayStart + k * DAY, loc, tz);
      if (sd.sunset == null || sd.sunset <= N) continue;
      var S = sd.sunset, up = altaz(A.Body.Moon, S, loc).alt > 0, set = up ? ms(A.SearchRiseSet(A.Body.Moon, o, -1, T(S), 1)) : null, lag = set != null ? (set - S) / 60000 : null;
      var best = S + (lag != null && lag > 0 ? lag * 60000 * 4 / 9 : 0), ma = altaz(A.Body.Moon, best, loc), el = A.Elongation(A.Body.Moon, T(best)).elongation;
      var verdict = (lag == null || lag <= 0 || ma.alt <= 0) ? 'no' : (lag >= 45 && el >= 10) ? 'likely' : (lag >= 25 && el >= 7) ? 'hard' : 'no';
      out.evenings.push({ sunset: S, moonUp: up, moonset: set, lagMin: lag, ageH: (S - N) / H, alt: ma.alt, az: ma.az, elong: el, illum: A.Illumination(A.Body.Moon, T(best)).phase_fraction * 100, verdict: verdict });
    }
    return out;
  };
})(typeof window !== 'undefined' ? window : globalThis);
