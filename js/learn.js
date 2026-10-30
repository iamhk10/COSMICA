/* =========================================================================
   Cosmica — js/learn.js : the Learn hub — History, Constellations, Facts, Glossary, Guide (+ Bortle), India, Agencies, On this day.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views, H = V.h;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$, L = H.L, link = H.link, stat = H.stat;
  var PLANET_IDS = astro.PLANETS.map(function (p) { return p.id; });
  var TABS = ['history', 'stars', 'facts', 'glossary', 'guide', 'india', 'agencies', 'today'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var tabs = function (cur) {
    return '<div class="tabs scroll" role="tablist">' + TABS.map(function (k) {
      return '<a role="tab" aria-selected="' + (cur === k) + '" class="' + (cur === k ? 'on' : '') + '" href="#/learn/' + k + '">' + esc(t('learn.' + k)) + '</a>';
    }).join('') + '</div>';
  };
  var sections = function (arr) { return arr.map(function (s) { return '<h4>' + esc(s.h) + '</h4><p>' + esc(s.t) + '</p>'; }).join(''); };
  var srcs = function (arr) { return '<div class="srcs"><span>' + esc(t('sources')) + ':</span> ' + (arr || []).map(link).join(' ') + '</div>'; };
  var extLink = function (url, label) { return '<a class="btn sm ext" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' ↗</a>'; };

  /* ------------------------------------------------------------ history (Sun, Moon, planets) */
  var historyGrid = function () {
    var ids = ['sun', 'moon'].concat(PLANET_IDS);
    return '<p class="lead">' + esc(t('historyLead')) + '</p><div class="cards">' + ids.map(function (id) {
      var o = X.objects[id], d = o[L()];
      return '<a class="card hc" href="#/learn/history/' + id + '">' + UI.orb(id, 52) + '<b>' + esc(d.name) + '</b><span class="dev">' + esc(o.dev) + '</span><small>' + esc(d.tag) + '</small></a>';
    }).join('') + '</div>';
  };
  var historyPage = function (id) {
    var o = X.objects[id]; if (!o) return '<p>' + esc(t('notFound')) + '</p>';
    var d = o[L()], ids = ['sun', 'moon'].concat(PLANET_IDS), i = ids.indexOf(id), prev = ids[(i + ids.length - 1) % ids.length], next = ids[(i + 1) % ids.length];
    return '<a class="back" href="#/learn/history">← ' + esc(t('learn.history')) + '</a>' +
      '<section class="card hist"><div class="hh">' + UI.orb(id, 72) + '<div><h2>' + esc(d.name) + '</h2><div class="dev">' + esc(o.dev) + ' · ' + esc(o.hindi) + '</div></div></div><p class="lead">' + esc(d.tag) + '</p>' +
      sections(d.s) + srcs(o.src) + '</section>' +
      '<div class="pn"><a class="btn" href="#/learn/history/' + prev + '">← ' + esc(X.objects[prev][L()].name) + '</a><a class="btn" href="#/learn/history/' + next + '">' + esc(X.objects[next][L()].name) + ' →</a></div>';
  };

  /* ------------------------------------------------------------ constellations */
  var conIds = function () { return Object.keys(X.constellations || {}); };
  var starsGrid = function () {
    return '<p class="lead">' + esc(t('starsLead')) + '</p><div class="cards">' + conIds().map(function (k) {
      var c = X.constellations[k], d = c[L()];
      return '<a class="card hc" href="#/learn/stars/' + k + '"><span class="conico" style="--c:' + esc(c.color) + '" aria-hidden="true">✦</span><b>' + esc(d.name) + '</b><span class="dev">' + esc(c.dev) + ' · ' + esc(c.hindi) + '</span><small>' + esc(d.tag) + '</small></a>';
    }).join('') + '</div>';
  };
  var starsPage = function (id) {
    var c = X.constellations && X.constellations[id]; if (!c) return '<p>' + esc(t('notFound')) + '</p>';
    var d = c[L()], ids = conIds(), i = ids.indexOf(id), prev = ids[(i + ids.length - 1) % ids.length], next = ids[(i + 1) % ids.length];
    return '<a class="back" href="#/learn/stars">← ' + esc(t('learn.stars')) + '</a>' +
      '<section class="card hist"><div class="hh"><span class="conico big" style="--c:' + esc(c.color) + '" aria-hidden="true">✦</span><div><h2>' + esc(d.name) + '</h2><div class="dev">' + esc(c.dev) + ' · ' + esc(c.hindi) + '</div></div></div>' +
      '<p class="lead">' + esc(d.tag) + '</p><p class="chip wrap">' + esc(c.season[L()]) + '</p>' + sections(d.s) + srcs(c.src) + '</section>' +
      '<div class="pn"><a class="btn" href="#/learn/stars/' + prev + '">← ' + esc(X.constellations[prev][L()].name) + '</a><a class="btn" href="#/learn/stars/' + next + '">' + esc(X.constellations[next][L()].name) + ' →</a></div>';
  };

  /* ------------------------------------------------------------ facts & glossary */
  var factCard = function (f) { return '<article class="card fact"><span class="chip">' + esc(t('cat.' + f.cat)) + '</span><p>' + esc(f[L()]) + '</p>' + link(f.src) + '</article>'; };
  var factsPage = function (cat) {
    var cats = ['all', 'sun', 'earth', 'moon', 'planets', 'stars', 'universe', 'missions', 'life'];
    var idx = UI.localDayIndex(S.tms, S.loc.tz) % X.facts.length, f = X.facts[idx];
    var list = X.facts.filter(function (x) { return cat === 'all' || x.cat === cat; });
    return '<section class="card fod"><h3>' + esc(t('factOfDay')) + '</h3><p id="fodText">' + esc(f[L()]) + '</p><div class="row"><span id="fodSrc">' + link(f.src) + '</span>' +
      '<button class="btn sm pri" id="nextFact">' + esc(t('nextFact')) + '</button></div></section>' +
      '<div class="filters" role="group">' + cats.map(function (c) { return '<button class="chip tg" data-cat="' + c + '" aria-pressed="' + (c === cat) + '">' + esc(c === 'all' ? t('all') : t('cat.' + c)) + '</button>'; }).join('') + '</div>' +
      '<p class="muted">' + esc(t('factsCount', { n: list.length })) + '</p><div class="cards one">' + list.map(factCard).join('') + '</div>';
  };
  var glossaryPage = function (q) {
    q = (q || '').toLowerCase();
    var list = X.glossary.filter(function (g) { return !q || g.term.toLowerCase().indexOf(q) >= 0 || g[L()].toLowerCase().indexOf(q) >= 0; });
    return '<input class="search" id="gq" type="search" placeholder="' + esc(t('glossSearch')) + '" value="' + esc(q) + '" aria-label="' + esc(t('glossSearch')) + '">' +
      '<div id="glist" class="cards one">' + (list.length ? list.map(function (g) { return '<article class="card"><h4>' + esc(g.term) + '</h4><p>' + esc(g[L()]) + '</p></article>'; }).join('') : '<p class="muted">' + esc(t('noResults')) + '</p>') + '</div>';
  };

  /* ------------------------------------------------------------ guide: beginner steps + Bortle */
  var BORTLE = [[7.6, 8.0], [7.1, 7.5], [6.6, 7.0], [6.1, 6.5], [5.6, 6.0], [5.1, 5.5], [4.6, 5.0], [4.1, 4.5], [4.0, 4.0]];
  var guidePage = function () {
    var cur = X.store.get('bortle', 6), steps = '';
    for (var i = 1; i <= 8; i++) steps += '<li><b>' + esc(t('guide.h' + i)) + '</b><span>' + esc(t('guide.t' + i)) + '</span></li>';
    var rows = BORTLE.map(function (r, k) {
      var n = k + 1, lim = n === 9 ? '≤ 4.0' : r[0].toFixed(1) + '–' + r[1].toFixed(1);
      return '<button class="bortle' + (n === cur ? ' on' : '') + '" data-b="' + n + '" aria-pressed="' + (n === cur) + '"><i class="bdot b' + n + '"></i><span class="bn">' + n + '</span><span class="bt"><b>' + esc(t('bortle.n' + n)) + '</b><small>' + esc(t('bortle.lim', { m: lim })) + ' · ' + esc(t('bortle.t' + n)) + '</small></span></button>';
    }).join('');
    return '<section class="card"><h3>' + esc(t('guide.title')) + '</h3><ol class="steps">' + steps + '</ol><p class="note warn">⚠ ' + esc(t('guide.safety')) + '</p></section>' +
      '<section class="card"><h3>' + esc(t('bortle.title')) + '</h3><p class="muted">' + esc(t('bortle.lead')) + '</p><div class="bl">' + rows + '</div><p class="note">' + esc(t('bortle.saved', { n: cur })) + '</p></section>';
  };

  /* ------------------------------------------------------------ India */
  var indiaPage = function () {
    var I = X.indian;
    return '<p class="lead">' + esc(t('indiaLead')) + '</p><h3 class="sec">' + esc(t('india.people')) + '</h3><div class="cards one">' + I.people.map(function (p) {
      var d = p[L()]; return '<details class="card acc"><summary><b>' + esc(p.name) + '</b> <span class="muted">' + esc(p.years) + '</span><small>' + esc(d.role) + '</small></summary>' + sections(d.s) + srcs(p.src) + '</details>';
    }).join('') + '</div><h3 class="sec">' + esc(t('india.concepts')) + '</h3><div class="cards one">' + I.concepts.map(function (c) {
      var d = c[L()]; return '<details class="card acc"><summary><b>' + esc(d.h) + '</b></summary><p>' + esc(d.t) + '</p>' + srcs(c.src) + '</details>';
    }).join('') + '</div><h3 class="sec">' + esc(t('india.nak')) + '</h3><p class="muted sm">' + esc(t('india.nakNote')) + '</p><div class="nak">' + I.nakshatras.map(function (n, i) {
      return '<div class="nk"><b>' + (i + 1) + '. ' + esc(n.n) + '</b>' + (n.star ? '<small>' + esc(n.star[L()]) + '</small>' : '') + '</div>';
    }).join('') + '</div>';
  };

  /* ------------------------------------------------------------ space agencies */
  var agencyCard = function (a) {
    return '<article class="card ag"><div class="ag-h"><div><h4>' + esc(a.name) + '</h4><small class="muted">' + esc(a.full) + '</small></div>' + extLink(a.url, t('agencies.site')) + '</div><p>' + esc(a.about[L()]) + '</p>' +
      '<ul class="ms">' + a.missions.map(function (m) { return '<li><b>' + esc(m.year) + '</b> <span><b>' + esc(m.name) + '</b> — ' + esc(m.note[L()]) + (m.url ? ' <a class="src" href="' + esc(m.url) + '" target="_blank" rel="noopener noreferrer">' + esc(t('agencies.page')) + ' ↗</a>' : '') + '</span></li>'; }).join('') + '</ul></article>';
  };
  var agenciesPage = function () {
    var A = X.agencies;
    return '<p class="lead">' + esc(t('agencies.lead')) + '</p><p class="note">' + esc(t('agencies.checked', { d: A.checked })) + '</p>' +
      A.countries.map(function (c) { return '<h3 class="sec">' + esc(c.flag) + ' ' + esc(c.country[L()]) + '</h3>' + c.agencies.map(agencyCard).join(''); }).join('') +
      '<h3 class="sec">🌍 ' + esc(t('agencies.multi')) + '</h3>' + A.multinational.map(agencyCard).join('');
  };

  /* ------------------------------------------------------------ on this day */
  var otdPage = function (month) {
    var lp = astro.tzParts(S.tms, S.loc.tz), m = month || lp.mo, list = (X.onThisDay || []).filter(function (e) { return e.m === m; });
    var today = X.otd.forDay(lp.mo, lp.d);
    return '<p class="lead">' + esc(t('otd.lead')) + '</p>' +
      (today.length && !month ? '<section class="card"><h3>' + esc(t('otd.today')) + '</h3><ul class="plain otd">' + today.map(function (e) { return '<li><b>' + e.y + '</b> ' + esc(e[L()]) + (e.src ? ' ' + link(e.src) : '') + '</li>'; }).join('') + '</ul></section>' : '') +
      '<label class="mrow">' + esc(t('otd.month')) + ' <select id="otdM">' + MONTHS.map(function (n, i) { return '<option value="' + (i + 1) + '"' + (i + 1 === m ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('') + '</select></label>' +
      '<div class="cards one">' + list.map(function (e) { return '<article class="card otd1"><span class="dt">' + e.d + ' ' + esc(MONTHS[e.m - 1].slice(0, 3)) + ' <b>' + e.y + '</b></span><p>' + esc(e[L()]) + '</p>' + (e.src ? link(e.src) : '') + '</article>'; }).join('') + '</div>';
  };

  /* ------------------------------------------------------------ the view */
  V.learn = function (el, parts) {
    var sub = TABS.indexOf(parts[0]) >= 0 ? parts[0] : 'history', arg = parts[1], body;
    if (sub === 'history') body = arg ? historyPage(arg) : historyGrid();
    else if (sub === 'stars') body = arg ? starsPage(arg) : starsGrid();
    else if (sub === 'facts') body = '<div id="lbody">' + factsPage('all') + '</div>';
    else if (sub === 'glossary') body = '<div id="lbody">' + glossaryPage('') + '</div>';
    else if (sub === 'guide') body = guidePage();
    else if (sub === 'india') body = indiaPage();
    else if (sub === 'agencies') body = agenciesPage();
    else body = '<div id="lbody">' + otdPage() + '</div>';
    el.innerHTML = '<div class="page">' + tabs(sub) + body + '</div>';
    var on = $('.tabs a.on', el); if (on && on.scrollIntoView) { try { on.parentNode.scrollLeft = on.offsetLeft - 16; } catch (e) { /* ignore */ } }

    if (sub === 'facts') {
      var cat = 'all', n = UI.localDayIndex(S.tms, S.loc.tz) % X.facts.length;
      var wire = function () {
        var nb = $('#nextFact', el);
        if (nb) nb.onclick = function () { n = (n + 1 + Math.floor(Math.random() * (X.facts.length - 1))) % X.facts.length; var f = X.facts[n]; $('#fodText', el).textContent = f[L()]; $('#fodSrc', el).innerHTML = link(f.src); };
        $$('[data-cat]', el).forEach(function (b) { b.onclick = function () { cat = b.getAttribute('data-cat'); $('#lbody', el).innerHTML = factsPage(cat); wire(); i18n.apply(el); }; });
      };
      wire();
    }
    if (sub === 'glossary') {
      var gq = $('#gq', el); gq.oninput = function () { var tmp = document.createElement('div'); tmp.innerHTML = glossaryPage(gq.value); $('#glist', el).innerHTML = $('#glist', tmp).innerHTML; };
    }
    if (sub === 'guide') {
      $$('[data-b]', el).forEach(function (b) { b.onclick = function () { X.store.set('bortle', +b.getAttribute('data-b')); V.learn(el, parts); i18n.apply(el); UI.toast(t('bortle.toast', { n: X.store.get('bortle', 6) })); }; });
    }
    if (sub === 'today') {
      var wireOtd = function () { var sel = $('#otdM', el); sel.onchange = function () { $('#lbody', el).innerHTML = otdPage(+sel.value); wireOtd(); i18n.apply(el); }; };
      wireOtd();
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
