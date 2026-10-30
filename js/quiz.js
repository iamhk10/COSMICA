/* =========================================================================
   Cosmica — js/quiz.js : quiz rules (pure functions, tested in Node).
   Each round is worth 100 points. A right answer earns 100 ÷ (questions in the round).
   A wrong answer costs 1/3 point. The score never goes below 0 and is shown rounded.
   Scoring 75 or more (as shown, rounded) unlocks the next level.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, Q = X.quizlib = {};
  Q.PASS = 75; Q.WRONG_PENALTY = 1 / 3;

  Q.levels = function () { return (X.quizLevels || []).slice().sort(function (a, b) { return a.id - b.id; }); };
  Q.level = function (id) { return Q.levels().filter(function (l) { return l.id === id; })[0] || null; };

  /** score after `correct` right and `wrong` wrong answers in a round of n questions */
  Q.score = function (correct, wrong, n) {
    var raw = correct * 100 / n - wrong * Q.WRONG_PENALTY; if (raw < 0) raw = 0;
    return { raw: raw, shown: Math.round(raw) };
  };
  Q.passed = function (shown) { return shown >= Q.PASS; };

  /** Fisher–Yates; rnd() returns [0,1) */
  Q.shuffle = function (arr, rnd) {
    rnd = rnd || Math.random; var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  /** a fresh round: questions in random order, each with its options in random order */
  Q.prepare = function (level, rnd) {
    return Q.shuffle(level.questions.map(function (_, i) { return i; }), rnd).map(function (qi) {
      return { qi: qi, order: Q.shuffle([0, 1, 2, 3], rnd) };
    });
  };
  /** what to show for one prepared item in a language ('en' | 'hi') */
  Q.view = function (level, item, lang) {
    var q = level.questions[item.qi], L = lang === 'hi' ? 'hi' : 'en';
    return { text: q.q[L], options: item.order.map(function (k) { return q.o[L][k]; }), correctPos: item.order.indexOf(q.a), explain: q.e[L] };
  };

  /* progress = { "1": { best: 82, tries: 3 }, … } stored by the app */
  Q.best = function (progress, id) { var p = progress && progress[id]; return p ? p.best : null; };
  Q.unlocked = function (progress, id) { return id <= 1 || Q.passed(Q.best(progress, id - 1) || 0); };
  Q.record = function (progress, id, shown) {
    var out = {}; Object.keys(progress || {}).forEach(function (k) { out[k] = progress[k]; });
    var p = out[id] || { best: 0, tries: 0 };
    out[id] = { best: Math.max(p.best, shown), tries: p.tries + 1 };
    return out;
  };

  /** the certificate needs a real name: 2–40 characters, with at least one letter */
  Q.cleanName = function (s) { return String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 40); };
  Q.validName = function (s) {
    var n = Q.cleanName(s); if (n.length < 2) return false;
    try { return /\p{L}/u.test(n); } catch (e) { return /[A-Za-zÀ-ɏऀ-ॿ]/.test(n); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
