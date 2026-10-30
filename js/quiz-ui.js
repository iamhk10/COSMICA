/* =========================================================================
   Cosmica — js/quiz-ui.js : the Quiz screens — level list, a round, the result and the certificate (JPG / PDF).
   Rules live in js/quiz.js. Names and scores stay in this browser; the certificate is drawn on the device.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views, Q = X.quizlib;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$, L = V.h.L;
  var R = null;                      // the round in progress (kept so a language switch does not lose it)

  var progress = function () { return X.store.get('quiz', {}); };
  var certDate = function () { try { return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()); } catch (e) { return new Date().toDateString(); } };
  var slug = function (s) { return String(s).normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '') || 'player'; };
  var title = function (lv) { return lv.title[L()]; };

  /* ---------------------------------------------------------------- level list */
  var listView = function (el) {
    var pr = progress(), lvs = Q.levels();
    el.innerHTML = '<div class="page"><section class="card hero"><h2>' + esc(t('quiz.title')) + '</h2><p>' + esc(t('quiz.lead')) + '</p>' +
      '<details class="rules"><summary>' + esc(t('quiz.rulesH')) + '</summary><ul class="plain sm"><li>' + esc(t('quiz.rule1')) + '</li><li>' + esc(t('quiz.rule2')) + '</li><li>' + esc(t('quiz.rule3')) + '</li><li>' + esc(t('quiz.rule4')) + '</li></ul></details></section>' +
      '<div class="cards one">' + lvs.map(function (lv) {
        var open = Q.unlocked(pr, lv.id), best = Q.best(pr, lv.id), done = best != null && Q.passed(best);
        return '<article class="card lvl' + (open ? '' : ' locked') + '"><div class="lv-n" aria-hidden="true">' + lv.id + '</div><div class="lv-b"><h3>' + esc(t('quiz.level', { n: lv.id })) + ' — ' + esc(title(lv)) + (done ? ' <span class="chip c-good">✓ ' + esc(t('quiz.cleared')) + '</span>' : '') + '</h3>' +
          '<p class="muted">' + esc(lv.blurb[L()]) + '</p><p class="sm"><b>' + esc(t('quiz.qCount', { n: lv.count })) + '</b> · ' + esc(best == null ? t('quiz.none') : t('quiz.best', { n: best })) + '</p>' +
          (open ? '<button class="btn pri" data-start="' + lv.id + '">' + esc(best == null ? t('quiz.start') : t('quiz.again')) + '</button>' : '<p class="sm lockmsg">🔒 ' + esc(t('quiz.locked', { n: lv.id - 1, p: Q.PASS })) + '</p>') + '</div></article>';
      }).join('') + '</div></div>';
    $$('[data-start]', el).forEach(function (b) { b.onclick = function () { R = null; V.h.go('#/quiz/play/' + b.getAttribute('data-start')); }; });
  };

  /* ---------------------------------------------------------------- a round */
  var playView = function (el, lv) {
    if (!R || R.levelId !== lv.id) R = { levelId: lv.id, items: Q.prepare(lv), idx: 0, correct: 0, wrong: 0, choice: null, done: false };
    if (R.done) return resultView(el, lv);
    var n = lv.count, item = R.items[R.idx], v = Q.view(lv, item, i18n.lang), sc = Q.score(R.correct, R.wrong, n), answered = R.choice != null;
    var letters = ['A', 'B', 'C', 'D'];
    el.innerHTML = '<div class="page quizp"><div class="qhead"><div><b>' + esc(t('quiz.level', { n: lv.id })) + '</b> · ' + esc(title(lv)) + '</div><button class="btn sm" id="qQuit">' + esc(t('quiz.quit')) + '</button></div>' +
      '<div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + (R.idx + (answered ? 1 : 0)) + '"><i style="width:' + Math.round(100 * (R.idx + (answered ? 1 : 0)) / n) + '%"></i></div>' +
      '<div class="qmeta"><span>' + esc(t('quiz.qOf', { i: R.idx + 1, n: n })) + '</span><span>' + esc(t('quiz.score', { n: sc.shown })) + '</span></div>' +
      '<section class="card"><h2 class="qtext">' + esc(v.text) + '</h2><div class="opts" role="group">' + v.options.map(function (o, i) {
        var cls = 'opt'; if (answered) { if (i === v.correctPos) cls += ' right'; else if (i === R.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-o="' + i + '"' + (answered ? ' disabled' : '') + '><span class="ol">' + letters[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>' +
      (answered ? '<div class="fb ' + (R.choice === v.correctPos ? 'ok' : 'no') + '" role="status"><b>' + esc(t(R.choice === v.correctPos ? 'quiz.right' : 'quiz.wrongA')) + '</b> ' + esc(v.explain) + '</div>' +
        '<button class="btn pri" id="qNext">' + esc(t(R.idx + 1 >= n ? 'quiz.finish' : 'quiz.nextQ')) + '</button>' : '') + '</section></div>';
    $('#qQuit', el).onclick = function () { if (root.confirm(t('quiz.quitConfirm'))) { R = null; V.h.go('#/quiz'); } };
    $$('.opt', el).forEach(function (b) {
      b.onclick = function () {
        if (R.choice != null) return; var i = +b.getAttribute('data-o'); R.choice = i;
        if (i === v.correctPos) R.correct++; else R.wrong++;
        playView(el, lv); i18n.apply(el); var nx = $('#qNext', el); if (nx) nx.focus();
      };
    });
    var nx = $('#qNext', el);
    if (nx) nx.onclick = function () {
      if (R.idx + 1 >= n) { var s = Q.score(R.correct, R.wrong, n); R.done = true; R.shown = s.shown; X.store.set('quiz', Q.record(progress(), lv.id, s.shown)); R.justUnlocked = Q.passed(s.shown); resultView(el, lv); }
      else { R.idx++; R.choice = null; playView(el, lv); }
      i18n.apply(el); root.scrollTo(0, 0);
    };
  };

  /* ---------------------------------------------------------------- result + certificate */
  var resultView = function (el, lv) {
    var n = lv.count, shown = R.shown != null ? R.shown : Q.score(R.correct, R.wrong, n).shown, passed = Q.passed(shown), next = Q.level(lv.id + 1);
    el.innerHTML = '<div class="page"><section class="card hero res"><div class="bigscore" aria-label="' + shown + ' / 100"><b>' + shown + '</b><span>/ 100</span></div>' +
      '<h2>' + esc(t(passed ? 'quiz.passTitle' : 'quiz.tryTitle')) + '</h2>' +
      '<p>' + esc(t('quiz.stats', { c: R.correct, w: R.wrong, n: n })) + '</p>' +
      '<p class="muted">' + esc(passed ? (next ? t('quiz.unlockedMsg', { n: next.id }) : t('quiz.allDone')) : t('quiz.needMsg', { p: Q.PASS })) + '</p></section>' +
      '<section class="card cert"><h3>🎓 ' + esc(t('quiz.certTitle')) + '</h3><label class="nm"><span>' + esc(t('quiz.nameLabel')) + ' <b class="req">*</b></span>' +
      '<input id="pname" type="text" maxlength="40" autocomplete="name" placeholder="' + esc(t('quiz.namePh')) + '" value="' + esc(X.store.get('pname', '')) + '"></label>' +
      '<div id="nameErr" class="err" role="alert"></div><p class="note">' + esc(t('quiz.nameHint')) + '</p>' +
      '<div class="certwrap"><canvas id="cert" role="img" aria-label="' + esc(t('quiz.certAria')) + '"></canvas></div>' +
      '<div class="row wrap"><button class="btn pri" id="dlJpg" disabled>' + esc(t('quiz.dlJpg')) + '</button><button class="btn pri" id="dlPdf" disabled>' + esc(t('quiz.dlPdf')) + '</button></div></section>' +
      '<div class="row wrap"><button class="btn" id="qAgain">' + esc(t('quiz.again')) + '</button><a class="btn" href="#/quiz">' + esc(t('quiz.back')) + '</a>' +
      (passed && next ? '<button class="btn pri" id="qNextLvl">' + esc(t('quiz.next')) + '</button>' : '') + '</div></div>';

    var inp = $('#pname', el), cv = $('#cert', el), jb = $('#dlJpg', el), pb = $('#dlPdf', el), err = $('#nameErr', el), tm = null;
    var opts = function () {
      var ok = Q.validName(inp.value);
      return { name: ok ? Q.cleanName(inp.value) : t('quiz.namePh'), level: lv.id, levelTitle: title(lv), score: shown, passed: passed, dateText: certDate(), ok: ok };
    };
    var redraw = function () { var o = opts(); X.certificate.draw(cv, o); jb.disabled = pb.disabled = !o.ok; };
    inp.oninput = function () {
      var ok = Q.validName(inp.value); err.textContent = ''; if (ok) X.store.set('pname', Q.cleanName(inp.value));
      jb.disabled = pb.disabled = !ok; clearTimeout(tm); tm = setTimeout(redraw, 150);
    };
    var need = function () { if (Q.validName(inp.value)) return true; err.textContent = t('quiz.nameErr'); inp.focus(); return false; };
    var save = function (blob, ext) {
      var a = document.createElement('a'), nm = 'Cosmica-Certificate-Level' + lv.id + '-' + slug(Q.cleanName(inp.value)) + '.' + ext;
      a.href = URL.createObjectURL(blob); a.download = nm; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000); UI.toast(t('quiz.saved'));
    };
    jb.onclick = function () { if (!need()) return; X.certificate.draw(cv, opts()).then(function () { cv.toBlob(function (b) { if (b) save(b, 'jpg'); }, 'image/jpeg', 0.93); }); };
    pb.onclick = function () {
      if (!need()) return;
      X.certificate.draw(cv, opts()).then(function () {
        var bin = atob(cv.toDataURL('image/jpeg', 0.93).split(',')[1]), u8 = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        save(new Blob([X.pdf.fromJpeg(u8, cv.width, cv.height, 842, 595, 'Cosmica certificate')], { type: 'application/pdf' }), 'pdf');
      });
    };
    $('#qAgain', el).onclick = function () { R = null; V.h.go('#/quiz/play/' + lv.id); if (location.hash === '#/quiz/play/' + lv.id) { playView(el, lv); i18n.apply(el); } };
    var nl = $('#qNextLvl', el); if (nl) nl.onclick = function () { R = null; V.h.go('#/quiz/play/' + (lv.id + 1)); };
    redraw();
    if (inp.value && !Q.validName(inp.value)) err.textContent = '';
  };

  V.quiz = function (el, parts) {
    if (parts && parts[0] === 'play') {
      var lv = Q.level(+parts[1]);
      if (!lv || !Q.unlocked(progress(), lv.id)) { R = null; location.hash = '#/quiz'; return; }
      playView(el, lv); return;
    }
    R = R && R.done ? null : R; listView(el);
  };
})(typeof window !== 'undefined' ? window : globalThis);
