/* Quiz rules and the PDF wrapper. */
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
globalThis.Cosmica = {}; ['quiz-a', 'quiz-c', 'quiz-d'].forEach(f => require('../js/data/' + f + '.js')); require('../js/quiz.js'); require('../js/pdf.js');
const Q = Cosmica.quizlib; let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };
const near = (a, b) => Math.abs(a - b) < 1e-9;
/* scoring rules from the brief */
ok(near(Q.score(10, 0, 10).raw, 100) && Q.score(50, 0, 50).shown === 100, 'all correct = 100');
ok(near(Q.score(1, 0, 10).raw, 10) && near(Q.score(1, 0, 50).raw, 2) && near(Q.score(7, 0, 35).raw, 20), 'each right answer = 100 ÷ questions');
ok(near(Q.score(9, 1, 10).raw, 90 - 1 / 3) && Q.score(9, 1, 10).shown === 90, 'a wrong answer costs 1/3 point; display is rounded');
ok(Q.score(0, 10, 10).raw === 0 && Q.score(1, 20, 20).shown === 0, 'score never goes below zero');
ok(Q.score(15, 5, 20).shown === 73 && !Q.passed(73) && Q.score(15, 4, 20).shown === 74 && !Q.passed(74), '75 needed: 15 right + 5 wrong of 20 gives 73');
ok(Q.score(8, 2, 10).shown === 79 && Q.passed(79) && Q.passed(75) && !Q.passed(74), 'pass mark is 75');
ok(Q.score(26, 9, 35).shown === Math.round(26 * 100 / 35 - 3) , 'rounded display for 35 questions');
/* progress and unlocking */
let pr = {}; ok(Q.unlocked(pr, 1) && !Q.unlocked(pr, 2), 'only level 1 open at the start');
pr = Q.record(pr, 1, 70); ok(!Q.unlocked(pr, 2) && pr[1].tries === 1, '70 does not unlock level 2');
pr = Q.record(pr, 1, 80); pr = Q.record(pr, 1, 60); ok(Q.unlocked(pr, 2) && pr[1].best === 80 && pr[1].tries === 3 && !Q.unlocked(pr, 3), 'best score is kept; 80 unlocks level 2 only');
/* rounds */
[1, 2, 3, 4].forEach(id => { const lv = Q.level(id), r = Q.prepare(lv); ok(r.length === lv.count && new Set(r.map(x => x.qi)).size === lv.count, `round ${id} uses every question once`);
  r.forEach(it => { ok([...it.order].sort().join() === '0,1,2,3', 'options permuted'); const v = Q.view(lv, it, 'en'), w = Q.view(lv, it, 'hi'); ok(v.correctPos === w.correctPos && v.correctPos >= 0 && v.options[v.correctPos] === lv.questions[it.qi].o.en[lv.questions[it.qi].a], 'correct option follows the shuffle'); }); });
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; ok(Q.prepare(Q.level(1), rnd).map(x => x.qi).join() !== Q.prepare(Q.level(1), rnd).map(x => x.qi).join(), 'rounds are shuffled');
/* names */
ok(Q.validName('Ravi Kumar') && Q.validName('राहुल शर्मा') && Q.validName('  Zoë  ') && !Q.validName('') && !Q.validName(' ') && !Q.validName('A') && !Q.validName('1234') && !Q.validName('!!'), 'name must have 2+ characters and a letter');
ok(Q.cleanName('  Ravi\n  Kumar\t').toString() === 'Ravi Kumar' && Q.cleanName('x'.repeat(80)).length === 40, 'name is tidied and capped at 40');
/* pdf: structure (the real render is checked with pdfinfo/pdftoppm in the e2e step) */
const jpg = Buffer.from('/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=', 'base64');
const pdf = Buffer.from(Cosmica.pdf.fromJpeg(new Uint8Array(jpg), 1, 1, 842, 595, 'Test (x)'));
const txt = pdf.toString('latin1'); ok(txt.startsWith('%PDF-1.4') && txt.trimEnd().endsWith('%%EOF') && txt.includes('/DCTDecode') && txt.includes('/MediaBox [0 0 842 595]'), 'pdf has header, image and page size');
const sx = +txt.match(/startxref\n(\d+)/)[1]; ok(txt.slice(sx, sx + 4) === 'xref', 'startxref points at the xref table');
[...txt.matchAll(/(\d{10}) 00000 n/g)].forEach((m, i) => ok(txt.slice(+m[1], +m[1] + (i + 1 + ' 0 obj').length) === (i + 1) + ' 0 obj', 'xref offset of object ' + (i + 1)));
ok(txt.includes('/Length ' + jpg.length), 'image length recorded');
console.log(bad ? 'quiz: ' + bad + ' FAILED of ' + n : 'quiz: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
