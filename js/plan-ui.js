/* =========================================================================
   Cosmica — js/plan-ui.js : Events → Compare places, Sun & year, My log. Plugs into the Events screen through X.planPages.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views, E = X.events, LG = X.log;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$, L = V.h.L, stat = V.h.stat;
  var planPages = X.planPages = X.planPages || {};
  var DAY = 86400000, MIN = 60000, HR = 3600000;
  var tm = function (ms, tz) { return UI.time(ms, tz || S.loc.tz); };
  var pad2 = function (n) { return ('0' + n).slice(-2); };

  /* ================================================================ COMPARE PLACES */
  var samePlace = function (a, b) { return Math.abs(a.lat - b.lat) < 0.005 && Math.abs(a.lon - b.lon) < 0.005; };
  var placeKey = function (c) { return c.name + '|' + c.lat.toFixed(2) + '|' + c.lon.toFixed(2); };
  var defaultBortle = function () { return X.store.get('bortle', 6); };

  planPages.compare = function (box) {
    var cmp = X.store.get('cmp', null);
    if (!Array.isArray(cmp) || !cmp.length) cmp = [{ name: S.loc.name, region: S.loc.region || '', lat: S.loc.lat, lon: S.loc.lon, tz: S.loc.tz, bortle: defaultBortle() }];
    cmp = cmp.filter(function (c) { return c && typeof c.lat === 'number' && typeof c.lon === 'number' && c.tz; }).slice(0, 3);
    var save = function () { X.store.set('cmp', cmp); };
    var alive = true;
    var options = function () {
      var saved = X.store.get('saved', []), cur = S.loc;
      var opt = function (c) { return '<option value="' + esc(placeKey(c)) + '">' + esc(c.name + (c.region ? ' — ' + c.region : '')) + '</option>'; };
      var map = {}; [cur].concat(saved, X.cities).forEach(function (c) { map[placeKey(c)] = c; });
      return { html: '<option value="">' + esc(t('cmp.add')) + '</option><optgroup label="' + esc(t('cmp.here')) + '">' + opt(cur) + '</optgroup>' +
        (saved.length ? '<optgroup label="' + esc(t('savedPlaces')) + '">' + saved.map(opt).join('') + '</optgroup>' : '') + '<optgroup label="' + esc(t('cmp.cities')) + '">' + X.cities.map(opt).join('') + '</optgroup>', map: map };
    };
    var draw = function () {
      var now = Date.now(), rows = cmp.map(function (c) {
        var loc = { lat: c.lat, lon: c.lon, elev: 0 }, sg = null; try { sg = astro.stargazing(now, loc, c.tz, c.bortle || defaultBortle()); } catch (e) { sg = null; }
        return { c: c, sg: sg };
      });
      var best = rows.reduce(function (a, r) { return r.sg && (!a || r.sg.score > a.sg.score) ? r : a; }, null);
      var o = options();
      box.innerHTML = '<p class="lead">' + esc(t('cmp.lead')) + '</p>' +
        (cmp.length < 3 ? '<label class="mrow">' + esc(t('cmp.addLabel')) + ' <select id="cmpAdd">' + o.html + '</select></label>' : '<p class="note">' + esc(t('cmp.max')) + '</p>') +
        (rows.length > 1 && best ? '<section class="card hero2"><h3>' + esc(t('cmp.best')) + '</h3><p><b>' + esc(best.c.name) + '</b> — ' + esc(t('cmp.bestWhy', { n: best.sg.score, w: t('sg.' + best.sg.key) })) + '</p></section>' : '') +
        '<div class="cmpgrid">' + rows.map(function (r, i) {
          var c = r.c, sg = r.sg, nt = sg && sg.night;
          return '<section class="card cmpc' + (best === r && rows.length > 1 ? ' best' : '') + '"><div class="cmp-h"><div><h3>' + esc(c.name) + '</h3><small class="muted">' + esc(c.region || '') + ' · ' + esc(c.tz) + '</small></div>' +
            (cmp.length > 1 ? '<button class="x" data-cdel="' + i + '" aria-label="' + esc(t('removePlace')) + '">×</button>' : '') + '</div>' +
            (sg ? '<div class="sgrow"><div class="gauge sm" style="--v:' + sg.score + '" role="img" aria-label="' + sg.score + ' / 100"><b>' + sg.score + '</b></div><div><div class="big">' + esc(t('sg.' + sg.key)) + '</div><small class="muted">' + esc(t('sg.moon', { up: sg.moonUpPct, lit: Math.round(sg.moonIllum) })) + '</small></div></div>' +
              '<div class="grid2">' + stat(t('sunset'), nt ? tm(nt.start, c.tz) : '—') + stat(t('sunrise'), nt ? tm(nt.end, c.tz) : '—') + stat(t('cmp.dark'), sg.darkMs ? UI.dur(sg.darkMs) : '—') + stat(t('cmp.localNow'), tm(now, c.tz)) + '</div>' : '<p class="muted">' + esc(t('calcError')) + '</p>') +
            '<label class="mrow sm">' + esc(t('cmp.bortle')) + ' <select data-bort="' + i + '">' + [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (b) { return '<option value="' + b + '"' + ((c.bortle || defaultBortle()) === b ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select></label>' +
            '<div class="muted sm" id="cmpCl' + i + '">' + esc(!X.store.get('cloudOn', true) ? t('cloudOff') : navigator.onLine === false ? t('cloudOffline') : t('cloudLoading')) + '</div></section>';
        }).join('') + '</div><p class="note">' + esc(t('cmp.note')) + '</p>';
      i18n.apply(box);
      var add = $('#cmpAdd', box); if (add) add.onchange = function () { var c = o.map[add.value]; if (!c) return; if (cmp.some(function (x) { return samePlace(x, c); })) { UI.toast(t('cmp.dup')); add.value = ''; return; } cmp.push({ name: c.name, region: c.region || '', lat: c.lat, lon: c.lon, tz: c.tz, bortle: defaultBortle() }); save(); draw(); };
      $$('[data-cdel]', box).forEach(function (b) { b.onclick = function () { cmp.splice(+b.getAttribute('data-cdel'), 1); save(); draw(); }; });
      $$('[data-bort]', box).forEach(function (s) { s.onchange = function () { cmp[+s.getAttribute('data-bort')].bortle = +s.value; save(); draw(); }; });
      rows.forEach(function (r, i) {
        var line = $('#cmpCl' + i, box); if (!line || !r.sg || !r.sg.night || !V.h.cloudFor) return;
        V.h.cloudFor({ lat: r.c.lat, lon: r.c.lon }, r.sg.night.start, r.sg.night.end).then(function (avg) {
          if (!alive || !document.body.contains(line)) return;
          line.textContent = avg == null ? t('cloudNone') : t('cloudLine', { n: avg, word: t(avg < 25 ? 'cloud.clear' : avg < 60 ? 'cloud.part' : 'cloud.heavy') });
        }).catch(function () { if (alive && document.body.contains(line)) line.textContent = t(!X.store.get('cloudOn', true) ? 'cloudOff' : 'cloudOffline'); });
      });
    };
    draw();
    return function () { alive = false; };
  };

  /* ================================================================ SUN & YEAR */
  var svgLine = function (pts, cls) { return '<polyline class="' + cls + '" fill="none" points="' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') + '"/>'; };
  var MONTHS3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var doy = function (y, m, d) { return Math.round((Date.UTC(y, m, d) - Date.UTC(y, 0, 1)) / DAY); };

  /** the classic figure-8: the Sun's declination (up/down) against the equation of time (left/right) — the same shape from everywhere on Earth */
  var analemmaSvg = function (pts, todayPt) {
    var W = 320, Hh = 330, pl = 38, pr = 14, pt = 14, pb = 26;
    var eots = pts.map(function (p) { return p.eot; }), decs = pts.map(function (p) { return p.dec; });
    var xMin = -20, xMax = 20, yMin = -25, yMax = 25;
    var Xs = function (v) { return pl + (W - pl - pr) * (v - xMin) / (xMax - xMin); }, Ys = function (v) { return pt + (Hh - pt - pb) * (yMax - v) / (yMax - yMin); };
    var grid = '', v;
    for (v = -20; v <= 20; v += 10) grid += '<line class="ax" y1="' + pt + '" y2="' + (Hh - pb) + '" x1="' + Xs(v).toFixed(1) + '" x2="' + Xs(v).toFixed(1) + '"/><text class="axt" x="' + Xs(v).toFixed(1) + '" y="' + (Hh - 9) + '" text-anchor="middle">' + (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' m</text>';
    for (v = -20; v <= 20; v += 10) grid += '<line class="' + (v === 0 ? 'zero' : 'ax') + '" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Ys(v).toFixed(1) + '" y2="' + Ys(v).toFixed(1) + '"/><text class="axt" x="' + (pl - 5) + '" y="' + (Ys(v) + 3).toFixed(1) + '" text-anchor="end">' + (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + '°</text>';
    var line = pts.map(function (p) { return [Xs(p.eot), Ys(p.dec)]; }); line.push(line[0]);
    var y = new Date(pts[0].t).getUTCFullYear(), marks = '';
    for (var m = 0; m < 12; m++) {
      var d = doy(y, m, 1), best = pts.reduce(function (b, p) { return Math.abs(p.d - d) < Math.abs(b.d - d) ? p : b; }, pts[0]), px = Xs(best.eot), py = Ys(best.dec), right = best.eot < 0 ? false : true;
      marks += '<circle class="mk" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3"/><text class="mt" x="' + (px + (right ? 7 : -7)).toFixed(1) + '" y="' + (py + 3).toFixed(1) + '" text-anchor="' + (right ? 'start' : 'end') + '">' + t('mon.' + (m + 1)) + '</text>';
    }
    var tp = todayPt ? '<circle class="now" cx="' + Xs(todayPt.eot).toFixed(1) + '" cy="' + Ys(todayPt.dec).toFixed(1) + '" r="6"/>' : '';
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="' + esc(t('sun.anaAria')) + '">' + grid + svgLine(line, 'ana') + marks + tp + '</svg>';
  };

  var lineChart = function (pts, o) {
    var W = 320, Hh = o.h || 190, pl = 38, pr = 10, pt = 12, pb = 24, ymin = o.min, ymax = o.max, y = o.year;
    var Xs = function (d) { return pl + (W - pl - pr) * d / 365; }, Ys = function (v) { return pt + (Hh - pt - pb) * (1 - (v - ymin) / (ymax - ymin)); };
    var g = '', step = o.step; for (var v = Math.ceil(ymin / step) * step; v <= ymax; v += step) g += '<line class="ax" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Ys(v).toFixed(1) + '" y2="' + Ys(v).toFixed(1) + '"/><text class="axt" x="' + (pl - 4) + '" y="' + (Ys(v) + 3).toFixed(1) + '" text-anchor="end">' + o.fmt(v) + '</text>';
    var mt = ''; for (var m = 0; m < 12; m++) mt += '<text class="axt" x="' + Xs(doy(y, m, 15)).toFixed(1) + '" y="' + (Hh - 7) + '" text-anchor="middle">' + t('mon.' + (m + 1)).charAt(0) + '</text>';
    var zero = o.zero != null ? '<line class="zero" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Ys(o.zero).toFixed(1) + '" y2="' + Ys(o.zero).toFixed(1) + '"/>' : '';
    var now = o.today != null ? '<line class="nowl" x1="' + Xs(o.today).toFixed(1) + '" x2="' + Xs(o.today).toFixed(1) + '" y1="' + pt + '" y2="' + (Hh - pb) + '"/>' : '';
    return '<svg class="chart" viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="' + esc(o.aria) + '">' + g + zero + now + svgLine(pts.map(function (p) { return [Xs(p[0]), Ys(p[1])]; }), o.cls) + mt + '</svg>';
  };

  planPages.sun = function (box) {
    var tz = S.loc.tz, loc = S.loc, now = Date.now(), year = astro.tzParts(now, tz).y, alive = true;
    box.innerHTML = '<p class="muted">' + esc(t('ev.calc')) + '</p>';
    var data = null;
    var draw = function () {
      var an = E.analemma(loc, tz, year, 12), tp0 = astro.tzParts(now, tz), nowD = Math.round((Date.UTC(tp0.y, tp0.mo - 1, tp0.d) - Date.UTC(year, 0, 1)) / DAY);
      var sNow = astro.altaz(root.Astronomy.Body.Sun, now, loc), ana = analemmaSvg(an, { eot: E.equationOfTime(now), dec: sNow.dec });
      var dl = data.dl, dmin = Math.min.apply(null, dl.map(function (p) { return p.min; })) / 60, dmax = Math.max.apply(null, dl.map(function (p) { return p.min; })) / 60;
      var dlpts = dl.map(function (p) { return [p.d, p.min / 60]; }), lo = Math.floor(dmin) - (dmin % 1 < 0.2 ? 1 : 0), hi = Math.ceil(dmax);
      var emin = Math.min.apply(null, an.map(function (p) { return p.eot; })), emax = Math.max.apply(null, an.map(function (p) { return p.eot; }));
      var today = data.today, yest = data.yest, deltaS = today.dayLength != null && yest.dayLength != null ? Math.round((today.dayLength - yest.dayLength) / 1000) : null;
      var seasons = E.seasons(Date.UTC(year, 0, 1), Date.UTC(year, 11, 31, 23));
      box.innerHTML = '<p class="lead">' + esc(t('sun.lead', { place: S.loc.name })) + '</p>' +
        '<section class="card"><h3>' + esc(t('sun.todayH')) + '</h3><div class="grid2">' + stat(t('sunrise'), tm(today.sunrise)) + stat(t('sunset'), tm(today.sunset)) +
        stat(t('sun.dayLen'), today.dayLength != null ? UI.dur(today.dayLength) : today.polar === 'day' ? t('sun.polarDay') : t('sun.polarNight')) +
        stat(t('sun.change'), deltaS == null ? '—' : (deltaS >= 0 ? '+' : '−') + Math.floor(Math.abs(deltaS) / 60) + ' m ' + pad2(Math.abs(deltaS) % 60) + ' s') +
        stat(t('sun.noon'), tm(today.noon)) + stat(t('sun.noonAlt'), UI.deg(astro.altaz(root.Astronomy.Body.Sun, today.noon || now, loc).alt)) + '</div></section>' +
        '<section class="card"><h3>' + esc(t('sun.anaH')) + '</h3>' + ana + '<p class="note">' + esc(t('sun.anaNote')) + '</p><p>' + esc(t('sun.anaWhy')) + '</p></section>' +
        '<section class="card"><h3>' + esc(t('sun.dayH')) + '</h3>' + lineChart(dlpts, { min: lo, max: hi, step: hi - lo > 6 ? 2 : 1, fmt: function (v) { return v + ' h'; }, cls: 'ln1', year: year, today: nowD, aria: t('sun.dayAria') }) +
        '<p class="note">' + esc(t('sun.dayNote', { min: UI.dur(dmin * HR), max: UI.dur(dmax * HR) })) + '</p></section>' +
        '<section class="card"><h3>' + esc(t('sun.eotH')) + '</h3>' + lineChart(an.map(function (p) { return [p.d, p.eot]; }), { min: -20, max: 20, step: 10, fmt: function (v) { return v + ' m'; }, cls: 'ln2', year: year, today: nowD, zero: 0, h: 170, aria: t('sun.eotAria') }) +
        '<p class="note">' + esc(t('sun.eotNote', { lo: emin.toFixed(1), hi: emax.toFixed(1) })) + '</p></section>' +
        '<section class="card"><h3>' + esc(t('sun.seasonsH', { y: year })) + '</h3><ul class="plain">' + seasons.map(function (s) { return '<li><b>' + esc(t('ev.s.' + s.key)) + '</b> — ' + esc(UI.date(s.t, tz) + ', ' + tm(s.t)) + '<br><small class="muted">' + esc(t('ev.s.' + s.key + '.sub')) + '</small></li>'; }).join('') + '</ul></section>';
      i18n.apply(box);
    };
    setTimeout(function () {
      if (!alive) return;
      try { data = { dl: E.dayLengths(loc, tz, year), today: astro.sunDay(now, loc, tz), yest: astro.sunDay(now - DAY, loc, tz) }; draw(); }
      catch (e) { box.innerHTML = '<p>' + esc(t('calcError')) + '</p>'; if (root.console) console.error(e); }
    }, 30);
    return function () { alive = false; };
  };

  /* ================================================================ MY LOG */
  var PRESETS = function () {
    return [['moon', t('moon')]].concat(astro.PLANETS.map(function (p) { return ['planet', t('pl.' + p.id).replace(/\s*\(.*\)/, '')]; }),
      [['star', 'Sirius'], ['star', 'Polaris'], ['star', 'Betelgeuse'], ['deep', 'Orion Nebula (M42)'], ['deep', 'Pleiades (M45)'], ['deep', 'Andromeda Galaxy (M31)'], ['deep', t('log.milky')], ['meteor', t('log.meteor')], ['other', t('log.iss')], ['other', t('log.comet')], ['other', t('log.aurora')]]);
  };
  var localInput = function (ms, tz) { var p = astro.tzParts(ms, tz); return p.y + '-' + pad2(p.mo) + '-' + pad2(p.d) + 'T' + pad2(p.h) + ':' + pad2(p.mi); };
  var fromLocalInput = function (s, tz) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s); if (!m) return null;
    var wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]), g = wall - astro.tzOffset(wall, tz); return wall - astro.tzOffset(g, tz);
  };
  var stars = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += i <= n ? '★' : '☆'; return s; };

  planPages.log = function (box) {
    var list = X.obsLog.all(), pre = S.logPrefill || null; S.logPrefill = null; var rating = 0, confirmId = null;
    var draw = function () {
      var st = LG.stats(list), tz = S.loc.tz;
      var presets = PRESETS();
      box.innerHTML = '<p class="lead">' + esc(t('log.lead')) + '</p>' +
        '<section class="card" id="logForm"><h3>' + esc(t('log.add')) + '</h3>' +
        '<label class="nm"><span>' + esc(t('log.what')) + ' <b class="req">*</b></span><input id="lgWhat" list="lgList" maxlength="80" autocomplete="off" placeholder="' + esc(t('log.whatPh')) + '" value="' + esc(pre ? pre.what : '') + '"></label>' +
        '<datalist id="lgList">' + presets.map(function (p) { return '<option value="' + esc(p[1]) + '">'; }).join('') + '</datalist>' +
        '<div class="row wrap"><label class="mrow">' + esc(t('log.kind')) + ' <select id="lgKind">' + LG.KINDS.map(function (k) { return '<option value="' + k + '"' + (pre && pre.kind === k ? ' selected' : '') + '>' + esc(t('log.k.' + k)) + '</option>'; }).join('') + '</select></label>' +
        '<label class="mrow">' + esc(t('log.when')) + ' <input type="datetime-local" id="lgWhen" value="' + localInput(pre ? pre.ts : Date.now(), tz) + '"></label></div>' +
        '<div class="row wrap" role="group" aria-label="' + esc(t('log.seen')) + '"><button class="chip tg" id="lgSeen" aria-pressed="true">' + esc(t('log.saw')) + '</button><button class="chip tg" id="lgNot" aria-pressed="false">' + esc(t('log.notSaw')) + '</button></div>' +
        '<div class="row wrap"><span class="muted sm">' + esc(t('log.rating')) + '</span><span class="starsel" role="radiogroup" aria-label="' + esc(t('log.rating')) + '">' + [1, 2, 3, 4, 5].map(function (i) { return '<button type="button" class="sbtn" data-r="' + i + '" role="radio" aria-checked="false" aria-label="' + i + '">☆</button>'; }).join('') + '</span></div>' +
        '<label class="nm"><span>' + esc(t('log.notes')) + '</span><textarea id="lgNotes" rows="3" maxlength="600" placeholder="' + esc(t('log.notesPh')) + '"></textarea></label>' +
        '<div id="lgErr" class="err" role="alert"></div><div class="row wrap"><button class="btn pri" id="lgSave">' + esc(t('log.save')) + '</button><span class="muted sm">' + esc(t('log.where', { place: S.loc.name })) + '</span></div></section>' +
        '<section class="card"><div class="grid2">' + stat(t('log.s.total'), st.total) + stat(t('log.s.seen'), st.seen) + stat(t('log.s.distinct'), st.distinct) + stat(t('log.s.nights'), st.nights) + '</div>' +
        '<div class="row wrap"><button class="btn sm" id="lgJson"' + (list.length ? '' : ' disabled') + '>' + esc(t('log.expJson')) + '</button><button class="btn sm" id="lgCsv"' + (list.length ? '' : ' disabled') + '>' + esc(t('log.expCsv')) + '</button>' +
        '<label class="btn sm filebtn">' + esc(t('log.import')) + '<input type="file" id="lgFile" accept=".json,application/json" hidden></label></div><p class="note">' + esc(t('log.privacy')) + '</p></section>' +
        (list.length ? '<h3 class="sec">' + esc(t('log.entries')) + '</h3><div class="loglist">' + list.map(function (x) {
          return '<article class="card le"><div class="le-h"><b>' + esc(x.what) + '</b><span class="chip c-' + (x.seen ? 'good' : 'none') + '">' + esc(t(x.seen ? 'log.saw' : 'log.notSaw')) + '</span></div>' +
            '<small class="muted">' + esc(UI.dateFull(x.ts, tz) + ', ' + tm(x.ts, tz)) + ' · ' + esc(t('log.k.' + x.kind)) + (x.place ? ' · ' + esc(x.place) : '') + '</small>' +
            (x.rating ? '<div class="stars" aria-label="' + esc(t('log.rating')) + ' ' + x.rating + '/5">' + stars(x.rating) + '</div>' : '') + (x.notes ? '<p class="le-n">' + esc(x.notes) + '</p>' : '') +
            '<div class="row"><button class="btn sm" data-del="' + esc(x.id) + '">' + esc(confirmId === x.id ? t('log.sure') : t('log.del')) + '</button></div></article>';
        }).join('') + '</div>' : '<p class="muted">' + esc(t('log.empty')) + '</p>');
      i18n.apply(box); wire();
    };
    var wire = function () {
      var seen = true, what = $('#lgWhat', box), kind = $('#lgKind', box);
      var setSeen = function (v) { seen = v; $('#lgSeen', box).setAttribute('aria-pressed', v); $('#lgNot', box).setAttribute('aria-pressed', !v); };
      $('#lgSeen', box).onclick = function () { setSeen(true); }; $('#lgNot', box).onclick = function () { setSeen(false); };
      $$('[data-r]', box).forEach(function (b) {
        b.onclick = function () { var n = +b.getAttribute('data-r'); rating = rating === n ? 0 : n; $$('[data-r]', box).forEach(function (x) { var i = +x.getAttribute('data-r'); x.textContent = i <= rating ? '★' : '☆'; x.setAttribute('aria-checked', i === rating); }); };
      });
      what.oninput = function () { var p = presets_(what.value); if (p) kind.value = p; };
      var presets_ = function (v) { var hit = PRESETS().filter(function (p) { return p[1].toLowerCase() === v.trim().toLowerCase(); })[0]; return hit ? hit[0] : null; };
      $('#lgSave', box).onclick = function () {
        var err = $('#lgErr', box), ts = fromLocalInput($('#lgWhen', box).value, S.loc.tz);
        if (!what.value.trim()) { err.textContent = t('log.needWhat'); what.focus(); return; }
        if (ts == null) { err.textContent = t('log.needWhen'); return; }
        var r = LG.add(list, { what: what.value, kind: kind.value, ts: ts, seen: seen, rating: rating, notes: $('#lgNotes', box).value, place: S.loc.name, lat: S.loc.lat, lon: S.loc.lon });
        if (r.error) { err.textContent = t(r.error === 'full' ? 'log.full' : 'log.needWhat'); return; }
        list = r.list; X.obsLog.save(list); rating = 0; UI.toast(t('log.saved')); draw();
      };
      $$('[data-del]', box).forEach(function (b) { b.onclick = function () { var id = b.getAttribute('data-del'); if (confirmId !== id) { confirmId = id; draw(); return; } confirmId = null; list = LG.remove(list, id); X.obsLog.save(list); UI.toast(t('log.deleted')); draw(); }; });
      $('#lgJson', box).onclick = function () { X.saveBlob('Cosmica-observation-log.json', new Blob([LG.toJson(list)], { type: 'application/json' })); };
      $('#lgCsv', box).onclick = function () { X.saveBlob('Cosmica-observation-log.csv', new Blob([LG.toCsv(list)], { type: 'text/csv;charset=utf-8' })); };
      $('#lgFile', box).onchange = function () {
        var f = this.files && this.files[0]; if (!f) return; if (f.size > 2e6) { UI.toast(t('log.badFile')); return; }
        var fr = new FileReader(); fr.onload = function () { var r = LG.importJson(list, String(fr.result)); if (r.error) { UI.toast(t('log.badFile')); return; } list = r.list; X.obsLog.save(list); UI.toast(t('log.imported', { a: r.added, s: r.skipped })); draw(); }; fr.readAsText(f);
      };
    };
    draw();
    if (pre) { var f = $('#logForm', box); if (f && f.scrollIntoView) f.scrollIntoView(); }
  };

  /** "Log it" from anywhere (e.g. the Sky object card) */
  X.logUI = { open: function (pre) { S.logPrefill = pre; V.h.go('#/events/log'); } };
})(typeof window !== 'undefined' ? window : globalThis);
