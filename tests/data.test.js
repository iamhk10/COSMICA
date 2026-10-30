/* Validates every content file: shapes, both languages present, counts, spreads, link formats, calendar dates. */
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
globalThis.Cosmica = {};
const D = f => { try { require(path.join(root, 'js/data', f)); } catch (e) { console.log('FAIL load ' + f + ': ' + e.message); process.exit(1); } };
['sky.js', 'cities.js', 'objects.js', 'facts.js', 'glossary.js', 'indian.js', 'quiz-a.js', 'quiz-c.js', 'quiz-d.js', 'onthisday.js', 'constellations.js', 'agencies.js'].forEach(D);
const X = globalThis.Cosmica; let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; if (bad < 40) console.log('FAIL ' + m); } };
const s = v => typeof v === 'string' && v.trim().length > 0;
const httpsUrl = u => { try { const x = new URL(u); return x.protocol === 'https:'; } catch (e) { return false; } };

/* ---- quiz */
const lv = X.quizLevels.slice().sort((a, b) => a.id - b.id), want = { 1: 10, 2: 20, 3: 35, 4: 50 };
ok(lv.length === 4 && lv.every((l, i) => l.id === i + 1), 'four quiz levels 1..4');
const seen = new Set();
lv.forEach(l => {
  ok(l.count === want[l.id] && l.questions.length === want[l.id], `level ${l.id} has ${l.questions.length} questions, want ${want[l.id]}`);
  ok(s(l.title.en) && s(l.title.hi) && s(l.blurb.en) && s(l.blurb.hi), 'level text ' + l.id);
  const pos = [0, 0, 0, 0];
  l.questions.forEach((q, i) => {
    const w = `L${l.id}Q${i + 1}`;
    ok(s(q.q.en) && s(q.q.hi) && s(q.e.en) && s(q.e.hi), w + ' text');
    ['en', 'hi'].forEach(k => { ok(Array.isArray(q.o[k]) && q.o[k].length === 4 && q.o[k].every(s), w + ' 4 options ' + k); ok(new Set(q.o[k]).size === 4, w + ' distinct options ' + k); });
    ok(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, w + ' answer index'); pos[q.a]++;
    const key = q.q.en.toLowerCase().replace(/[^a-z0-9]/g, ''); ok(!seen.has(key), w + ' duplicate question'); seen.add(key);
  });
  pos.forEach((c, k) => ok(c / l.questions.length >= 0.15 && c / l.questions.length <= 0.36, `level ${l.id} answer position ${k} is ${(100 * c / l.questions.length).toFixed(0)}%`));
});
/* ---- on this day */
const O = X.onThisDay, dim = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
ok(O.length >= 110, 'onThisDay count ' + O.length);
const doy = (m, d) => dim.slice(0, m - 1).reduce((a, b) => a + b, 0) + d;
O.forEach((e, i) => { ok(e.m >= 1 && e.m <= 12 && e.d >= 1 && e.d <= dim[e.m - 1], 'otd date ' + JSON.stringify(e).slice(0, 60)); ok(Number.isInteger(e.y) && e.y > 0 && e.y <= 2026, 'otd year ' + e.y); ok(s(e.en) && s(e.hi), 'otd text ' + i); ok(!e.src || (httpsUrl(e.src.u) && s(e.src.l)), 'otd src ' + i); if (i) ok(doy(e.m, e.d) >= doy(O[i - 1].m, O[i - 1].d), 'otd sorted at ' + i); });
const perM = Array(12).fill(0); O.forEach(e => perM[e.m - 1]++); perM.forEach((c, i) => ok(c >= 7, 'month ' + (i + 1) + ' has ' + c));
const days = [...new Set(O.map(e => doy(e.m, e.d)))].sort((a, b) => a - b); let gap = 0; days.forEach((d, i) => { gap = Math.max(gap, i ? d - days[i - 1] : d + 366 - days[days.length - 1]); }); ok(gap <= 9, 'largest calendar gap ' + gap);
/* ---- constellations */
const C = X.constellations, ids = new Set(X.CosmicaData ? [] : []);
const cd = globalThis.CosmicaData.cons.map(c => c.id);
ok(Object.keys(C).length === 12, '12 constellation cards: ' + Object.keys(C).length);
Object.keys(C).forEach(k => { const c = C[k]; ok(cd.includes(c.abbr) && c.abbr === k, 'constellation id ' + k); ok(s(c.hindi) && s(c.season.en) && s(c.season.hi) && /^#[0-9a-f]{6}$/i.test(c.color), k + ' meta');
  ok(c.en.s.length >= 4 && c.en.s.length === c.hi.s.length, k + ' sections'); [c.en, c.hi].forEach(l => { ok(s(l.name) && s(l.tag), k + ' name'); l.s.forEach(x => ok(s(x.h) && s(x.t), k + ' section text')); }); ok(c.src.length >= 1 && c.src.every(x => httpsUrl(x.u) && s(x.l)), k + ' src'); });
/* ---- agencies */
const A = X.agencies; ok(A.countries.length === 10, '10 countries: ' + A.countries.length);
const all = A.countries.flatMap(c => { ok(s(c.country.en) && s(c.country.hi) && s(c.flag) && c.agencies.length >= 1, c.id + ' meta'); return c.agencies; }).concat(A.multinational);
all.forEach(a => { ok(s(a.name) && s(a.full) && httpsUrl(a.url) && s(a.about.en) && s(a.about.hi), a.name + ' meta/url'); ok(a.missions.length >= 3, a.name + ' missions ' + a.missions.length);
  a.missions.forEach(m => { ok(s(m.name) && /^(\d{4}|Planned)/.test(m.year) && s(m.note.en) && s(m.note.hi), a.name + ' mission ' + m.name); ok(m.url == null || httpsUrl(m.url), a.name + ' mission url ' + m.name); }); });
ok(A.countries.some(c => c.id === 'in' && c.agencies.some(a => a.name === 'ISRO')), 'ISRO present');
/* ---- indian */
const I = X.indian; ok(I.people.length >= 10 && I.concepts.length >= 8 && I.nakshatras.length === 27, 'indian counts');
I.people.forEach(p => { ok(s(p.name) && s(p.years) && s(p.en.role) && s(p.hi.role) && p.en.s.length === p.hi.s.length && p.en.s.length >= 3, p.id); (p.src || []).forEach(x => ok(httpsUrl(x.u), p.id + ' src')); });
console.log(bad ? `data: ${bad} FAILED of ${n}` : `data: all ${n} checks passed`);
console.log('quiz questions:', lv.map(l => l.questions.length).join('/'), '| onThisDay:', O.length, '| gap', gap, '| per month', perM.join(','));
process.exit(bad ? 1 : 0);
