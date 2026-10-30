/* Every UI text key used by the code must exist in English AND Hinglish, and both tables must match. */
const fs = require('fs'), path = require('path');
globalThis.Cosmica = {}; globalThis.Astronomy = require('../js/vendor/astronomy.browser.min.js');
require('../js/astro.js'); require('../js/i18n.js'); require('../js/i18n2.js'); require('../js/i18n3.js');
const X = globalThis.Cosmica, S = X.i18n.strings, root = path.join(__dirname, '..');
let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };

const en = Object.keys(S.en), hi = Object.keys(S.hi);
en.filter(k => !(k in S.hi)).forEach(k => ok(false, 'missing in Hinglish: ' + k));
hi.filter(k => !(k in S.en)).forEach(k => ok(false, 'missing in English: ' + k));
en.forEach(k => { ok(S.en[k].trim() && S.hi[k].trim(), 'empty text: ' + k); const a = (S.en[k].match(/\{\w+\}/g) || []).sort().join(), b = (S.hi[k].match(/\{\w+\}/g) || []).sort().join(); ok(a === b, 'placeholders differ: ' + k); });

const used = new Set();
['js/views.js', 'js/learn.js', 'js/quiz-ui.js', 'js/certificate.js', 'js/app.js', 'js/chart.js', 'js/ui.js', 'js/events-ui.js', 'js/plan-ui.js', 'js/ar.js', 'index.html'].forEach(f => {
  const src = fs.readFileSync(path.join(root, f), 'utf8');
  for (const m of src.matchAll(/\bt\('([^']+)'/g)) used.add(m[1]);
  for (const m of src.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)) used.add(m[1]);
});
for (const m of fs.readFileSync(path.join(root, 'js/views.js'), 'utf8').matchAll(/t\('([\w.]+)\.' \+/g)) { /* dynamic prefixes are expanded below */ }
const dyn = {
  'pl.': X.astro.PLANETS.map(p => p.id), 'phase.': X.astro.PHASE_KEYS, 'st.': ['good', 'low', 'none', 'sun'], 'eye.': ['eye', 'binoc', 'scope'],
  'dir8.': ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'], 'cat.': ['sun', 'earth', 'moon', 'planets', 'stars', 'universe', 'missions', 'life'],
  'layer.': ['lines', 'names', 'grid', 'mw'], 'sky.': ['day', 'civil', 'naut', 'astro', 'dark'], 'learn.': ['history', 'stars', 'facts', 'glossary', 'guide', 'india', 'agencies', 'today'],
  'nav.': ['today', 'sky', 'events', 'learn', 'quiz', 'about', 'ar'],
  'ev.t.': ['up', 'meteors', 'eclipses', 'moon', 'compare', 'sun', 'log'], 'ev.f.': ['all', 'sky', 'eclipse', 'meteor', 'planet', 'moon'], 'ev.ph.': ['0', '1', '2', '3'], 'ev.phNote.': ['0', '1', '2', '3'],
  'ev.folk.': ['wolf', 'snow', 'worm', 'pink', 'flower', 'strawberry', 'buck', 'sturgeon', 'harvest', 'hunter', 'beaver', 'cold'], 'ev.le.': ['total', 'partial', 'penumbral'], 'ev.le.vis.': ['full', 'part', 'none'], 'ev.vc.': ['full', 'part', 'none'],
  'ev.se.': ['total', 'annular', 'partial'], 'ev.se.l.': ['total', 'annular', 'partial'], 'ev.s.': ['mar', 'jun', 'sep', 'dec', 'mar.sub', 'jun.sub', 'sep.sub', 'dec.sub'], 'ev.rate.': ['great', 'good', 'fair', 'poor', 'unseen'],
  'ev.lead.': ['60', '360', '1440'], 'ev.remPerm.': ['granted', 'denied', 'default', 'unsupported'], 'ev.how.': ['1', '2', '3', '4'], 'log.k.': ['moon', 'planet', 'star', 'meteor', 'eclipse', 'conj', 'deep', 'other'],
  'mon.': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], 'dir.': ['n', 'e', 's', 'w'], 'priv.': ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'], 'sg.': ['excellent', 'good', 'fair', 'poor', 'bad'], 'cloud.': ['clear', 'part', 'heavy'], 'hl.': ['likely', 'hard', 'no'], 'guide.h': [1, 2, 3, 4, 5, 6, 7, 8], 'guide.t': [1, 2, 3, 4, 5, 6, 7, 8], 'bortle.n': [1, 2, 3, 4, 5, 6, 7, 8, 9], 'bortle.t': [1, 2, 3, 4, 5, 6, 7, 8, 9]
};
Object.keys(dyn).forEach(p => dyn[p].forEach(s => used.add(p + s)));
used.forEach(k => { if (!/\.$/.test(k) && !(k in dyn)) ok(k in S.en && k in S.hi, 'key used but not defined: ' + k); });
const unused = en.filter(k => !used.has(k)); if (unused.length) console.log('note: defined but not referenced: ' + unused.join(', '));
// categories in data match
require('../js/data/facts.js'); X.facts.forEach(f => ok(('cat.' + f.cat) in S.en, 'fact category without label: ' + f.cat));
console.log(bad ? 'i18n: ' + bad + ' FAILED of ' + n : 'i18n: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
