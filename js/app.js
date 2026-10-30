/* =========================================================================
   Cosmica — js/app.js : start-up, location choice, router, language / night toggles, install, offline.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$;
  var main, cleanup = null, deferredInstall = null;

  /* ------------------------------------------------------------------ location */
  var deviceTz = function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'; } catch (e) { return 'Asia/Kolkata'; } };
  var validTz = function (tz) { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch (e) { return false; } };
  var cities = X.cities;
  var defaultLoc = function () {
    var tz = deviceTz(), hit = cities.filter(function (c) { return c.tz === tz; })[0];
    return hit || cities[0];
  };
  var km = function (a, b) {
    var r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 12742 * Math.asin(Math.sqrt(h));
  };
  var setLoc = function (loc, quiet) {
    S.loc = { name: loc.name, region: loc.region || '', lat: loc.lat, lon: loc.lon, tz: loc.tz };
    X.store.set('loc', S.loc);
    $('#locName').textContent = S.loc.name;
    S.sel = null;
    if (!quiet) { S.tms = Date.now(); S.live = true; render(); }
  };

  var norm = function (s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var searchLocal = function (q) {
    q = norm(q.trim()); if (!q) return [];
    var starts = [], has = [];
    cities.forEach(function (c) { var n = norm(c.name); if (n.indexOf(q) === 0) starts.push(c); else if (n.indexOf(q) > 0 || norm(c.region).indexOf(q) >= 0) has.push(c); });
    return starts.concat(has).slice(0, 8);
  };
  var searchOnline = function (q, signal) {
    var u = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(q.trim()) + '&count=8&language=en&format=json';
    return fetch(u, { signal: signal }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); }).then(function (j) {
      return (j.results || []).filter(function (r) { return typeof r.latitude === 'number' && typeof r.longitude === 'number' && r.timezone && validTz(r.timezone); }).map(function (r) {
        return { name: r.name, region: [r.admin1, r.country].filter(Boolean).join(', '), lat: r.latitude, lon: r.longitude, tz: r.timezone };
      });
    });
  };

  var openLocation = function () {
    UI.dialog(t('chooseLoc'),
      '<input id="lq" class="search" type="search" autocomplete="off" placeholder="' + esc(t('searchCity')) + '" aria-label="' + esc(t('searchCity')) + '">' +
      '<div id="lsaved"></div><div id="lstat" class="muted sm"></div><div id="lres" class="lres"></div>' +
      '<div class="row wrap"><button class="btn" id="lgeo">' + esc(t('useMyLoc')) + '</button><button class="btn" id="lman">' + esc(t('enterCoords')) + '</button></div>' +
      '<div id="lmanBox" hidden class="manual"><div class="grid2"><label>' + esc(t('latitude')) + '<input id="mLat" inputmode="decimal" placeholder="28.61"></label><label>' + esc(t('longitude')) + '<input id="mLon" inputmode="decimal" placeholder="77.21"></label></div>' +
      '<label>' + esc(t('timezone')) + '<input id="mTz" list="tzl" value="' + esc(deviceTz()) + '"></label><datalist id="tzl"></datalist>' +
      '<button class="btn pri" id="mGo">' + esc(t('useThis')) + '</button><div id="mErr" class="err"></div></div>',
      function (body, close) {
        var results = [], ctl = null, timer = null, seq = 0;
        var q = $('#lq', body), res = $('#lres', body), st = $('#lstat', body);
        var show = function (list, online) {
          results = list;
          res.innerHTML = list.map(function (c, i) { return '<button class="lr" data-i="' + i + '"><b>' + esc(c.name) + '</b><span>' + esc(c.region) + '</span>' + (c.online ? '<i>' + esc(t('onlineTag')) + '</i>' : '') + '</button>'; }).join('') || '<p class="muted">' + esc(q.value.trim() ? t('noResults') : '') + '</p>';
        };
        var run = function () {
          var text = q.value, local = searchLocal(text); st.textContent = '';
          if (!text.trim()) { show(cities.slice(0, 8)); return; }
          show(local);
          if (ctl) ctl.abort(); clearTimeout(timer);
          if (text.trim().length < 2 || !navigator.onLine) { if (!navigator.onLine && text.trim().length >= 2) st.textContent = t('offlineSearch'); return; }
          var my = ++seq;
          timer = setTimeout(function () {
            ctl = typeof AbortController !== 'undefined' ? new AbortController() : null; st.textContent = t('searching');
            var tm = setTimeout(function () { if (ctl) ctl.abort(); }, 7000);
            searchOnline(text, ctl && ctl.signal).then(function (list) {
              clearTimeout(tm); if (my !== seq) return; st.textContent = '';
              var seen = {}; local.forEach(function (c) { seen[norm(c.name) + Math.round(c.lat)] = 1; });
              list = list.filter(function (c) { return !seen[norm(c.name) + Math.round(c.lat)]; }).map(function (c) { c.online = true; return c; });
              show(local.concat(list));
            }).catch(function () { clearTimeout(tm); if (my === seq) st.textContent = t('searchFail'); });
          }, 350);
        };
        var drawSaved = function () {
          var list = X.store.get('saved', []), here = S.loc, has = list.some(function (c) { return Math.abs(c.lat - here.lat) < 0.005 && Math.abs(c.lon - here.lon) < 0.005; });
          $('#lsaved', body).innerHTML = (list.length ? '<div class="savedrow" role="group" aria-label="' + esc(t('savedPlaces')) + '">' + list.map(function (c, i) {
            return '<span class="sv"><button class="chip tg" data-sv="' + i + '">★ ' + esc(c.name) + '</button><button class="x sm" data-rm="' + i + '" aria-label="' + esc(t('removePlace') + ' ' + c.name) + '">×</button></span>'; }).join('') + '</div>' : '') +
            '<button class="btn sm" id="svHere"' + (has ? ' disabled' : '') + '>★ ' + esc(has ? t('placeAlready') : t('savePlace')) + ' — ' + esc(here.name) + '</button>';
          $('#svHere', body).onclick = function () {
            var l = X.store.get('saved', []); if (l.length >= 10) { st.textContent = t('placeFull'); return; }
            l.push({ name: here.name, region: here.region, lat: here.lat, lon: here.lon, tz: here.tz }); X.store.set('saved', l); UI.toast(t('placeSaved')); drawSaved();
          };
          $$('[data-sv]', body).forEach(function (b) { b.onclick = function () { var c = X.store.get('saved', [])[+b.getAttribute('data-sv')]; if (c) { close(); setLoc(c); } }; });
          $$('[data-rm]', body).forEach(function (b) { b.onclick = function () { var l = X.store.get('saved', []); l.splice(+b.getAttribute('data-rm'), 1); X.store.set('saved', l); drawSaved(); }; });
        };
        drawSaved();
        q.oninput = run; run();
        res.onclick = function (e) { var b = e.target.closest('.lr'); if (!b) return; var c = results[+b.getAttribute('data-i')]; if (c) { close(); setLoc(c); } };

        $('#lgeo', body).onclick = function () {
          if (!navigator.geolocation) { st.textContent = t('geoNo'); return; }
          st.textContent = t('locating');
          navigator.geolocation.getCurrentPosition(function (p) {
            var here = { lat: p.coords.latitude, lon: p.coords.longitude }, near = null, nd = 1e9;
            cities.forEach(function (c) { var d = km(here, c); if (d < nd) { nd = d; near = c; } });
            var label = Math.abs(here.lat).toFixed(2) + '°' + (here.lat >= 0 ? 'N' : 'S') + ', ' + Math.abs(here.lon).toFixed(2) + '°' + (here.lon >= 0 ? 'E' : 'W');
            close(); setLoc({ name: t('yourPlace'), region: label + (near && nd < 80 ? ' · ' + t('nearCity', { c: near.name }) : ''), lat: here.lat, lon: here.lon, tz: deviceTz() });
          }, function () { st.textContent = t('geoDenied'); }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
        };
        $('#lman', body).onclick = function () { $('#lmanBox', body).hidden = false; $('#mLat', body).focus(); };
        try { var zs = (Intl.supportedValuesOf && Intl.supportedValuesOf('timeZone')) || []; $('#tzl', body).innerHTML = zs.map(function (z) { return '<option value="' + esc(z) + '">'; }).join(''); } catch (e) { /* optional */ }
        $('#mGo', body).onclick = function () {
          var lat = parseFloat($('#mLat', body).value.replace(',', '.')), lon = parseFloat($('#mLon', body).value.replace(',', '.')), tz = $('#mTz', body).value.trim(), err = $('#mErr', body);
          if (!(lat >= -90 && lat <= 90) || !(lon >= -180 && lon <= 180)) { err.textContent = t('badCoords'); return; }
          if (!validTz(tz)) { err.textContent = t('badTz'); return; }
          close(); setLoc({ name: t('customPlace'), region: lat.toFixed(2) + '°, ' + lon.toFixed(2) + '°', lat: lat, lon: lon, tz: tz });
        };
        setTimeout(function () { q.focus(); }, 60);
      });
  };

  /* ------------------------------------------------------------------ router */
  var parse = function () {
    var h = (location.hash || '#/').replace(/^#\/?/, ''), p = h.split('/').filter(Boolean);
    return { name: p[0] || 'today', rest: p.slice(1) };
  };
  var render = function () {
    if (!S.loc) return;
    if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } cleanup = null; }
    var r = parse(), name = ['today', 'sky', 'events', 'learn', 'quiz', 'about', 'ar'].indexOf(r.name) >= 0 ? r.name : 'today';
    if (S.live) S.tms = Date.now();
    $$('.dock a').forEach(function (a) { var on = a.getAttribute('data-route') === (name === 'ar' ? 'sky' : name); a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    main.innerHTML = '';
    var res = null;
    try { res = V[name](main, name === 'learn' || name === 'quiz' || name === 'events' ? r.rest : { syncInstall: syncInstall }); }
    catch (e) { main.innerHTML = '<div class="page"><section class="card"><p>' + esc(t('calcError')) + '</p></section></div>'; if (root.console) console.error(e); }
    cleanup = typeof res === 'function' ? res : null;
    i18n.apply(main); document.title = 'Cosmica — ' + t('nav.' + name); document.body.classList.toggle('in-ar', name === 'ar');
  };
  var lastRoute = '';
  root.addEventListener('hashchange', function () { var k = location.hash; render(); if (k !== lastRoute) { root.scrollTo(0, 0); lastRoute = k; } });

  /* ------------------------------------------------------------------ header toggles */
  var syncHeader = function () {
    $('#langEn').classList.toggle('on', i18n.lang === 'en'); $('#langHi').classList.toggle('on', i18n.lang === 'hi');
    $('#btnLang').setAttribute('aria-label', i18n.lang === 'en' ? 'Language: English. Switch to Hinglish' : 'Language: Hinglish. Switch to English');
    document.body.classList.toggle('night', !!S.night); $('#btnNight').setAttribute('aria-pressed', S.night ? 'true' : 'false');
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', S.night ? '#0a0000' : '#070b1a');
  };

  /* ------------------------------------------------------------------ install + offline */
  var standalone = function () { return (root.matchMedia && root.matchMedia('(display-mode: standalone)').matches) || root.navigator.standalone === true; };
  function syncInstall() {
    var can = !!deferredInstall && !standalone(), ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone() && !deferredInstall;
    var h = $('#btnInstall'); if (h) h.hidden = !can;
    var a = $('#abInstall'); if (a) { a.hidden = !can; a.onclick = doInstall; }
    var i = $('#iosTip'); if (i) i.hidden = !ios;
  }
  function doInstall() {
    if (!deferredInstall) return; deferredInstall.prompt();
    deferredInstall.userChoice.then(function () { deferredInstall = null; syncInstall(); });
  }
  root.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; syncInstall(); });
  root.addEventListener('appinstalled', function () { deferredInstall = null; syncInstall(); UI.toast(t('installed')); });
  var syncOnline = function () { $('#offChip').hidden = navigator.onLine !== false; };
  root.addEventListener('online', syncOnline); root.addEventListener('offline', syncOnline);

  var registerSW = function () {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      var hadController = !!navigator.serviceWorker.controller;
      reg.addEventListener('updatefound', function () {
        var w = reg.installing; if (!w) return;
        w.addEventListener('statechange', function () { if (w.state === 'installed') UI.toast(t(hadController ? 'updateReady' : 'offlineReady'), 4200); });
      });
    }).catch(function () { /* offline mode is optional */ });
  };

  /* ------------------------------------------------------------------ start */
  var start = function () {
    main = $('#main'); i18n.init();
    var saved = X.store.get('loc', null);
    var ok = saved && typeof saved.lat === 'number' && typeof saved.lon === 'number' && validTz(saved.tz);
    var first = !ok;
    S.loc = ok ? saved : null; if (!ok) { var d = defaultLoc(); S.loc = { name: d.name, region: d.region, lat: d.lat, lon: d.lon, tz: d.tz }; X.store.set('loc', S.loc); }
    $('#locName').textContent = S.loc.name; syncHeader(); syncOnline(); syncInstall();

    $('#btnLoc').onclick = openLocation;
    $('#btnLang').onclick = function () { i18n.setLang(i18n.lang === 'en' ? 'hi' : 'en'); syncHeader(); i18n.apply(document); $('#locName').textContent = S.loc.name; render(); };
    $('#btnNight').onclick = function () { S.night = !S.night; X.store.set('night', S.night); syncHeader(); render(); };
    $('#btnInstall').onclick = doInstall;
    $('#dlgX').onclick = function () { $('#dlg').close(); };
    $('#dlg').addEventListener('click', function (e) { if (e.target === this) this.close(); });

    i18n.apply(document); render(); registerSW();
    if (X.remindTick) { X.remindTick(); setInterval(X.remindTick, 60000); document.addEventListener('visibilitychange', function () { if (!document.hidden) X.remindTick(); }); }
    if (first) setTimeout(function () { UI.toast(t('defaultLoc', { place: S.loc.name }), 4800); }, 700);
    setInterval(function () { if (S.live && parse().name === 'today' && !$('#dlg').open) { S.tms = Date.now(); V.today(main); i18n.apply(main); } }, 5 * 60000);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(typeof window !== 'undefined' ? window : globalThis);
