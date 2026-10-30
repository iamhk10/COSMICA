/* Observation log + reminders: pure logic. */
globalThis.Cosmica = {}; require('../js/log.js'); require('../js/remind.js');
const X = Cosmica, L = X.log, R = X.remind;
let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };
const T0 = Date.UTC(2026, 9, 29, 15);

/* ---- log */
ok(L.normalize(null) === null && L.normalize({}) === null && L.normalize({ what: '  ', ts: T0 }) === null && L.normalize({ what: 'Moon', ts: 'x' }) === null && L.normalize({ what: 'Moon', ts: -5 }) === null, 'unusable entries are refused');
const e = L.normalize({ what: ' Jupiter ', ts: T0, kind: 'planet', rating: 9, lat: 91, lon: 20, notes: 'x'.repeat(900), place: 'Delhi' });
ok(e.what === 'Jupiter' && e.kind === 'planet' && e.rating === 0 && e.lat === null && e.lon === 20 && e.notes.length === 600 && e.seen === true && e.id, 'values are cleaned and limited');
ok(L.normalize({ what: 'a', ts: T0, kind: 'weird' }).kind === 'other', 'unknown kind becomes "other"'); ok(L.normalize({ what: 'a', ts: T0, seen: false }).seen === false, 'not-seen entries are kept');
ok(L.normalize({ what: 'a\u0000b', ts: T0 }).what === 'ab', 'control characters are stripped');
let list = []; let r = L.add(list, { what: 'Moon', ts: T0 }); list = r.list; r = L.add(list, { what: 'Saturn', ts: T0 + 1000, kind: 'planet' }); list = r.list; r = L.add(list, { what: 'Old', ts: T0 - 99999 }); list = r.list;
ok(list.map(x => x.what).join() === 'Saturn,Moon,Old', 'newest first'); ok(new Set(list.map(x => x.id)).size === 3, 'unique ids'); ok(L.add(list, { what: '', ts: 1 }).error === 'invalid', 'invalid add reports an error');
ok(L.remove(list, list[1].id).length === 2 && L.remove(list, 'nope').length === 3, 'remove by id');
let big = []; for (let i = 0; i < L.MAX; i++) big = L.add(big, { what: 'x' + i, ts: T0 + i }).list; ok(big.length === L.MAX && L.add(big, { what: 'one more', ts: T0 }).error === 'full', 'the log is capped at ' + L.MAX);
const st = L.stats([{ what: 'Moon', ts: T0, seen: true }, { what: 'moon', ts: T0 + 1000, seen: true }, { what: 'Mars', ts: T0 + 864e5, seen: true }, { what: 'Comet', ts: T0, seen: false }].map(L.normalize));
ok(st.total === 4 && st.seen === 3 && st.distinct === 2 && st.nights === 2, 'stats count seen objects and nights: ' + JSON.stringify(st));
const csv = L.toCsv([L.normalize({ what: '=HYPERLINK("http://x")', ts: T0, notes: 'a, "b"\nc', place: '+91' })]);
ok(csv.startsWith('﻿date_utc,what,') && /\r\n$/.test(csv), 'CSV has a header and CRLF'); ok(csv.includes("\"'=HYPERLINK(\"\"http://x\"\")\"") || csv.includes("'=HYPERLINK"), 'a leading = is neutralised'); ok(csv.includes("'+91") && csv.includes('"a, ""b""\nc"'), 'commas, quotes, newlines are quoted');
const js = L.toJson(list), back = L.importJson([], js); ok(back.added === 3 && back.skipped === 0 && back.list.length === 3, 'JSON export imports back');
const again = L.importJson(back.list, js); ok(again.added === 0 && again.skipped === 3 && again.list.length === 3, 'importing twice adds nothing');
ok(L.importJson([], 'not json').error === 'parse' && L.importJson([], '{"a":1}').error === 'shape' && L.importJson([], '[1,2,{"what":"ok","ts":5}]').added === 1, 'bad files are rejected safely');
ok(L.importJson([], JSON.stringify([{ what: '<img src=x onerror=1>', ts: 5 }])).list[0].what === '<img src=x onerror=1>', 'text is kept as text (it is escaped when shown)');

/* ---- reminders */
let rl = []; let s = R.set(rl, { id: 'meteor:gem:20261214', t: T0 + 5 * 864e5, lead: 1440, title: 'Geminids' }, T0); rl = s.list; ok(rl.length === 1 && rl[0].lead === 1440 && rl[0].fired === false, 'a reminder is stored');
ok(R.set(rl, { id: 'a', t: T0 - 1000, lead: 60 }, T0).error === 'past', 'past events are refused'); ok(R.set(rl, { id: 5, t: 1 }, T0).error === 'invalid' && R.set(rl, { id: 'a', t: 'x' }, T0).error === 'invalid', 'invalid input is refused');
ok(R.set(rl, { id: 'q', t: T0 + 864e5, lead: 7 }, T0).list.filter(x => x.id === 'q')[0].lead === 60, 'an unknown lead time falls back to 1 hour');
s = R.set(rl, { id: 'meteor:gem:20261214', t: T0 + 5 * 864e5, lead: 60, title: 'Geminids' }, T0); ok(s.list.length === 1 && s.list[0].lead === 60, 'one reminder per event (setting again replaces)');
s = R.set(s.list, { id: 'b', t: T0 + 3 * 3600000, lead: 60, title: 'B' }, T0); rl = s.list; ok(rl[0].id === 'b', 'sorted by time');
let c = R.check(rl, T0); ok(c.due.length === 0 && c.missed.length === 0, 'nothing is due yet'); c = R.check(rl, T0 + 2.5 * 3600000); ok(c.due.length === 1 && c.due[0].id === 'b' && c.list[0].fired === true, 'due when the lead time begins');
c = R.check(c.list, T0 + 2.6 * 3600000); ok(c.due.length === 0, 'a reminder fires only once');
c = R.check(rl, T0 + 20 * 3600000); ok(c.missed.length === 1 && c.due.length === 0, 'an event that ended hours ago while the app was closed is "missed", not a fresh alert');
ok(R.prune([{ id: 'x', t: T0, lead: 60, fired: true }, { id: 'y', t: T0 + 9e9, lead: 60, fired: false }, { id: 'z', t: T0 + 3 * 864e5 + 1, lead: 60, fired: true }], T0 + 3 * 864e5).map(x => x.id).join() === 'y,z', 'old shown reminders are dropped');
let many = []; for (let i = 0; i < 45; i++) many = (R.set(many, { id: 'e' + i, t: T0 + (i + 1) * 3600000 * 24, lead: 60 }, T0).list); ok(many.length === 40 && R.set(many, { id: 'zz', t: T0 + 9e8, lead: 60 }, T0).error === 'full', 'at most 40 reminders');
ok(R.clean('nope').length === 0 && R.clean([{ id: 'a', t: 1 }, null, { id: 3 }]).length === 1, 'clean() drops junk');
ok(X.remindUI.permission() === 'unsupported' && X.remindUI.supported() === false, 'no Notification API in Node → reported as unsupported');

console.log(bad ? 'log+remind: ' + bad + ' FAILED of ' + n : 'log+remind: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
