/* =========================================================================
   Cosmica — js/views.js : the four screens (Today, Sky, Learn, About).
   Each view fills <main> and may return a cleanup function.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$;
  var V = X.views = {};
  var PLANET_IDS = astro.PLANETS.map(function (p) { return p.id; });

  var L = function () { return i18n.lang === 'hi' ? 'hi' : 'en'; };
  var dirWord = function (az) { return t('dir8.' + astro.dir8(az)); };
  var link = function (s) { return '<a class="src" href="' + esc(s.u) + '" target="_blank" rel="noopener noreferrer">' + esc(s.l) + ' ↗</a>'; };
  var stat = function (label, value) { return '<div class="stat"><span>' + esc(label) + '</span><b>' + value + '</b></div>'; };
  var isToday = function () { return S.live; };
  var go = function (hash) { if (location.hash === hash) root.dispatchEvent(new HashChangeEvent('hashchange')); else location.hash = hash; };

  /* ------------------------------------------------------------------ date helpers shared by Today & Sky */
  var todayIso = function () { return UI.isoDate(Date.now(), S.loc.tz); };
  /** move the app to another calendar day (keeps the time of day, or noon for Today) */
  var setDay = function (iso, keepTime) {
    if (iso === todayIso()) { S.tms = Date.now(); S.live = true; return; }
    var base = UI.fromIso(iso, S.loc.tz); if (base == null) return;
    if (keepTime) { var w0 = astro.dayWindow(S.tms, S.loc.tz)[0], off = S.tms - w0, nw0 = astro.dayWindow(base, S.loc.tz)[0]; S.tms = nw0 + off; } else S.tms = base;
    S.live = false;
  };
  var shiftIso = function (iso, days) { var d = new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10) + days)); return d.toISOString().slice(0, 10); };

  var dayBar = function () {
    var iso = UI.isoDate(S.tms, S.loc.tz);
    return '<div class="daybar"><button class="btn ico" id="dPrev" aria-label="' + esc(t('prevDay')) + '">‹</button>' +
      '<label class="dsel"><span class="dtxt">' + esc(UI.dateFull(S.tms, S.loc.tz)) + '</span><input type="date" id="dIn" value="' + iso + '" aria-label="' + esc(t('pickDate')) + '"></label>' +
      '<button class="btn ico" id="dNext" aria-label="' + esc(t('nextDay')) + '">›</button>' +
      (isToday() ? '' : '<button class="btn sm" id="dToday">' + esc(t('backToToday')) + '</button>') + '</div>';
  };
  var wireDayBar = function (el, rerender) {
    var iso = function () { return UI.isoDate(S.tms, S.loc.tz); };
    $('#dPrev', el).onclick = function () { setDay(shiftIso(iso(), -1)); rerender(); };
    $('#dNext', el).onclick = function () { setDay(shiftIso(iso(), +1)); rerender(); };
    $('#dIn', el).onchange = function () { if (this.value) { setDay(this.value); rerender(); } };
    var b = $('#dToday', el); if (b) b.onclick = function () { S.tms = Date.now(); S.live = true; rerender(); };
  };

  V.h = { link: link, stat: stat, L: L, go: go };

  /* ------------------------------------------------------------------ "On this day" helpers (also used by Learn) */
  var DIM = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var doyOf = function (m, d) { var n = d; for (var i = 0; i < m - 1; i++) n += DIM[i]; return n; };
  X.otd = {
    forDay: function (m, d) { return (X.onThisDay || []).filter(function (e) { return e.m === m && e.d === d; }); },
    /** nearest upcoming date that has events: { m, d, list } */
    nearest: function (m, d) {
      var base = doyOf(m, d), best = null, bd = 1e9;
      (X.onThisDay || []).forEach(function (e) { var diff = (doyOf(e.m, e.d) - base + 366) % 366; if (diff > 0 && diff < bd) { bd = diff; best = e; } });
      return best ? { m: best.m, d: best.d, list: X.otd.forDay(best.m, best.d), ahead: bd } : null;
    },
    fmt: function (m, d) { return d + ' ' + ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][m - 1]; }
  };

  /* ------------------------------------------------------------------ online cloud cover (Open-Meteo, optional) */
  var cloudCache = {};
  var cloudFor = function (loc, from, to) {
    var key = loc.lat.toFixed(2) + ',' + loc.lon.toFixed(2), hit = cloudCache[key];
    var use = function (d) {
      var vals = []; d.time.forEach(function (tm, i) { var ms = Date.parse(tm + 'Z'); if (ms >= from && ms <= to && d.v[i] != null) vals.push(d.v[i]); });
      if (!vals.length) return null; return Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
    };
    if (!X.store.get('cloudOn', true)) return Promise.reject(new Error('off'));
    if (hit && Date.now() - hit.at < 30 * 60000) return Promise.resolve(use(hit));
    if (typeof fetch !== 'function' || navigator.onLine === false) return Promise.reject(new Error('offline'));
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + loc.lat.toFixed(3) + '&longitude=' + loc.lon.toFixed(3) + '&hourly=cloud_cover&timezone=GMT&forecast_days=7';
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null, tm = setTimeout(function () { if (ctl) ctl.abort(); }, 7000);
    return fetch(url, { signal: ctl && ctl.signal }).then(function (r) { clearTimeout(tm); if (!r.ok) throw new Error('http'); return r.json(); }).then(function (j) {
      if (!j.hourly || !j.hourly.time || !j.hourly.cloud_cover) throw new Error('shape');
      cloudCache[key] = { at: Date.now(), time: j.hourly.time, v: j.hourly.cloud_cover }; return use(cloudCache[key]);
    });
  };

  V.h.cloudFor = cloudFor;

  /* ================================================================== TODAY */
  var summary = function (nw, moon, mn, planets) {
    var tz = S.loc.tz, lines = [];
    /* moon */
    var ph = t('phase.' + moon.phaseKey), il = Math.round(moon.illum);
    var ml = t('sum.moon', { phase: ph, illum: il });
    if (!mn.upAtStart && mn.rise == null) ml += ' ' + t('sum.moonNone');
    else if (mn.upAtStart && mn.set == null) ml += ' ' + t('sum.moonAll');
    else if (mn.upAtStart) ml += ' ' + t('sum.moonSets', { time: UI.time(mn.set, tz) });
    else ml += ' ' + t('sum.moonRises', { time: UI.time(mn.rise, tz) });
    lines.push(['moon', ml]);
    /* darkness */
    if (!nw.approx) {
      var dusk = astro.sunDay(nw.start, S.loc, tz).astro.end, dawn = astro.sunDay(nw.end, S.loc, tz).astro.start;
      if (dusk != null && dawn != null && dawn > dusk) lines.push(['dark', t('sum.dark', { from: UI.time(dusk, tz), to: UI.time(dawn, tz), len: UI.dur(dawn - dusk) })]);
      else lines.push(['dark', t('sum.noDark')]);
    }
    /* planets */
    var vis = planets.filter(function (p) { return p.status === 'good' || p.status === 'low'; });
    if (vis.length) lines.push(['planet', t('sum.planets', { names: vis.slice(0, 4).map(function (p) { return t('pl.' + p.id); }).join(', ') })]);
    else lines.push(['planet', t('sum.noPlanets')]);
    return lines;
  };

  var sunCard = function (day) {
    var tz = S.loc.tz, h = '<section class="card"><h3>' + orbHead('sun', t('sun')) + '</h3>';
    if (day.polar) h += '<p class="muted">' + esc(t(day.polar === 'day' ? 'sun.polarDay' : 'sun.polarNight')) + '</p>';
    else h += '<div class="grid2">' +
      stat(t('sunrise'), UI.time(day.sunrise, tz)) + stat(t('sunset'), UI.time(day.sunset, tz)) +
      stat(t('dayLen'), day.dayLength != null ? UI.dur(day.dayLength) : '—') + stat(t('solarNoon'), UI.time(day.noon, tz)) +
      stat(t('civilEnd'), UI.time(day.civil.end, tz)) + stat(t('darkBegins'), UI.time(day.astro.end, tz)) + '</div>';
    return h + '<a class="more" href="#/learn/history/sun">' + esc(t('historyCard')) + ' →</a></section>';
  };
  var orbHead = function (id, name) { return UI.orb(id, 26) + '<span>' + esc(name) + '</span>'; };

  var moonCard = function (moon) {
    var tz = S.loc.tz;
    return '<section class="card"><h3>' + orbHead('moon', t('moon')) + '</h3>' +
      '<div class="moonrow">' + UI.moonIcon(moon.illum / 100, moon.waxing, 76, S.loc.lat < 0) +
      '<div><div class="big">' + esc(t('phase.' + moon.phaseKey)) + '</div><div class="muted">' + esc(t('illum', { n: Math.round(moon.illum) })) + ' · ' + esc(t('age', { n: moon.age.toFixed(1) })) + '</div></div></div>' +
      '<div class="grid2">' + stat(t('moonrise'), UI.time(moon.moonrise, tz)) + stat(t('moonset'), UI.time(moon.moonset, tz)) +
      stat(t('nextFull'), esc(UI.date(moon.nextFull, tz))) + stat(t('nextNew'), esc(UI.date(moon.nextNew, tz))) +
      stat(t('distance'), Math.round(moon.distanceKm).toLocaleString('en-IN') + ' km') + stat(t('nextQuarter'), esc(UI.date(Math.min(moon.nextFirstQ, moon.nextLastQ), tz))) + '</div>' +
      '<a class="more" href="#/learn/history/moon">' + esc(t('historyCard')) + ' →</a></section>';
  };

  var planetRow = function (p) {
    var tz = S.loc.tz, detail;
    if (p.status === 'sun') detail = t('pl.glare');
    else if (p.best) detail = t('pl.best', { time: UI.time(p.best.t, tz), dir: dirWord(p.best.az), alt: UI.deg(p.best.alt) });
    else detail = t('pl.below');
    var rs = (p.rise != null || p.set != null) ? t('pl.riseSet', { rise: UI.time(p.rise, tz), set: UI.time(p.set, tz) }) : '';
    return '<div class="prow st-' + p.status + '"><a class="pmain" href="#/learn/history/' + p.id + '">' + UI.orb(p.id, 38) +
      '<span class="ptxt"><b>' + esc(t('pl.' + p.id)) + '</b><span class="chip c-' + p.status + '">' + esc(t('st.' + p.status)) + '</span>' + (p.retro ? '<span class="chip c-retro" title="' + esc(t('retroTip')) + '">℞ ' + esc(t('retro')) + '</span>' : '') +
      '<small>' + esc(detail) + '</small><small class="dim">' + esc(rs) + '</small></span></a>' +
      '<span class="pside"><span class="mag">' + esc(UI.mag(p.mag)) + '</span><small>' + esc(t('eye.' + p.eye)) + '</small>' +
      (p.best ? '<button class="btn sm" data-sky="' + p.id + '" data-t="' + p.best.t + '">' + esc(t('showSky')) + '</button>' : '') + '</span></div>';
  };

  var stargazeCard = function (sg) {
    if (!sg) return '';
    var why = [];
    why.push(t('sg.moon', { up: sg.moonUpPct, lit: Math.round(sg.moonIllum) }));
    why.push(sg.darkMs ? t('sg.dark', { len: UI.dur(sg.darkMs) }) : t('sg.noDark'));
    why.push(t('sg.sky', { n: sg.bortle }));
    return '<section class="card sg"><h3>✦ ' + esc(t('sg.title')) + '</h3><div class="sgrow"><div class="gauge" style="--v:' + sg.score + '" role="img" aria-label="' + sg.score + ' / 100"><b>' + sg.score + '</b></div>' +
      '<div><div class="big">' + esc(t('sg.' + sg.key)) + '</div><ul class="plain sm">' + why.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul></div></div>' +
      '<div id="cloudLine" class="muted sm">' + esc(!X.store.get('cloudOn', true) ? t('cloudOff') : navigator.onLine === false ? t('cloudOffline') : t('cloudLoading')) + '</div>' +
      '<a class="more" href="#/learn/guide">' + esc(t('sg.setSky')) + ' →</a></section>';
  };

  var weekCard = function (pw) {
    var tz = S.loc.tz, h = '<section class="card"><h3>' + esc(t('pw.title')) + '</h3>';
    if (!pw) return h + '<p class="muted">' + esc(t('pw.none')) + '</p></section>';
    var b = pw.info.best, retro = false; try { retro = astro.retrograde(pw.id, pw.bestDay); } catch (e) { /* ignore */ }
    return h + '<a class="pmain" href="#/learn/history/' + pw.id + '">' + UI.orb(pw.id, 44) + '<span class="ptxt"><b>' + esc(t('pl.' + pw.id)) + (retro ? ' <span class="chip c-retro">℞ ' + esc(t('retro')) + '</span>' : '') + '</b>' +
      '<small>' + esc(t('pw.days', { n: pw.days })) + ' · ' + esc(t('magLine', { m: UI.mag(pw.mag) })) + '</small>' +
      (b ? '<small>' + esc(t('pw.best', { date: UI.date(pw.bestDay, tz), time: UI.time(b.t, tz), dir: dirWord(b.az), alt: UI.deg(b.alt) })) + '</small>' : '') + '</span></a></section>';
  };

  var hilalCard = function (hl) {
    if (!hl || !hl.evenings.length) return '';
    var tz = S.loc.tz;
    return '<section class="card"><h3>🌙 ' + esc(t('hl.title')) + '</h3><p class="muted sm">' + esc(t('hl.new', { when: UI.date(hl.newMoon, tz) + ', ' + UI.time(hl.newMoon, tz) })) + '</p><div class="plist">' +
      hl.evenings.map(function (e) {
        return '<div class="prow"><span class="ptxt"><b>' + esc(UI.date(e.sunset, tz)) + '</b><small>' + esc(e.moonUp ? t('hl.row', { sunset: UI.time(e.sunset, tz), moonset: UI.time(e.moonset, tz), lag: e.lagMin != null ? Math.max(0, Math.round(e.lagMin)) : 0, age: Math.round(e.ageH) }) : t('hl.rowSet', { sunset: UI.time(e.sunset, tz), age: Math.round(e.ageH) })) + '</small></span>' +
          '<span class="chip c-' + (e.verdict === 'likely' ? 'good' : e.verdict === 'hard' ? 'low' : 'none') + '">' + esc(t('hl.' + e.verdict)) + '</span></div>';
      }).join('') + '</div><p class="note">' + esc(t('hl.note')) + '</p></section>';
  };

  var otdCard = function (list, next, lp) {
    if (!list.length) return '';
    var head = next ? t('otd.next', { date: X.otd.fmt(next.m, next.d) }) : t('otd.today');
    return '<section class="card"><h3>' + esc(head) + '</h3><ul class="plain otd">' + list.slice(0, 4).map(function (e) {
      return '<li><b>' + e.y + '</b> ' + esc(e[L()]) + (e.src ? ' ' + link(e.src) : '') + '</li>';
    }).join('') + '</ul><a class="more" href="#/learn/today">' + esc(t('otd.all')) + ' →</a></section>';
  };

  V.today = function (el) {
    var rerender = function () { V.today(el); i18n.apply(el); };
    if (!S.loc) return;
    var tz = S.loc.tz, tms = S.tms, day, moon, nw, mn, planets;
    try {
      day = astro.sunDay(tms, S.loc, tz); moon = astro.moonInfo(tms, S.loc, tz); nw = astro.nightWindow(tms, S.loc, tz);
      mn = astro.moonNight(nw, S.loc); planets = astro.planetList(tms, S.loc, tz);
    } catch (e) { el.innerHTML = '<section class="card"><p>' + esc(t('calcError')) + '</p></section>'; return; }
    planets.forEach(function (p) { try { p.retro = astro.retrograde(p.id, tms); } catch (e) { p.retro = false; } });
    var sum = summary(nw, moon, mn, planets), sg = null, pw = null, hl = null;
    try { sg = astro.stargazing(tms, S.loc, tz, X.store.get('bortle', 6)); } catch (e) { /* card is optional */ }
    try { pw = astro.planetOfWeek(tms, S.loc, tz); } catch (e) { /* optional */ }
    try { hl = astro.hilal(tms, S.loc, tz); } catch (e) { /* optional */ }
    var lp = astro.tzParts(tms, tz), od = X.otd.forDay(lp.mo, lp.d), odNext = null; if (!od.length) { odNext = X.otd.nearest(lp.mo, lp.d); od = odNext ? odNext.list : []; }
    var fact = X.facts[UI.localDayIndex(tms, tz) % X.facts.length];
    el.innerHTML =
      '<div class="page">' + dayBar() +
      '<section class="card hero"><h2>' + esc(isToday() ? t('tonightIn', { place: S.loc.name }) : t('nightOf', { place: S.loc.name })) + '</h2><ul class="sum">' +
      sum.map(function (l) { return '<li class="k-' + l[0] + '"><i></i><span>' + esc(l[1]) + '</span></li>'; }).join('') + '</ul>' +
      '<a class="btn pri" href="#/sky">' + esc(t('openSky')) + '</a></section>' +
      stargazeCard(sg) + '<div id="nextEv"></div>' +
      '<section class="card"><h3>' + esc(t('planetsTonight')) + '</h3><div class="plist">' + planets.map(planetRow).join('') + '</div>' +
      '<p class="note">' + esc(t('planetNote')) + '</p></section>' +
      weekCard(pw) + '<div class="two">' + moonCard(moon) + sunCard(day) + '</div>' + hilalCard(hl) + otdCard(od, odNext, lp) +
      '<section class="card fod"><h3>' + esc(t('factOfDay')) + '</h3><p>' + esc(fact[L()]) + '</p><div class="row">' + link(fact.src) + '<a class="more" href="#/learn/facts">' + esc(t('moreFacts')) + ' →</a></div></section></div>';
    wireDayBar(el, rerender);
    if (X.nextEventCard) X.nextEventCard($('#nextEv', el));
    if (sg) {
      var line = $('#cloudLine', el), cn = nw.start, ck = nw.end;
      if (line) cloudFor(S.loc, cn, ck).then(function (avg) {
        if (!document.body.contains(line)) return;
        line.textContent = avg == null ? t('cloudNone') : t('cloudLine', { n: avg, word: t(avg < 25 ? 'cloud.clear' : avg < 60 ? 'cloud.part' : 'cloud.heavy') });
      }).catch(function (e) { if (document.body.contains(line)) line.textContent = t(!X.store.get('cloudOn', true) ? 'cloudOff' : 'cloudOffline'); });
    }
    $$('[data-sky]', el).forEach(function (b) {
      b.onclick = function () { S.tms = +b.getAttribute('data-t'); S.live = false; S.sel = { type: 'planet', id: b.getAttribute('data-sky') }; go('#/sky'); };
    });
  };

  /* ================================================================== SKY */
  var skyState = function (sunAlt) { return sunAlt > 0 ? 'day' : sunAlt > -6 ? 'civil' : sunAlt > -12 ? 'naut' : sunAlt > -18 ? 'astro' : 'dark'; };

  V.sky = function (el) {
    var tz = S.loc.tz, timer = null, chart, destroyed = false;
    el.innerHTML = '<div class="page sky">' + dayBar() +
      '<div class="chart-wrap"><canvas id="cv" role="img" aria-label="' + esc(t('skyAria')) + '"></canvas></div>' +
      '<div class="timeline"><div class="tl-h"><b id="tlTime"></b><span id="tlState" class="chip"></span></div>' +
      '<input type="range" id="tlRange" min="0" max="1440" step="5" aria-label="' + esc(t('timeSlider')) + '"></div>' +
      '<div class="ctrl"><button class="btn sm" data-jump="now">' + esc(t('now')) + '</button><button class="btn sm" data-jump="sunset">' + esc(t('sunset')) + '</button>' +
      '<button class="btn sm" data-jump="midnight">' + esc(t('midnight')) + '</button><button class="btn sm" data-jump="sunrise">' + esc(t('sunrise')) + '</button>' +
      '<span class="sp"></span><button class="btn sm" data-step="-60" aria-label="' + esc(t('minus1h')) + '">−1h</button><button class="btn sm pri" id="btnPlay" aria-pressed="false">▶ ' + esc(t('play')) + '</button><button class="btn sm" data-step="60" aria-label="' + esc(t('plus1h')) + '">+1h</button></div>' +
      '<div class="ctrl"><a class="btn sm" id="btnAr" href="#/ar">' + esc(t('ar.open')) + '</a><button class="btn sm" id="btnPic">' + esc(t('savePic')) + '</button><button class="btn sm" id="btnPrint">' + esc(t('printChart')) + '</button></div>' +
      '<div class="layers" role="group" aria-label="' + esc(t('layers')) + '">' + ['lines', 'names', 'grid', 'mw'].map(function (k) { return '<button class="chip tg" data-layer="' + k + '" aria-pressed="false">' + esc(t('layer.' + k)) + '</button>'; }).join('') + '</div>' +
      '<div id="objCard"></div><p class="note">' + esc(t('skyHint')) + '</p></div>';

    chart = new X.SkyChart($('#cv', el));
    var rng = $('#tlRange', el);

    var dayStart = function () { return astro.dayWindow(S.tms, tz)[0]; };
    var objectCard = function () {
      var box = $('#objCard', el), sel = S.sel, it = sel && chart.find(sel); box.innerHTML = '';
      if (!sel) return;
      var name, sub = '', extra = '', id = null, B = chart.info && chart.info.bodies;
      var alt = it ? it.alt : null, az = it ? it.az : null;
      if (sel.type === 'sun') { name = t('sun'); id = 'sun'; alt = B.sun.alt; az = B.sun.az; }
      else if (sel.type === 'moon') {
        name = t('moon'); id = 'moon'; alt = B.moon.alt; az = B.moon.az; var mi = astro.moonInfo(S.tms);
        sub = t('phase.' + mi.phaseKey) + ' · ' + t('illum', { n: Math.round(mi.illum) });
      } else if (sel.type === 'planet') {
        var P = B.planets.filter(function (x) { return x.id === sel.id; })[0]; if (!P) return;
        name = t('pl.' + P.id); id = P.id; alt = P.alt; az = P.az;
        sub = t('magLine', { m: UI.mag(P.mag) }) + ' · ' + t('eye.' + P.eye) + (P.elong < 12 ? ' · ' + t('pl.glare') : '');
      } else if (sel.type === 'star' && it) {
        var D = root.CosmicaData, nm = D.names[it.hip], con = astro.constellationOf(it.ra / 15, it.dec);
        name = nm ? nm[0] : t('star') + ' HIP ' + it.hip; if (con && X.constellations && X.constellations[con.symbol]) extra = '<a class="more" href="#/learn/stars/' + con.symbol + '">' + esc(t('conStory', { c: con.name })) + ' →</a>';
        sub = t('magLine', { m: UI.mag(it.mag) }) + (con ? ' · ' + t('inCon', { c: con.name }) : '') + (nm ? ' · HIP ' + it.hip : '');
      } else return;
      var up = alt != null && alt > 0;
      box.innerHTML = '<section class="card objc"><div class="oc-h">' + (id ? UI.orb(id, 34) : '<span class="starico" aria-hidden="true">✦</span>') + '<div><b>' + esc(name) + '</b><div class="muted">' + esc(sub) + '</div></div>' +
        '<button class="x" id="ocX" aria-label="' + esc(t('close')) + '">×</button></div>' +
        '<div class="grid2">' + stat(t('altitude'), alt != null ? UI.deg(alt) : '—') + stat(t('direction'), az != null ? esc(dirWord(az)) + ' · ' + UI.deg(az) : '—') + '</div>' +
        '<p class="muted">' + esc(up ? t('aboveHor') : t('belowHor')) + '</p>' +
        (id && X.objects[id] ? '<a class="more" href="#/learn/history/' + id + '">' + esc(t('historyCard')) + ' →</a>' : '') + extra + '<button class="btn sm" id="ocLog">' + esc(t('ev.logIt')) + '</button></section>';
      $('#ocLog', box).onclick = function () { if (X.logUI) X.logUI.open({ what: name, kind: sel.type === 'star' ? 'star' : sel.type === 'moon' ? 'moon' : sel.type === 'planet' ? 'planet' : 'other', ts: Date.now() }); };
      $('#ocX', box).onclick = function () { S.sel = null; redraw(); };
    };

    var updateBar = function () {
      var iso = UI.isoDate(S.tms, tz);
      $('#dIn', el).value = iso; $('.dtxt', el).textContent = UI.dateFull(S.tms, tz);
      $('#tlTime', el).textContent = UI.time(S.tms, tz) + ' · ' + UI.date(S.tms, tz);
      rng.value = Math.round((S.tms - dayStart()) / 60000);
      var inf = chart.info, st = inf ? skyState(inf.sunAlt) : 'dark', c = $('#tlState', el);
      c.textContent = t('sky.' + st); c.className = 'chip c-' + (st === 'day' ? 'sun' : st === 'dark' ? 'good' : 'low');
      $$('[data-layer]', el).forEach(function (b) { b.setAttribute('aria-pressed', S.layers[b.getAttribute('data-layer')] ? 'true' : 'false'); });
    };
    var redraw = function () {
      if (destroyed) return;
      chart.layers = S.layers; chart.night = S.night; chart.selected = S.sel;
      chart.draw({ tms: S.tms, loc: S.loc }); updateBar(); objectCard(); i18n.apply(el);
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } var b = $('#btnPlay', el); if (b) { b.textContent = '▶ ' + t('play'); b.setAttribute('aria-pressed', 'false'); } };
    var setTime = function (ms) { S.tms = ms; S.live = Math.abs(ms - Date.now()) < 60000; redraw(); };

    wireDayBar(el, function () { stop(); rng.max = Math.round((astro.dayWindow(S.tms, tz)[1] - dayStart()) / 60000); redraw(); });
    rng.max = Math.round((astro.dayWindow(S.tms, tz)[1] - dayStart()) / 60000);
    rng.oninput = function () { stop(); setTime(dayStart() + (+rng.value) * 60000); };

    $$('[data-jump]', el).forEach(function (b) {
      b.onclick = function () {
        stop(); var k = b.getAttribute('data-jump');
        if (k === 'now') { S.tms = Date.now(); S.live = true; redraw(); return; }
        var d = astro.sunDay(S.tms, S.loc, tz);
        if (k === 'sunset') setTime(d.sunset != null ? d.sunset : dayStart() + 18 * 3600000);
        else if (k === 'sunrise') setTime(d.sunrise != null ? d.sunrise : dayStart() + 6 * 3600000);
        else { var nw = astro.nightWindow(S.tms, S.loc, tz); setTime(nw.start + (nw.end - nw.start) / 2); }     // middle of the night
      };
    });
    $$('[data-step]', el).forEach(function (b) { b.onclick = function () { stop(); setTime(S.tms + (+b.getAttribute('data-step')) * 60000); }; });
    $('#btnPlay', el).onclick = function () {
      if (timer) { stop(); return; }
      this.textContent = '⏸ ' + t('pause'); this.setAttribute('aria-pressed', 'true');
      timer = setInterval(function () { S.tms += 6 * 60000; S.live = false; redraw(); }, 90);
    };
    $$('[data-layer]', el).forEach(function (b) {
      b.onclick = function () { var k = b.getAttribute('data-layer'); S.layers[k] = !S.layers[k]; X.store.set('layers', S.layers); redraw(); };
    });

    var stamp = function () { return UI.date(S.tms, tz) + ', ' + UI.time(S.tms, tz); };
    $('#btnPic', el).onclick = function () {
      var W = 1080, Hh = 1400, c = document.createElement('canvas'); c.width = W; c.height = Hh; var g = c.getContext('2d');
      var bg = g.createLinearGradient(0, 0, 0, Hh); bg.addColorStop(0, S.night ? '#150202' : '#0b1230'); bg.addColorStop(1, S.night ? '#060000' : '#05070f'); g.fillStyle = bg; g.fillRect(0, 0, W, Hh);
      g.textAlign = 'center'; g.fillStyle = S.night ? '#ffb0a8' : '#e8edff'; g.font = '700 54px Poppins, sans-serif'; g.fillText(t('picTitle', { place: S.loc.name }), W / 2, 100);
      g.font = '400 34px Poppins, sans-serif'; g.fillStyle = S.night ? '#d9827a' : '#a3afd6'; g.fillText(stamp(), W / 2, 156);
      g.drawImage(cv, 40, 190, 1000, 1000);
      g.font = '400 26px Poppins, sans-serif'; g.fillText(t('picHint'), W / 2, 1250); g.font = '700 30px Poppins, sans-serif'; g.fillStyle = S.night ? '#ff6a5a' : '#8aa4ff'; g.fillText('Cosmica · ΣTΣЯПITY', W / 2, 1330);
      c.toBlob(function (blob) {
        if (!blob) return; var name = 'cosmica-sky-' + S.loc.name.replace(/[^\w]+/g, '-').toLowerCase() + '-' + UI.isoDate(S.tms, tz) + '.png';
        var file = typeof File === 'function' ? new File([blob], name, { type: 'image/png' }) : null;
        if (file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) { navigator.share({ files: [file], title: 'Cosmica' }).catch(function () { }); return; }
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
        UI.toast(t('picSaved'));
      }, 'image/png');
    };
    $('#btnPrint', el).onclick = function () {
      var B = chart.info && chart.info.bodies, rows = '';
      if (B) B.planets.filter(function (p) { return p.alt > 0; }).forEach(function (p) { rows += '<li>' + esc(t('pl.' + p.id)) + ' — ' + esc(dirWord(p.az)) + ', ' + UI.deg(p.alt) + ' ' + esc(t('high')) + ', ' + esc(t('magLine', { m: UI.mag(p.mag) })) + '</li>'; });
      var sheet = document.createElement('div'); sheet.id = 'printSheet';
      sheet.innerHTML = '<h1>' + esc(t('picTitle', { place: S.loc.name })) + '</h1><p>' + esc(stamp()) + ' · ' + esc(S.loc.lat.toFixed(2)) + '°, ' + esc(S.loc.lon.toFixed(2)) + '°</p><img alt="" src="' + cv.toDataURL('image/png') + '">' +
        '<p>' + esc(t('skyHint')) + '</p>' + (rows ? '<ul>' + rows + '</ul>' : '') + '<p class="pf">Cosmica · ΣTΣЯПITY</p>';
      document.body.appendChild(sheet);
      var done = function () { sheet.remove(); root.removeEventListener('afterprint', done); }; root.addEventListener('afterprint', done);
      setTimeout(function () { root.print(); setTimeout(done, 1500); }, 60);
    };

    /* tap / click on the chart */
    var cv = $('#cv', el);
    cv.addEventListener('click', function (e) {
      var r = cv.getBoundingClientRect(), it = chart.hit(e.clientX - r.left, e.clientY - r.top);
      S.sel = it ? { type: it.type, id: it.id, hip: it.hip } : null; redraw();
    });
    var onResize = function () { chart.resize(); };
    root.addEventListener('resize', onResize);
    /* live clock: keep the picture current while "Now" */
    var live = setInterval(function () { if (S.live && !timer) { S.tms = Date.now(); redraw(); } }, 30000);

    redraw();
    return function () { destroyed = true; stop(); clearInterval(live); root.removeEventListener('resize', onResize); };
  };

  /* ================================================================== ABOUT */
  V.about = function (el, ctx) {
    var privacy = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
    el.innerHTML = '<div class="page about">' +
      '<section class="card hero"><div class="ab-h"><svg viewBox="0 0 48 48" width="54" height="54" aria-hidden="true"><use href="#logo"/></svg><div><h2>Cosmica</h2><p class="muted">' + esc(t('about.tag')) + '</p></div></div>' +
      '<p>' + esc(t('about.what')) + '</p><div class="row"><button class="btn pri" id="abInstall" hidden>' + esc(t('install')) + '</button><span class="muted" id="iosTip" hidden>' + esc(t('installIos')) + '</span></div></section>' +
      '<section class="card"><h3>' + esc(t('settings')) + '</h3><div class="row wrap"><span class="muted">' + esc(t('timeFmt')) + '</span>' +
      '<button class="chip tg" data-h12="1" aria-pressed="' + S.h12 + '">' + esc(t('h12')) + '</button><button class="chip tg" data-h12="0" aria-pressed="' + !S.h12 + '">' + esc(t('h24')) + '</button></div>' +
      '<div class="row wrap"><span class="muted">' + esc(t('cloudSetting')) + '</span><button class="chip tg" data-cloud="1" aria-pressed="' + X.store.get('cloudOn', true) + '">' + esc(t('on')) + '</button><button class="chip tg" data-cloud="0" aria-pressed="' + !X.store.get('cloudOn', true) + '">' + esc(t('off')) + '</button></div></section>' +
      '<section class="card priv"><h3>🔒 ' + esc(t('privTitle')) + '</h3><ul class="ticks">' + privacy.map(function (k) { return '<li>' + esc(t('priv.' + k)) + '</li>'; }).join('') + '</ul>' +
      '<button class="btn sm" id="wipe">' + esc(t('clearData')) + '</button></section>' +
      '<section class="card"><h3>' + esc(t('disclaimerTitle')) + '</h3><p>' + esc(t('disclaimer')) + '</p></section>' +
      '<section class="card"><h3>' + esc(t('credits')) + '</h3><ul class="plain">' +
      '<li><a class="src" href="https://github.com/cosinekitty/astronomy" target="_blank" rel="noopener noreferrer">Astronomy Engine ↗</a> — ' + esc(t('cr.engine')) + ' (MIT)</li>' +
      '<li><a class="src" href="https://github.com/ofrohn/d3-celestial" target="_blank" rel="noopener noreferrer">d3-celestial ↗</a> — ' + esc(t('cr.stars')) + ' (BSD-3)</li>' +
      '<li><a class="src" href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo ↗</a> — ' + esc(t('cr.geo')) + '</li>' +
      '<li>Poppins — Indian Type Foundry (OFL)</li></ul></section>' +
      '<p class="dev">' + esc(t('developer')) + ' <b>ΣTΣЯПITY</b> · v2.0</p></div>';
    $$('[data-h12]', el).forEach(function (b) { b.onclick = function () { S.h12 = b.getAttribute('data-h12') === '1'; X.store.set('h12', S.h12); V.about(el, ctx); i18n.apply(el); }; });
    $$('[data-cloud]', el).forEach(function (b) { b.onclick = function () { X.store.set('cloudOn', b.getAttribute('data-cloud') === '1'); V.about(el, ctx); i18n.apply(el); }; });
    $('#wipe', el).onclick = function () {
      if (!root.confirm(t('clearConfirm'))) return;
      X.store.wipe(); UI.toast(t('cleared')); setTimeout(function () { location.reload(); }, 600);
    };
    if (ctx && ctx.syncInstall) ctx.syncInstall();
  };
})(typeof window !== 'undefined' ? window : globalThis);
