/* Cosmica — sky maths checks against facts that can be verified independently. Run: node tests/astro.test.js */
globalThis.Astronomy = require('../js/vendor/astronomy.browser.min.js');
require('../js/astro.js'); require('../js/data/sky.js');
const astro = globalThis.Cosmica.astro, data = globalThis.CosmicaData;
let n = 0, bad = 0;
const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL', m); } };
const near = (a, b, tol, m) => ok(Math.abs(a - b) <= tol, m + ' (got ' + (typeof a === 'number' ? a.toFixed(3) : a) + ', want ' + b + ' ±' + tol + ')');
const MIN = 60000, H = 3600000, U = (s) => Date.parse(s);
const delhi = { lat: 28.6139, lon: 77.209, elev: 216 }, IST = 'Asia/Kolkata';

/* ---- time zones */
near(astro.tzOffset(U('2026-06-21T00:00:00Z'), IST), 19800000, 0, 'Kolkata offset is +5:30');
ok(astro.localMidnight(U('2026-06-21T03:00:00Z'), IST) === U('2026-06-20T18:30:00Z'), 'local midnight in IST');
near(astro.dayWindow(U('2026-06-21T03:00:00Z'), IST).reduce((a, b) => b - a), 24 * H, 0, 'ordinary day is 24 h');
near(astro.dayWindow(U('2026-03-08T12:00:00Z'), 'America/New_York').reduce((a, b) => b - a), 23 * H, 0, 'US spring-forward day is 23 h');
ok(astro.tzParts(U('2026-06-20T18:30:00Z'), IST).h === 0, 'midnight IST has hour 0 (not 24)');

/* ---- sun */
const d = astro.sunDay(U('2026-06-21T06:00:00Z'), delhi, IST);
near((d.sunrise - U('2026-06-20T18:30:00Z')) / MIN, 5 * 60 + 23, 3, 'Delhi sunrise on the June solstice ≈ 05:23');
near((d.sunset - U('2026-06-20T18:30:00Z')) / MIN, 19 * 60 + 23, 3, 'Delhi sunset on the June solstice ≈ 19:23');
near(d.dayLength / H, 13.99, 0.12, 'Delhi solstice day length ≈ 14 h');
ok(d.civil.start < d.sunrise && d.civil.end > d.sunset && d.astro.start < d.nautical.start && d.nautical.start < d.civil.start, 'twilights are ordered');
near(astro.sunAlt(d.noon, delhi), 90 - (28.6139 - 23.44), 0.6, 'Sun altitude at solar noon on the solstice');
const eq = astro.sunDay(U('2026-03-20T12:00:00Z'), { lat: 0, lon: 0 }, 'UTC');
near(eq.dayLength / H, 12.1, 0.1, 'equatorial equinox day ≈ 12 h 07 m');
ok(astro.sunDay(U('2026-06-21T12:00:00Z'), { lat: 69.65, lon: 18.96 }, 'Europe/Oslo').polar === 'day', 'Tromsø midnight sun in June');
ok(astro.sunDay(U('2026-12-21T12:00:00Z'), { lat: 69.65, lon: 18.96 }, 'Europe/Oslo').polar === 'night', 'Tromsø polar night in December');

/* ---- moon */
let m = astro.moonInfo(U('2024-04-01T00:00:00Z'));
near((m.nextNew - U('2024-04-08T18:21:00Z')) / MIN, 0, 5, 'new moon of the 8 April 2024 eclipse');
m = astro.moonInfo(U('2025-10-01T00:00:00Z'));
near((m.nextFull - U('2025-10-07T03:47:00Z')) / MIN, 0, 10, 'Harvest full moon 7 Oct 2025');
m = astro.moonInfo(U('2025-10-07T03:47:00Z'));
ok(m.phaseKey === 'full' && m.illum > 99.5, 'phase name and illumination at full moon');
m = astro.moonInfo(U('2025-10-14T00:00:00Z')); ok(m.phaseKey === 'wangib' || m.phaseKey === 'lastq', 'a week after full the moon is waning');
near(astro.moonInfo(U('2025-10-21T12:25:00Z')).illum, 0, 0.5, 'illumination at new moon');
const near2 = astro.moonInfo(U('2025-11-05T22:00:00Z')); near(near2.distanceKm, 356980, 800, 'super-moon perigee distance 5 Nov 2025');
const mr = astro.moonInfo(U('2025-10-07T12:00:00Z'), delhi, IST);
ok(mr.moonrise != null && mr.moonset != null, 'moonrise and moonset exist for Delhi'); 
near(astro.altaz(Astronomy.Body.Moon, mr.moonrise, delhi).alt, 0, 1.2, 'moon is on the horizon at moonrise');

const nw = astro.nightWindow(U('2025-10-06T12:00:00Z'), delhi, IST), mn = astro.moonNight(nw, delhi);
ok(mn.upAtStart && mn.set != null && mn.set > nw.start && mn.set <= nw.end, 'full moon is already up at sunset and sets before sunrise');
ok(nw.start > U('2025-10-06T12:00:00Z') && nw.end - nw.start > 10 * H && nw.end - nw.start < 14 * H, 'night window is a sensible length');

/* ---- stars: independent geometry checks */
const sf = new astro.StarField(data.stars), idx = (hip) => data.stars.findIndex(s => s[4] === hip);
const maxAlt = (hip, loc, day) => { let b = -99; const i = idx(hip); for (let k = 0; k < 144; k++) { sf.project(U(day) + k * 10 * MIN, loc); b = Math.max(b, sf.alt[i]); } return b; };
ok(idx(32349) >= 0 && idx(11767) >= 0 && idx(91262) >= 0, 'Sirius, Polaris and Vega are in the catalogue');
sf.project(U('2026-10-25T20:00:00Z'), delhi);
near(sf.alt[idx(11767)], 28.6, 1.1, 'Polaris altitude ≈ latitude'); near(Math.min(sf.az[idx(11767)], 360 - sf.az[idx(11767)]), 0, 2, 'Polaris is due north');
near(maxAlt(32349, delhi, '2026-01-15T00:00:00Z'), 90 - 28.61 - 16.72, 0.4, 'Sirius culmination altitude from Delhi');
near(maxAlt(91262, { lat: 38.78, lon: 0 }, '2026-07-01T00:00:00Z'), 90, 0.6, 'Vega passes through the zenith at 38.8° N');
const pr = astro.makeProjector(U('2026-10-25T20:00:00Z'), delhi), o = {}; pr(data.stars[idx(32349)][0], data.stars[idx(32349)][1], o);
sf.project(U('2026-10-25T20:00:00Z'), delhi); near(o.alt, sf.alt[idx(32349)], 1e-9, 'point projector agrees with the star field');
// angular separations between stars match what astronomers quote (Big Dipper pointers ≈ 5.4°, Orion belt ≈ 2.7°)
const sep = (a, b) => { sf.project(U('2026-03-01T18:00:00Z'), delhi); return astro.separation(sf.alt[idx(a)], sf.az[idx(a)], sf.alt[idx(b)], sf.az[idx(b)]); };
near(sep(54061, 53910), 5.4, 0.2, 'Dubhe–Merak pointer stars'); near(sep(26727, 25930), 2.7, 0.2, 'Orion belt Alnitak–Mintaka');
near(sep(11767, 54061), 28.5, 0.4, 'Polaris–Dubhe');

/* ---- planets */
const P = astro.planetById;
near(astro.planetNow(P('jupiter'), U('2026-01-10T00:00:00Z'), delhi).elong, 180, 2.5, 'Jupiter at opposition on 10 Jan 2026');
near(astro.planetNow(P('saturn'), U('2026-10-04T00:00:00Z'), delhi).elong, 180, 4, 'Saturn near opposition early Oct 2026');
const ven = astro.planetNow(P('venus'), U('2026-01-10T00:00:00Z'), delhi); ok(ven.elong > 0 && ven.elong < 48, 'Venus never strays more than 47° from the Sun'); ok(ven.mag < -3 && ven.mag > -5, 'Venus magnitude is in its usual range');
near(astro.planetNow(P('jupiter'), U('2026-01-10T00:00:00Z'), delhi).mag, -2.7, 0.3, 'Jupiter magnitude at opposition');
const list = astro.planetList(U('2026-10-25T14:00:00Z'), delhi, IST);
ok(list.length === 7 && list.every(p => ['good', 'low', 'none', 'sun'].includes(p.status)), 'planet list covers seven planets with valid statuses');
ok(list.some(p => p.id === 'saturn' && (p.status === 'good' || p.status === 'low')), 'Saturn is on show in the evening sky in late Oct 2026');
const sat = list.find(p => p.id === 'saturn'); ok(sat.best && sat.best.alt > 20, 'Saturn climbs above 20° for Delhi');
ok(list.find(p => p.id === 'neptune').eye === 'scope' && list.find(p => p.id === 'uranus').eye === 'binoc', 'Uranus/Neptune are labelled binoculars/telescope');

/* ---- misc */
ok(astro.limitingMag(-30) === 6.2 && astro.limitingMag(10) < 0 && astro.limitingMag(-9) < astro.limitingMag(-15), 'limiting magnitude falls as the Sun rises');
ok(astro.compass(0) === 'N' && astro.compass(91) === 'E' && astro.compass(359) === 'N' && astro.dir8(200) === 's', 'compass names');
ok(astro.constellationOf(5.6, -1.2).symbol === 'Ori', 'Orion is where it should be');
/* ---- v2 extras */
ok(astro.retrograde('mercury', U('2025-03-25T12:00:00Z')) && !astro.retrograde('mercury', U('2025-05-15T12:00:00Z')), 'Mercury is retrograde in late March 2025 but not mid May');
ok(astro.retrograde('mars', U('2025-01-15T12:00:00Z')) && !astro.retrograde('mars', U('2025-06-01T12:00:00Z')), 'Mars retrograde in Jan 2025 (Dec 2024–Feb 2025)');
ok(astro.retrograde('jupiter', U('2025-12-01T12:00:00Z')) && !astro.retrograde('jupiter', U('2025-07-01T12:00:00Z')), 'Jupiter retrograde Oct 2025–Feb 2026');
const sgNew = astro.stargazing(U('2025-10-21T12:00:00Z'), delhi, IST, 6), sgFull = astro.stargazing(U('2025-10-06T12:00:00Z'), delhi, IST, 6);
ok(sgNew.score > sgFull.score + 10, `new-moon night scores higher than full-moon night (${sgNew.score} vs ${sgFull.score})`);
ok(astro.stargazing(U('2025-10-21T12:00:00Z'), delhi, IST, 2).score > sgNew.score && sgNew.score > astro.stargazing(U('2025-10-21T12:00:00Z'), delhi, IST, 8).score, 'darker Bortle class scores higher');
ok(sgNew.score >= 0 && sgNew.score <= 100 && ['excellent', 'good', 'fair', 'poor', 'bad'].includes(sgNew.key) && sgNew.darkMs > 6 * H, 'score is bounded and darkness measured');
ok(astro.stargazing(U('2025-06-21T12:00:00Z'), { lat: 64.15, lon: -21.9 }, 'Atlantic/Reykjavik', 4).darkMs === 0, 'Reykjavik midsummer has no astronomical darkness');
const hl = astro.hilal(U('2025-02-20T12:00:00Z'), delhi, IST);
ok(Math.abs(hl.newMoon - U('2025-02-28T00:45:00Z')) < 5 * 60000, 'next new moon is 28 Feb 2025 00:45 UTC');
ok(hl.evenings.length === 2 && hl.evenings[0].ageH > 11 && hl.evenings[0].ageH < 14, 'first evening: Moon is about 12 h old (' + hl.evenings[0].ageH.toFixed(1) + ')');
ok(hl.evenings[0].verdict !== 'likely' && hl.evenings[1].verdict === 'likely', 'crescent not likely on 28 Feb, likely on 1 Mar 2025 from Delhi (' + hl.evenings.map(e => e.verdict) + ')');
const pw = astro.planetOfWeek(U('2025-10-28T12:00:00Z'), delhi, IST);
ok(pw && astro.planetById(pw.id) && pw.days >= 1 && pw.days <= 7, 'planet of the week: ' + (pw && pw.id));
console.log(bad ? 'astro: ' + bad + ' FAILED of ' + n : 'astro: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
