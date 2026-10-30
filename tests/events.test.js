/* Sky calendar maths against real, well-known events (NASA / IMO dates) + the calendar-file (.ics) builder. */
globalThis.Cosmica = {}; globalThis.Astronomy = require('../js/vendor/astronomy.browser.min.js');
require('../js/astro.js'); require('../js/data/meteors.js'); require('../js/events.js'); require('../js/ics.js');
const X = Cosmica, E = X.events, DAY = 864e5, H = 36e5;
let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };
const near = (a, b, tol, m) => ok(Math.abs(a - b) <= tol, m + ' (got ' + new Date(a).toISOString() + ', want ' + new Date(b).toISOString() + ')');
const U = (...a) => Date.UTC(...a);
const delhi = { lat: 28.6139, lon: 77.209, elev: 0 }, sydney = { lat: -33.87, lon: 151.21, elev: 0 }, tromso = { lat: 69.65, lon: 18.96, elev: 0 };

/* ---- Moon phases */
const ph = E.moonPhases(U(2026, 9, 1), U(2026, 11, 31), 'Asia/Kolkata'), fulls = ph.filter(p => p.q === 2);
ok(fulls.length === 3, 'three full moons Oct–Dec 2026: ' + fulls.length);
near(fulls[0].t, U(2026, 9, 26, 4, 12), 2 * H, 'full moon 26 Oct 2026'); near(fulls[1].t, U(2026, 10, 24, 14, 53), 2 * H, 'full moon 24 Nov 2026'); near(fulls[2].t, U(2026, 11, 24, 1, 28), 2 * H, 'full moon 24 Dec 2026');
ok(ph.every((p, i) => !i || p.t > ph[i - 1].t), 'phases are in time order'); ok(ph.filter(p => p.q === 0).length === 3, 'three new moons');
const may = E.moonPhases(U(2026, 4, 1), U(2026, 5, 5), 'UTC').filter(p => p.q === 2);
ok(may.length === 2 && !may[0].blue && may[1].blue, 'second full moon of May 2026 is a blue moon (and the first is not)');
const sup = E.moonPhases(U(2025, 10, 1), U(2025, 10, 30), 'UTC').filter(p => p.q === 2)[0];
ok(sup.near && !sup.far && sup.km > 355000 && sup.km < 358500, 'Nov 2025 full moon is a supermoon, about 357,000 km: ' + sup.km);
ok(E.moonPhases(U(2026, 5, 1), U(2026, 6, 20), 'UTC').filter(p => p.q === 2).every(p => p.folk === FOLKS(p)), 'folk name follows the month');
function FOLKS(p) { return E.FOLK[p.month - 1]; }

/* ---- eclipses */
const le = E.lunarEclipses(U(2026, 0, 1), U(2026, 11, 31), delhi);
ok(le.length === 2 && le[0].kind === 'total' && le[1].kind === 'partial', 'lunar eclipses of 2026: total (3 Mar) then partial (28 Aug)');
near(le[0].t, U(2026, 2, 3, 11, 33), 15 * 60000, 'total lunar eclipse 3 Mar 2026'); near(le[1].t, U(2026, 7, 28, 4, 13), 15 * 60000, 'partial lunar eclipse 28 Aug 2026');
ok(le[0].total && le[0].total[1] - le[0].total[0] > 50 * 60000 && le[0].total[1] - le[0].total[0] < 70 * 60000, 'totality lasts about an hour');
ok(le[0].vis === 'part' && le[1].vis === 'none', 'from Delhi: the 3 Mar eclipse starts before moonrise (partly seen); the 28 Aug one happens in daylight there: ' + le.map(e => e.vis));
const leLon = E.lunarEclipses(U(2026, 7, 1), U(2026, 7, 31), { lat: 51.5, lon: -0.1 }); ok(leLon[0].vis !== 'none', 'London sees at least the start (Moon low in the west before dawn): ' + leLon[0].vis); const leNy = E.lunarEclipses(U(2026, 7, 1), U(2026, 7, 31), { lat: 40.7, lon: -74 }); ok(leNy[0].vis === 'full', 'New York sees all of the 28 Aug partial eclipse (it is night there): ' + leNy[0].vis);
const se = E.solarEclipses(U(2026, 0, 1), U(2027, 11, 31), delhi);
ok(se.map(e => e.kind).join() === 'annular,total,annular,total', 'solar eclipses 2026–27: annular, total, annular, total: ' + se.map(e => e.kind));
near(se[1].t, U(2026, 7, 12, 17, 46), 20 * 60000, 'total solar eclipse 12 Aug 2026'); near(se[3].t, U(2027, 7, 2, 10, 7), 20 * 60000, 'total solar eclipse 2 Aug 2027');
ok(se[0].vis === 'none' && se[1].vis === 'none', 'the 2026 eclipses cannot be seen from Delhi');
ok(se[3].local && se[3].local.kind === 'partial' && se[3].local.obscuration > 0.04 && se[3].local.obscuration < 0.2 && se[3].vis === 'full', 'Delhi sees a small partial eclipse on 2 Aug 2027');
const seSyd = E.solarEclipses(U(2026, 0, 1), U(2026, 11, 31), sydney); ok(seSyd.length === 2 && seSyd.every(e => e.vis === 'none'), 'neither 2026 solar eclipse is visible from Sydney');
ok(E.solarEclipses(U(2026, 0, 1), U(2026, 11, 31), null).every(e => e.vis === null && e.local === null), 'without a place there is no visibility claim');

/* ---- planets */
const op = E.oppositions(U(2026, 0, 1), U(2027, 5, 1)), find = (id) => op.filter(o => o.id === id);
near(find('jupiter')[0].t, U(2026, 0, 10, 8, 30), 12 * H, 'Jupiter opposition 10 Jan 2026'); near(find('saturn')[0].t, U(2026, 9, 4, 12, 12), 24 * H, 'Saturn opposition 4 Oct 2026'); near(find('mars')[0].t, U(2027, 1, 19, 16), 48 * H, 'Mars opposition 19 Feb 2027');
ok(find('mars')[0].mag < -1.0 && find('mars')[0].au < 0.7, 'Mars at that opposition is bright and about 0.68 AU away');
const el = E.elongations(U(2026, 11, 1), U(2027, 2, 1)); const v = el.filter(x => x.id === 'venus')[0];
ok(v && !v.evening && v.deg > 46 && v.deg < 48, 'Venus greatest western elongation ~47° on 3 Jan 2027'); near(v.t, U(2027, 0, 3, 18), 36 * H, 'date of that elongation');
const cj = E.conjunctions(U(2026, 4, 1), U(2026, 6, 1)).filter(c => c.type === 'conj');
const vj = cj.filter(c => c.a === 'venus' && c.b === 'jupiter')[0]; ok(vj && vj.sep < 2, 'Venus–Jupiter conjunction in June 2026'); near(vj ? vj.t : 0, U(2026, 5, 9, 12), 30 * H, 'date of the Venus–Jupiter conjunction');
const mc = E.conjunctions(U(2026, 9, 29), U(2027, 0, 1)).filter(c => c.type === 'moonconj'); ok(mc.length >= 3 && mc.every(c => c.sep <= 3.5), 'the Moon passes a few planets closely in 2 months: ' + mc.length);
const se2 = E.seasons(U(2026, 8, 1), U(2026, 11, 31)); ok(se2.length === 2 && se2[0].key === 'sep' && se2[1].key === 'dec', 'September equinox and December solstice'); near(se2[1].t, U(2026, 11, 21, 20, 50), 10 * 60000, 'December solstice 2026');

/* ---- meteors */
ok(X.meteors.length === 12 && X.meteors.every(s => s.en.name && s.hi.name && s.zhr > 0 && s.ra >= 0 && s.ra < 24 && Math.abs(s.dec) <= 90), '12 showers with names in both languages');
const per = E.meteors(U(2026, 7, 1), U(2026, 7, 31), delhi, 'Asia/Kolkata').filter(m => m.id === 'per')[0];
ok(per && per.t > U(2026, 7, 12) && per.t < U(2026, 7, 14), 'Perseids 2026 peak on 12–13 Aug: ' + (per && new Date(per.t).toISOString()));
ok(per.moon < 0.05 && per.rating === 'great' && per.watch && per.best.alt > 40, 'Perseids 2026 fall on a new Moon: dark sky, rated great, radiant high after midnight (' + per.rating + ')');
const gem = E.meteors(U(2026, 11, 1), U(2026, 11, 31), delhi, 'Asia/Kolkata').filter(m => m.id === 'gem')[0]; ok(gem && new Date(gem.t).getUTCDate() >= 13 && new Date(gem.t).getUTCDate() <= 14, 'Geminids on 13–14 Dec');
const quadS = E.meteors(U(2027, 0, 1), U(2027, 0, 10), sydney, 'Australia/Sydney').filter(m => m.id === 'quad')[0]; ok(quadS && quadS.rating === 'unseen', 'Quadrantids radiant never gets high enough from Sydney');
const taur = E.meteors(U(2026, 10, 1), U(2026, 10, 10), delhi, 'Asia/Kolkata').filter(m => m.id === 'sta')[0]; ok(taur && ['fair', 'poor', 'unseen'].indexOf(taur.rating) >= 0, 'a 5-an-hour shower is never rated better than fair: ' + taur.rating);

/* ---- one sorted list */
const t0 = Date.now(), all = E.upcoming(U(2026, 9, 29), 400, delhi, 'Asia/Kolkata'), took = Date.now() - t0;
ok(took < 6000, 'a 400-day calendar is worked out in ' + took + ' ms'); ok(all.length > 80 && all.every((e, i) => !i || e.t >= all[i - 1].t), 'sorted list of ' + all.length);
ok(new Set(all.map(e => e.uid)).size === all.length && all.every(e => /^[a-z-]+:[\w-]+:\d{8}$/.test(e.uid)), 'every event has a unique, stable uid'); ok(all.every(e => e.t >= U(2026, 9, 29) && e.t <= U(2026, 9, 29) + 400 * DAY), 'everything is inside the window');
ok(['phase', 'lunar-eclipse', 'solar-eclipse', 'conj', 'moonconj', 'opposition', 'elongation', 'season', 'meteor'].every(k => all.some(e => e.type === k)), 'all nine kinds of event are present');
ok(all.filter(e => e.type === 'meteor').every(e => X.meteors.some(m => m.id === e.id)) && all.filter(e => e.type === 'opposition').every(e => ['mars','jupiter','saturn','uranus','neptune'].includes(e.id)), 'meteor and planet ids are not overwritten by the uid');
ok(E.upcoming(U(2026, 9, 29), 400, delhi, 'Asia/Kolkata') === all, 'the same question is answered from cache');
ok(all.filter(E.notable).length > 5 && all.filter(E.notable).length < all.length / 2, 'the "notable" filter keeps a short list');

/* ---- the Sun through the year */
const eot = (d) => E.equationOfTime(d); ok(Math.abs(eot(U(2026, 1, 11, 12)) + 14.2) < 0.6, 'equation of time mid-Feb ≈ −14.2 min: ' + eot(U(2026, 1, 11, 12)).toFixed(2)); ok(Math.abs(eot(U(2026, 10, 3, 12)) - 16.4) < 0.6, 'equation of time early Nov ≈ +16.4 min'); ok(Math.abs(eot(U(2026, 3, 15, 12))) < 0.8, 'equation of time is about zero mid-April');
const ist = { lat: 28.6139, lon: 82.5, elev: 0 }, an = E.analemma(ist, 'Asia/Kolkata', 2026, 12), alts = an.map(p => p.alt);
ok(Math.abs(Math.max.apply(null, alts) - 84.8) < 1, 'noon Sun at 28.6°N peaks near 84.8° at the June solstice: ' + Math.max.apply(null, alts).toFixed(1)); ok(Math.abs(Math.min.apply(null, alts) - 38) < 1, 'and sinks to about 38° in December: ' + Math.min.apply(null, alts).toFixed(1));
ok(an.length > 85 && an.every(p => p.az > 90 && p.az < 270), 'the Sun stays in the southern half of the sky at noon at 28.6°N (the figure-8 has a width)');
const dl = E.dayLengths(delhi, 'Asia/Kolkata', 2026), mx = dl.reduce((a, b) => b.min > a.min ? b : a), mn = dl.reduce((a, b) => b.min < a.min ? b : a);
ok(Math.abs(mx.min - 839) < 6 && Math.abs(mn.min - 619) < 6, 'Delhi: longest day ≈ 13 h 59 m, shortest ≈ 10 h 19 m: ' + mx.min.toFixed(0) + ' / ' + mn.min.toFixed(0));
const dt = E.dayLengths(tromso, 'Europe/Oslo', 2026); ok(dt.some(p => p.min === 1440) && dt.some(p => p.min === 0), 'Tromsø has a midnight Sun and a polar night');

/* ---- calendar file */
const I = X.ics, nowT = U(2026, 9, 29, 10, 0);
const txt = I.build([{ uid: 'meteor:per:20260812', start: U(2026, 7, 12, 19), end: U(2026, 7, 12, 23), summary: 'Perseids, peak; “best” night', description: 'Line one\nLine two, with a comma; and a semicolon \\ backslash', location: 'Delhi' }, { uid: 'x y', start: U(2026, 0, 1), summary: 'Ө'.repeat(60) }], { stamp: nowT, alarmMin: 60 });
ok(/\r\n$/.test(txt) && !/[^\r]\n/.test(txt), 'CRLF line endings everywhere'); const lines = txt.split('\r\n'); lines.pop();
ok(lines.every(l => Buffer.byteLength(l) <= 75), 'every line is at most 75 bytes (longest ' + Math.max.apply(null, lines.map(l => Buffer.byteLength(l))) + ')');
const unfolded = txt.replace(/\r\n /g, ''); ok(unfolded.includes('SUMMARY:' + 'Ө'.repeat(60) + '\r\n'), 'folding never splits a character');
ok(unfolded.includes('SUMMARY:Perseids\\, peak\; “best” night') && unfolded.includes('DESCRIPTION:Line one\\nLine two\\, with a comma\; and a semicolon \\\\ backslash'), 'text is escaped');
ok(unfolded.includes('DTSTART:20260812T190000Z') && unfolded.includes('DTEND:20260812T230000Z') && unfolded.includes('DTSTAMP:20261029T100000Z'), 'UTC times'); ok(unfolded.includes('DTEND:20260101T010000Z'), 'an event without an end lasts one hour');
ok(unfolded.includes('UID:meteor:per:20260812@cosmica') && unfolded.includes('UID:xy@cosmica'), 'UIDs are safe and stable'); ok((unfolded.match(/BEGIN:VEVENT/g) || []).length === 2 && (unfolded.match(/END:VEVENT/g) || []).length === 2 && unfolded.startsWith('BEGIN:VCALENDAR') && /END:VCALENDAR\r\n$/.test(unfolded), 'balanced calendar');
ok((unfolded.match(/TRIGGER:-PT60M/g) || []).length === 2, 'reminder alarm 60 minutes before'); ok(!I.build([{ uid: 'a', start: 0, summary: 's' }], { stamp: 0 }).includes('VALARM'), 'no alarm unless asked');

console.log(bad ? 'events: ' + bad + ' FAILED of ' + n : 'events: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
