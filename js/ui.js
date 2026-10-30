/* =========================================================================
   Cosmica — js/ui.js : small helpers (storage, toast, dialog, time formatting) + the shared app state.
   Everything saved stays in this browser's localStorage under the "cm." prefix.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, astro = X.astro;

  /* ------------------------------------------------------------- storage */
  var mem = {};
  X.store = {
    get: function (k, def) { try { var s = localStorage.getItem('cm.' + k); if (s != null) return JSON.parse(s); } catch (e) { /* blocked */ } return k in mem ? mem[k] : def; },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem('cm.' + k, JSON.stringify(v)); } catch (e) { /* full or blocked: keep in memory */ } },
    del: function (k) { delete mem[k]; try { localStorage.removeItem('cm.' + k); } catch (e) { /* ignore */ } },
    wipe: function () { mem = {}; try { Object.keys(localStorage).filter(function (k) { return k.indexOf('cm.') === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) { /* ignore */ } }
  };

  var UI = X.ui = {};
  UI.$ = function (s, r) { return (r || document).querySelector(s); };
  UI.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  UI.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  UI.toast = function (msg, ms) {
    var box = document.getElementById('toasts'); if (!box) return;
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; box.appendChild(t); setTimeout(function () { t.remove(); }, ms || 2600);
  };

  /** open the shared <dialog>; init(bodyEl, close) wires its buttons */
  UI.dialog = function (title, html, init) {
    var d = document.getElementById('dlg'), body = document.getElementById('dlgBody');
    document.getElementById('dlgTitle').textContent = title; body.innerHTML = html;
    var close = function () { if (d.open) d.close(); };
    if (init) init(body, close);
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
  };

  /* ------------------------------------------------------------- shared state */
  var S = X.S = {
    loc: null, tms: Date.now(), live: true, sel: null, h12: X.store.get('h12', true),
    layers: X.store.get('layers', { lines: true, names: true, grid: false, mw: true }), night: X.store.get('night', false)
  };

  /* ------------------------------------------------------------- time formatting (always in the chosen place's time zone) */
  var tf = {};
  var fmtr = function (key, opts) { if (!tf[key]) tf[key] = new Intl.DateTimeFormat(X.i18n && X.i18n.lang === 'hi' ? 'en-IN' : 'en-GB', opts); return tf[key]; };
  UI.time = function (ms, tz) {
    if (ms == null) return '—';
    tz = tz || S.loc.tz;
    return fmtr('t' + tz + S.h12, { timeZone: tz, hour: S.h12 ? 'numeric' : '2-digit', minute: '2-digit', hour12: S.h12 }).format(new Date(ms)).replace(/\s?([ap])m$/i, function (m, c) { return ' ' + c.toLowerCase() + 'm'; }).replace(/^24:/, '00:');
  };
  UI.date = function (ms, tz) { return fmtr('d' + (tz || S.loc.tz) + (X.i18n ? X.i18n.lang : ''), { timeZone: tz || S.loc.tz, weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(ms)); };
  UI.dateFull = function (ms, tz) { return fmtr('f' + (tz || S.loc.tz), { timeZone: tz || S.loc.tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(ms)); };
  /** "2026-10-28" for a date input, in the chosen zone */
  UI.isoDate = function (ms, tz) { var p = astro.tzParts(ms, tz || S.loc.tz); return p.y + '-' + ('0' + p.mo).slice(-2) + '-' + ('0' + p.d).slice(-2); };
  /** instant of local noon on an ISO date in the chosen zone (a safe anchor for "that day") */
  UI.fromIso = function (iso, tz) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); if (!m) return null;
    var wall = Date.UTC(+m[1], +m[2] - 1, +m[3], 12, 0, 0); return wall - astro.tzOffset(wall, tz || S.loc.tz);
  };
  UI.dur = function (ms) { var m = Math.round(ms / 60000); return Math.floor(m / 60) + ' h ' + ('0' + (m % 60)).slice(-2) + ' m'; };
  UI.deg = function (x) { return Math.round(x) + '°'; };
  UI.mag = function (m) { return (m > 0 ? '+' : m < 0 ? '−' : '') + Math.abs(m).toFixed(1); };

  /** a tiny SVG moon with the right part lit. illum 0–1; waxing true → lit on the right (flipped for the southern hemisphere) */
  UI.moonIcon = function (illum, waxing, size, south) {
    var r = 20, k = illum, rx = Math.abs(1 - 2 * k) * r, lit = (waxing !== !!south);
    var d = 'M0 ' + (-r) + 'A' + r + ' ' + r + ' 0 0 1 0 ' + r + 'A' + rx.toFixed(2) + ' ' + r + ' 0 0 ' + (k < 0.5 ? 0 : 1) + ' 0 ' + (-r) + 'Z';
    return '<svg class="moon-ico" viewBox="-24 -24 48 48" width="' + size + '" height="' + size + '" aria-hidden="true"><circle r="' + r + '" fill="#2a3150"/>' +
      (k > 0.004 ? '<path d="' + d + '" fill="#f1eedc"' + (lit ? '' : ' transform="scale(-1 1)"') + '/>' : '') + '<circle r="' + r + '" fill="none" stroke="rgba(255,255,255,.25)"/></svg>';
  };

  /** the CSS "planet ball" */
  UI.orb = function (id, size) {
    var c = (X.objects[id] && X.objects[id].color) || '#ccc';
    return '<span class="orb o-' + id + '" style="--c:' + c + ';--s:' + (size || 40) + 'px" aria-hidden="true"></span>';
  };

  UI.localDayIndex = function (ms, tz) { var p = astro.tzParts(ms, tz || S.loc.tz); return Math.floor(Date.UTC(p.y, p.mo - 1, p.d) / 86400000); };
})(typeof window !== 'undefined' ? window : globalThis);
