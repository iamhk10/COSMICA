/* =========================================================================
   Cosmica — js/log.js : the observation log (what you saw, where, when) — saved only in this browser.
   Pure functions on a list, so they are unit-tested in Node (tests/log.test.js). X.obsLog wraps them with X.store.
   Entry: { id, ts (ms), what (text, ≤ 80), kind, seen (true/false), rating (1–5 sky quality, 0 = not given), place (text), lat, lon, notes (≤ 600) }
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {};
  var KINDS = ['moon', 'planet', 'star', 'meteor', 'eclipse', 'conj', 'deep', 'other'];
  var MAX = 500, WHAT = 80, NOTES = 600;
  var L = X.log = { KINDS: KINDS, MAX: MAX };

  var clean = function (s, n) { return String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, n); };
  /** validate + normalise one entry; returns null if unusable */
  L.normalize = function (e) {
    if (!e || typeof e !== 'object') return null;
    var what = clean(e.what, WHAT), ts = +e.ts; if (!what || !isFinite(ts) || ts < 0 || ts > 4102444800000) return null;
    var rating = Math.round(+e.rating || 0); if (rating < 0 || rating > 5) rating = 0;
    var lat = isFinite(+e.lat) && e.lat !== '' && e.lat != null ? +e.lat : null, lon = isFinite(+e.lon) && e.lon !== '' && e.lon != null ? +e.lon : null;
    if (lat != null && (lat < -90 || lat > 90)) lat = null; if (lon != null && (lon < -180 || lon > 180)) lon = null;
    return { id: clean(e.id, 40) || L.newId(ts), ts: ts, what: what, kind: KINDS.indexOf(e.kind) >= 0 ? e.kind : 'other', seen: e.seen !== false, rating: rating, place: clean(e.place, 80), lat: lat, lon: lon, notes: clean(e.notes, NOTES) };
  };
  var seq = 0;
  L.newId = function (ts) { seq = (seq + 1) % 1296; return (ts || Date.now()).toString(36) + seq.toString(36) + Math.floor(Math.random() * 1296).toString(36); };
  /** add an entry (newest first). Returns { list, entry, error }. */
  L.add = function (list, e) {
    var n = L.normalize(e); if (!n) return { list: list, error: 'invalid' };
    if (list.length >= MAX) return { list: list, error: 'full' };
    var out = [n].concat(list.filter(function (x) { return x.id !== n.id; })); out.sort(function (a, b) { return b.ts - a.ts; });
    return { list: out, entry: n };
  };
  L.remove = function (list, id) { return list.filter(function (x) { return x.id !== id; }); };
  /** summary numbers for the top of the page */
  L.stats = function (list) {
    var seen = list.filter(function (x) { return x.seen; }), names = {}, days = {};
    seen.forEach(function (x) { names[x.what.toLowerCase()] = 1; days[new Date(x.ts).toISOString().slice(0, 10)] = 1; });
    return { total: list.length, seen: seen.length, distinct: Object.keys(names).length, nights: Object.keys(days).length };
  };
  /** CSV that opens in Excel/Sheets; text cells starting with = + - @ are neutralised (spreadsheet formula injection) */
  L.toCsv = function (list) {
    var cell = function (v) { var s = String(v == null ? '' : v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    var head = ['date_utc', 'what', 'kind', 'seen', 'sky_rating', 'place', 'lat', 'lon', 'notes'];
    return '\ufeff' + [head.join(',')].concat(list.map(function (x) {
      return [new Date(x.ts).toISOString(), x.what, x.kind, x.seen ? 'yes' : 'no', x.rating || '', x.place, x.lat == null ? '' : x.lat, x.lon == null ? '' : x.lon, x.notes].map(cell).join(',');
    })).join('\r\n') + '\r\n';
  };
  L.toJson = function (list) { return JSON.stringify({ app: 'Cosmica', kind: 'observation-log', version: 1, entries: list }, null, 1); };
  /** merge a JSON export into the list: returns { list, added, skipped } — unusable or duplicate (same id) entries are skipped */
  L.importJson = function (list, text) {
    var data; try { data = JSON.parse(text); } catch (e) { return { list: list, added: 0, skipped: 0, error: 'parse' }; }
    var arr = Array.isArray(data) ? data : data && Array.isArray(data.entries) ? data.entries : null; if (!arr) return { list: list, added: 0, skipped: 0, error: 'shape' };
    var out = list.slice(), have = {}, added = 0, skipped = 0; out.forEach(function (x) { have[x.id] = 1; });
    arr.slice(0, MAX * 2).forEach(function (e) {
      var n = L.normalize(e); if (!n || have[n.id] || out.length >= MAX) { skipped++; return; } have[n.id] = 1; out.push(n); added++;
    });
    out.sort(function (a, b) { return b.ts - a.ts; }); return { list: out, added: added, skipped: skipped };
  };
  /* persistence */
  X.obsLog = {
    all: function () { var v = X.store.get('log', []); return Array.isArray(v) ? v.map(L.normalize).filter(Boolean) : []; },
    save: function (list) { X.store.set('log', list); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
