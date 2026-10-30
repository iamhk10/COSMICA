/* =========================================================================
   Cosmica — js/events-ui.js : the Events screen — Upcoming, Meteors, Eclipses, Moon calendar (+ reminders, calendar files, the Today card).
   The other tabs (Compare places, Sun & year, My log) live in plan-ui.js and plug in through X.planPages.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views, E = X.events, R = X.remind;
  var t = i18n.t, esc = UI.esc, $ = UI.$, $$ = UI.$$, L = V.h.L;
  var TABS = ['up', 'meteors', 'eclipses', 'moon', 'compare', 'sun', 'log'];
  var DAY = 86400000, HR = 3600000, MIN = 60000, DAYS = 400;
  var planPages = X.planPages = X.planPages || {};

  /* ------------------------------------------------------------ small helpers */
  var tzOf = function () { return S.loc.tz; };
  var tm = function (ms) { return UI.time(ms, tzOf()); };
  var dshort = function (ms) { var p = astro.tzParts(ms, tzOf()), cy = astro.tzParts(Date.now(), tzOf()).y; return UI.date(ms, tzOf()) + (p.y !== cy ? ' ' + p.y : ''); };
  var dtm = function (ms) { return dshort(ms) + ', ' + tm(ms); };
  var pl = function (id) { return t('pl.' + id).replace(/\s*\(.*\)/, ''); };
  var monthShort = function (ms) { return new Intl.DateTimeFormat(i18n.lang === 'hi' ? 'en-IN' : 'en-GB', { timeZone: tzOf(), month: 'short' }).format(new Date(ms)); };
  var monthLong = function (ms) { return new Intl.DateTimeFormat(i18n.lang === 'hi' ? 'en-IN' : 'en-GB', { timeZone: tzOf(), month: 'long', year: 'numeric' }).format(new Date(ms)); };
  var fmtLL = function (lat, lon) { return Math.abs(lat).toFixed(1) + '°' + (lat >= 0 ? 'N' : 'S') + ' ' + Math.abs(lon).toFixed(1) + '°' + (lon >= 0 ? 'E' : 'W'); };
  var meteorOf = function (id) { return (X.meteors || []).filter(function (m) { return m.id === id; })[0]; };
  var ico = {
    bell: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2h-15Z M10 21h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    cal: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    log: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M5 4h11l3 3v13H5Z M8 11h8M8 15h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>'
  };
  X.icons = ico;

  var saveBlob = X.saveBlob = function (name, blob) {
    var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click();
    setTimeout(function () { a.remove(); URL.revokeObjectURL(url); }, 1500);
  };

  /* ------------------------------------------------------------ how an event reads (title, lines, chips, time span) */
  var visLine = function (ids, ms, moon) {
    var loc = S.loc, sa = astro.sunAlt(ms, loc), alts = ids.map(function (id) { return astro.altaz(astro.planetById(id).body, ms, loc).alt; });
    if (moon) alts.push(astro.altaz(root.Astronomy.Body.Moon, ms, loc).alt);
    var low = Math.min.apply(null, alts);
    if (sa > -3) return t('ev.vis.day', { place: S.loc.name });
    if (low > 5) return t('ev.vis.night', { place: S.loc.name, alt: UI.deg(low) });
    return t('ev.vis.below', { place: S.loc.name });
  };
  var rateCls = { great: 'good', good: 'good', fair: 'low', poor: 'low', unseen: 'none' };

  /** → { icon, title, lines[], chips[[text, cls]], span[start,end], tab } */
  var describe = X.eventText = function (e) {
    var o = { title: '', lines: [], chips: [], span: [e.t, e.t + HR], tab: 'up', cls: e.type };
    var place = S.loc.name, i, v;
    if (e.type === 'phase') {
      o.title = t('ev.ph.' + e.q) + (e.q === 2 ? ' · ' + t('ev.folk.' + e.folk) : '');
      if (e.q === 2 && e.near) o.chips.push([t('ev.super'), 'good']); if (e.q === 2 && e.far) o.chips.push([t('ev.micro'), 'none']); if (e.blue) o.chips.push([t('ev.blue'), 'good']);
      o.lines.push(t('ev.phNote.' + e.q)); if (e.km) o.lines.push(t('ev.km', { km: e.km.toLocaleString('en-IN') }));
      o.span = [e.t, e.t + 30 * MIN]; o.tab = 'moon';
    } else if (e.type === 'lunar-eclipse') {
      o.title = t('ev.le.' + e.kind); o.tab = 'eclipses'; o.span = e.outer || [e.t - HR, e.t + HR];
      o.lines.push(t('ev.le.peak', { time: dtm(e.t) }));
      if (e.total) o.lines.push(t('ev.le.tot', { m: Math.round((e.total[1] - e.total[0]) / MIN) }));
      var core = e.kind === 'penumbral' ? e.pen : e.partial; if (core) o.lines.push(t('ev.le.par', { from: tm(core[0]), to: tm(core[1]) }));
      if (e.kind === 'penumbral') o.lines.push(t('ev.le.pen'));
      if (e.vis) { o.lines.push(t('ev.le.vis.' + e.vis, { place: place })); o.chips.push([t('ev.vc.' + e.vis), e.vis === 'full' ? 'good' : e.vis === 'part' ? 'low' : 'none']); if (e.vis !== 'none') o.lines.push(t('ev.le.safe')); }
    } else if (e.type === 'solar-eclipse') {
      o.title = t('ev.se.' + e.kind); o.tab = 'eclipses'; o.span = e.local ? [e.local.begin, e.local.end] : [e.t - HR, e.t + HR];
      if (e.local && e.vis !== 'none') {
        o.lines.push(t('ev.se.l.' + e.local.kind, { place: place, pct: Math.round(e.local.obscuration * 100), time: dtm(e.local.peak), b: tm(e.local.begin), e: tm(e.local.end) }));
        if (e.vis === 'part') o.lines.push(t('ev.se.part', { place: place }));
        o.lines.push(t('ev.se.safety'));
      } else o.lines.push(t('ev.se.none', { place: place }), t('ev.se.when', { time: dtm(e.t) }), t('ev.se.where', { where: fmtLL(e.lat, e.lon) }));
      if (e.vis) o.chips.push([t('ev.vc.' + e.vis), e.vis === 'full' ? 'good' : e.vis === 'part' ? 'low' : 'none']);
    } else if (e.type === 'conj') {
      o.title = t('ev.conj', { a: pl(e.a), b: pl(e.b) }); o.lines.push(t('ev.conj.sep', { sep: e.sep.toFixed(1) }), visLine([e.a, e.b], e.t, false)); if (e.sep < 1) o.chips.push([t('ev.close'), 'good']);
    } else if (e.type === 'moonconj') {
      o.title = t('ev.mconj', { p: pl(e.id) }); o.lines.push(t('ev.mconj.sub', { sep: e.sep.toFixed(1), lit: Math.round(e.illum * 100) }), visLine([e.id], e.t, true));
    } else if (e.type === 'opposition') {
      o.title = t('ev.opp', { p: pl(e.id) }); o.lines.push(t('ev.opp.sub', { mag: UI.mag(e.mag), au: e.au.toFixed(2) })); o.chips.push([t('ev.brightest'), 'good']); o.span = [e.t, e.t + 2 * HR];
    } else if (e.type === 'elongation') {
      o.title = t('ev.elong', { p: pl(e.id), side: t(e.evening ? 'ev.east' : 'ev.west') }); o.lines.push(t('ev.elong.sub', { deg: Math.round(e.deg), p: pl(e.id), when: t(e.evening ? 'ev.evening' : 'ev.morning') }));
    } else if (e.type === 'season') {
      o.title = t('ev.s.' + e.key); o.lines.push(t('ev.s.' + e.key + '.sub'));
    } else if (e.type === 'meteor') {
      var sh = meteorOf(e.id), nm = sh ? sh[L()].name : e.id; o.title = t('ev.met', { name: nm }); o.tab = 'meteors';
      o.lines.push(t('ev.met.sub', { zhr: e.zhr, moon: Math.round(e.moon * 100) }));
      if (e.rating) {
        o.chips.push([t('ev.rate.' + e.rating), rateCls[e.rating]]);
        if (e.rating === 'unseen') o.lines.push(t('ev.met.unseen', { place: place }));
        else if (e.watch) { o.lines.push(t('ev.met.watch', { day: dshort(e.watch[0]), from: tm(e.watch[0]), to: tm(e.watch[1]), alt: UI.deg(e.best.alt) })); o.span = e.watch; }
        else o.lines.push(t('ev.met.nowatch'));
      }
      if (!e.watch) o.span = [e.t - HR, e.t + 2 * HR];
    }
    return o;
  };

  /* ------------------------------------------------------------ one event as a card */
  var dateBlock = function (ms) { return '<div class="ev-d"><b>' + astro.tzParts(ms, tzOf()).d + '</b><span>' + esc(monthShort(ms)) + '</span></div>'; };
  var remList = function () { return R.clean(X.store.get('remind', [])); };
  var card = function (e, opt) {
    opt = opt || {}; var d = describe(e), has = !!R.find(remList(), e.uid), past = e.t < Date.now();
    var acts = '';
    if (!past) acts += '<button class="btn sm ico' + (has ? ' on' : '') + '" data-rem="' + esc(e.uid) + '" aria-pressed="' + has + '" aria-label="' + esc(t(has ? 'ev.reminding' : 'ev.remind')) + '" title="' + esc(t(has ? 'ev.reminding' : 'ev.remind')) + '">' + ico.bell + '</button>';
    acts += '<button class="btn sm ico" data-ics="' + esc(e.uid) + '" aria-label="' + esc(t('ev.addCal')) + '" title="' + esc(t('ev.addCal')) + '">' + ico.cal + '</button>';
    if (e.type === 'meteor' || e.type === 'lunar-eclipse' || e.type === 'solar-eclipse' || e.type === 'conj') acts += '<button class="btn sm ico" data-log="' + esc(e.uid) + '" aria-label="' + esc(t('ev.logIt')) + '" title="' + esc(t('ev.logIt')) + '">' + ico.log + '</button>';
    return '<article class="card ev ev-' + e.type + (past ? ' past' : '') + '" id="' + esc(e.uid.replace(/[^\w-]/g, '_')) + '">' + dateBlock(e.t) +
      '<div class="ev-b"><b class="ev-t">' + esc(d.title) + '</b><small class="ev-w">' + esc(dtm(e.t)) + '</small>' +
      (d.chips.length ? '<div class="chips">' + d.chips.map(function (c) { return '<span class="chip c-' + c[1] + '">' + esc(c[0]) + '</span>'; }).join('') + '</div>' : '') +
      d.lines.map(function (l, i) { return '<small class="' + (/^ev\.(se\.safety)/.test(l) ? '' : '') + 'ev-l">' + esc(l) + '</small>'; }).join('') + '</div>' +
      '<div class="ev-a">' + acts + '</div></article>';
  };

  /* ------------------------------------------------------------ calendar files */
  var toIcs = function (list, withAlert) {
    return X.ics.build(list.map(function (e) {
      var d = describe(e);
      return { uid: e.uid, start: d.span[0], end: d.span[1], summary: d.title, description: d.lines.join('\n') + '\n\n' + t('ev.ics.times', { tz: tzOf() }) + ' · Cosmica', location: S.loc.name };
    }), { alarmMin: withAlert ? 60 : 0, name: 'Cosmica — ' + S.loc.name });
  };
  var downloadIcs = function (list, withAlert, name) {
    saveBlob(name || 'Cosmica-sky-events.ics', new Blob([toIcs(list, withAlert)], { type: 'text/calendar;charset=utf-8' })); UI.toast(t('ev.icsSaved'));
  };

  /* ------------------------------------------------------------ reminders */
  var byId = {};
  var setReminders = function (list) { X.store.set('remind', list); };
  var openRemind = function (e, after) {
    var d = describe(e), now = Date.now(), list = remList(), cur = R.find(list, e.uid);
    var valid = R.LEADS.filter(function (l) { return e.t - l * MIN > now; });
    var perm = X.remindUI.permission();
    UI.dialog(t('ev.remDlg'), '<p><b>' + esc(d.title) + '</b><br><span class="muted">' + esc(dtm(e.t)) + '</span></p>' +
      (valid.length ? '<div class="row wrap" role="radiogroup" aria-label="' + esc(t('ev.remLead')) + '">' + valid.map(function (l, i) {
        var on = cur ? cur.lead === l : i === valid.length - 1 && valid.indexOf(60) < 0 || l === (valid.indexOf(1440) >= 0 ? 1440 : valid.indexOf(360) >= 0 ? 360 : 60);
        return '<button class="chip tg" role="radio" data-lead="' + l + '" aria-checked="' + !!on + '" aria-pressed="' + !!on + '">' + esc(t('ev.lead.' + l)) + '</button>';
      }).join('') + '</div>' : '<p class="err">' + esc(t('ev.remSoon')) + '</p>') +
      '<p class="note">' + esc(t('ev.remPerm.' + perm)) + '</p><p class="note">' + esc(t('ev.remNote')) + '</p>' +
      '<div class="row wrap">' + (valid.length ? '<button class="btn pri" id="remGo">' + esc(t('ev.remSave')) + '</button>' : '') + (cur ? '<button class="btn" id="remDel">' + esc(t('ev.remRemove')) + '</button>' : '') + '</div>',
      function (body, close) {
        var lead = (function () { var b = $('[data-lead][aria-pressed="true"]', body); return b ? +b.getAttribute('data-lead') : 60; })();
        $$('[data-lead]', body).forEach(function (b) { b.onclick = function () { lead = +b.getAttribute('data-lead'); $$('[data-lead]', body).forEach(function (x) { var on = x === b; x.setAttribute('aria-pressed', on); x.setAttribute('aria-checked', on); }); }; });
        var go = $('#remGo', body), del = $('#remDel', body);
        if (go) go.onclick = function () {
          X.remindUI.ask().then(function () {
            var r = R.set(remList(), { id: e.uid, t: e.t, lead: lead, title: d.title }, Date.now());
            if (r.error) { UI.toast(t(r.error === 'full' ? 'ev.remFull' : 'ev.remPast')); return; }
            setReminders(r.list); close(); UI.toast(t('ev.remSet')); if (after) after();
          });
        };
        if (del) del.onclick = function () { setReminders(R.remove(remList(), e.uid)); close(); UI.toast(t('ev.remRemoved')); if (after) after(); };
      });
  };

  /** called when the app starts, every minute, and when the tab becomes visible again */
  X.remindTick = function () {
    var list = R.prune(remList(), Date.now()), c = R.check(list, Date.now());
    if (c.list.length !== remList().length || c.due.length || c.missed.length) setReminders(c.list);
    c.due.forEach(function (r) {
      var msg = t('ev.remDue', { title: r.title, when: dtm(r.t) });
      X.remindUI.notify(r.title, t('ev.remBody', { when: dtm(r.t), place: S.loc ? S.loc.name : '' }), r.id).then(function (shown) { if (!shown) UI.toast(msg, 8000); });
    });
    if (c.missed.length) UI.toast(t('ev.remMissed', { n: c.missed.length }), 7000);
  };

  /* ------------------------------------------------------------ shared wiring for rows */
  var wireRows = function (box, listFn, rerender) {
    $$('[data-rem]', box).forEach(function (b) { b.onclick = function () { var e = listFn(b.getAttribute('data-rem')); if (e) openRemind(e, rerender); }; });
    $$('[data-ics]', box).forEach(function (b) { b.onclick = function () { var e = listFn(b.getAttribute('data-ics')); if (e) downloadIcs([e], X.store.get('icsAlert', true), 'Cosmica-' + e.uid.replace(/[^\w-]/g, '_') + '.ics'); }; });
    $$('[data-log]', box).forEach(function (b) {
      b.onclick = function () {
        var e = listFn(b.getAttribute('data-log')); if (!e) return; var d = describe(e);
        S.logPrefill = { what: d.title, kind: e.type === 'meteor' ? 'meteor' : e.type === 'conj' ? 'conj' : 'eclipse', ts: Math.min(Date.now(), e.t) };
        V.h.go('#/events/log');
      };
    });
  };

  /* ------------------------------------------------------------ tabs */
  var tabsBar = function (cur) {
    return '<div class="tabs scroll" role="tablist">' + TABS.map(function (k) { return '<a role="tab" aria-selected="' + (cur === k) + '" class="' + (cur === k ? 'on' : '') + '" href="#/events/' + k + '">' + esc(t('ev.t.' + k)) + '</a>'; }).join('') + '</div>';
  };

  var FILTERS = {
    sky: function (e) { return E.notable(e); },
    eclipse: function (e) { return e.type === 'lunar-eclipse' || e.type === 'solar-eclipse'; },
    meteor: function (e) { return e.type === 'meteor'; },
    planet: function (e) { return e.type === 'conj' || e.type === 'moonconj' || e.type === 'opposition' || e.type === 'elongation'; },
    moon: function (e) { return e.type === 'phase'; },
    all: function () { return true; }
  };

  var upPage = function (box) {
    var filt = X.store.get('evFilter', 'sky'); if (!FILTERS[filt]) filt = 'sky';
    var all = null, shown = [], idx = {};
    var draw = function () {
      var rems = remList().filter(function (r) { return r.t > Date.now(); });
      var months = {}, order = [];
      shown = all.filter(FILTERS[filt]); shown.forEach(function (e) { idx[e.uid] = e; var k = monthLong(e.t); if (!months[k]) { months[k] = []; order.push(k); } months[k].push(e); });
      box.innerHTML =
        '<p class="lead">' + esc(t('ev.lead', { place: S.loc.name })) + '</p>' +
        (rems.length ? '<section class="card"><h3>🔔 ' + esc(t('ev.myRem')) + '</h3><ul class="plain remlist">' + rems.map(function (r) { return '<li><span><b>' + esc(r.title) + '</b><small>' + esc(dtm(r.t)) + ' · ' + esc(t('ev.lead.' + r.lead)) + '</small></span><button class="btn sm" data-remdel="' + esc(r.id) + '">' + esc(t('ev.remRemove')) + '</button></li>'; }).join('') + '</ul></section>' : '') +
        '<div class="filters" role="group" aria-label="' + esc(t('ev.filter')) + '">' + Object.keys(FILTERS).map(function (k) { return '<button class="chip tg" data-f="' + k + '" aria-pressed="' + (k === filt) + '">' + esc(t('ev.f.' + k)) + '</button>'; }).join('') + '</div>' +
        (shown.length ? '<div class="icsbar"><button class="btn sm" id="icsAll">' + ico.cal + ' ' + esc(t('ev.addCalAll', { n: shown.length })) + '</button><label class="chk"><input type="checkbox" id="icsAlert"' + (X.store.get('icsAlert', true) ? ' checked' : '') + '> ' + esc(t('ev.withAlert')) + '</label></div><p class="note">' + esc(t('ev.icsHint')) + '</p>' : '') +
        (order.length ? order.map(function (k) { return '<h3 class="sec">' + esc(k) + '</h3><div class="evlist">' + months[k].map(function (e) { return card(e); }).join('') + '</div>'; }).join('') : '<p class="muted">' + esc(t('ev.none')) + '</p>') +
        '<p class="note">' + esc(t('ev.accuracy')) + '</p>';
      i18n.apply(box);
      $$('[data-f]', box).forEach(function (b) { b.onclick = function () { filt = b.getAttribute('data-f'); X.store.set('evFilter', filt); draw(); }; });
      var ia = $('#icsAlert', box); if (ia) ia.onchange = function () { X.store.set('icsAlert', ia.checked); };
      var all2 = $('#icsAll', box); if (all2) all2.onclick = function () { downloadIcs(shown.slice(0, 250), X.store.get('icsAlert', true)); };
      $$('[data-remdel]', box).forEach(function (b) { b.onclick = function () { setReminders(R.remove(remList(), b.getAttribute('data-remdel'))); UI.toast(t('ev.remRemoved')); draw(); }; });
      wireRows(box, function (id) { return idx[id]; }, draw);
    };
    box.innerHTML = '<p class="muted">' + esc(t('ev.calc')) + '</p>';
    setTimeout(function () { try { all = E.upcoming(Date.now(), DAYS, S.loc, tzOf()); draw(); } catch (e) { box.innerHTML = '<p>' + esc(t('calcError')) + '</p>'; if (root.console) console.error(e); } }, 30);
  };

  /* ------------------------------------------------------------ meteor showers */
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var meteorsPage = function (box) {
    box.innerHTML = '<p class="muted">' + esc(t('ev.calc')) + '</p>';
    setTimeout(function () {
      var now = Date.now(), list = E.meteors(now - 12 * HR, now + DAYS * DAY, S.loc, tzOf()), first = {};
      list.sort(function (a, b) { return a.t - b.t; }).forEach(function (e) { if (!first[e.id]) first[e.id] = e; });
      var arr = Object.keys(first).map(function (k) { return first[k]; }).sort(function (a, b) { return a.t - b.t; });
      arr.forEach(function (e) { e.uid = E.idOf(e); });
      var idx = {}; arr.forEach(function (e) { idx[e.uid] = e; });
      box.innerHTML = '<p class="lead">' + esc(t('ev.metLead')) + '</p>' + arr.map(function (e) {
        var sh = meteorOf(e.id), d = describe(e), has = !!R.find(remList(), e.uid), past = e.t < now;
        return '<article class="card met" id="m-' + e.id + '"><div class="met-h"><div><h3>' + esc(sh[L()].name) + '</h3><small class="muted">' + esc(t('ev.met.peakAt', { when: dtm(e.t) })) + '</small></div>' +
          (e.rating ? '<span class="chip c-' + rateCls[e.rating] + '">' + esc(t('ev.rate.' + e.rating)) + '</span>' : '') + '</div>' +
          '<p>' + esc(sh[L()].note) + '</p>' +
          '<div class="grid2">' + V.h.stat(t('ev.zhr'), '≤ ' + e.zhr + ' / h') + V.h.stat(t('ev.moonAtPeak'), Math.round(e.moon * 100) + '%') +
          V.h.stat(t('ev.radiant'), esc(sh.con)) + V.h.stat(t('ev.active'), esc(sh.from[1] + ' ' + MON[sh.from[0] - 1] + ' – ' + sh.to[1] + ' ' + MON[sh.to[0] - 1])) + V.h.stat(t('ev.speed'), sh.kms + ' km/s') + V.h.stat(t('ev.parent'), esc(sh.parent)) + '</div>' +
          (e.rating === 'unseen' ? '<p class="note">' + esc(t('ev.met.unseen', { place: S.loc.name })) + '</p>' : e.watch ? '<p class="note">' + esc(t('ev.met.watch', { day: dshort(e.watch[0]), from: tm(e.watch[0]), to: tm(e.watch[1]), alt: UI.deg(e.best.alt) })) + '</p>' : '') +
          '<div class="row wrap">' + (past ? '' : '<button class="btn sm' + (has ? ' on' : '') + '" data-rem="' + esc(e.uid) + '">' + ico.bell + ' ' + esc(t(has ? 'ev.reminding' : 'ev.remind')) + '</button>') +
          '<button class="btn sm" data-ics="' + esc(e.uid) + '">' + ico.cal + ' ' + esc(t('ev.addCal')) + '</button><button class="btn sm" data-log="' + esc(e.uid) + '">' + ico.log + ' ' + esc(t('ev.logIt')) + '</button></div></article>';
      }).join('') + '<section class="card"><h3>' + esc(t('ev.howWatch')) + '</h3><ul class="plain">' + [1, 2, 3, 4].map(function (i) { return '<li>' + esc(t('ev.how.' + i)) + '</li>'; }).join('') + '</ul></section><p class="note">' + esc(t('ev.metNote')) + '</p>';
      i18n.apply(box); wireRows(box, function (id) { return idx[id]; }, function () { meteorsPage(box); });
      var hash = (location.hash.split('/')[3] || ''); if (hash) { var tgt = document.getElementById('m-' + hash); if (tgt && tgt.scrollIntoView) tgt.scrollIntoView(); }
    }, 30);
  };

  /* ------------------------------------------------------------ eclipses */
  var eclipsesPage = function (box) {
    box.innerHTML = '<p class="muted">' + esc(t('ev.calc')) + '</p>';
    setTimeout(function () {
      var now = Date.now(), end = now + 3 * 365 * DAY, list = [].concat(E.lunarEclipses(now - 12 * HR, end, S.loc), E.solarEclipses(now - 12 * HR, end, S.loc)).sort(function (a, b) { return a.t - b.t; });
      list.forEach(function (e) { e.uid = E.idOf(e); }); var idx = {}; list.forEach(function (e) { idx[e.uid] = e; });
      var mine = list.filter(function (e) { return e.vis && e.vis !== 'none' && !(e.type === 'lunar-eclipse' && e.kind === 'penumbral'); })[0];
      box.innerHTML = '<p class="lead">' + esc(t('ev.eclLead')) + '</p>' +
        (mine ? '<section class="card hero2"><h3>' + esc(t('ev.nextHere', { place: S.loc.name })) + '</h3><p><b>' + esc(describe(mine).title) + '</b> — ' + esc(dtm(mine.t)) + '</p></section>' : '<section class="card"><p class="muted">' + esc(t('ev.noneHere', { place: S.loc.name })) + '</p></section>') +
        '<section class="card warn"><h3>☀ ' + esc(t('ev.safeTitle')) + '</h3><p>' + esc(t('ev.se.safety')) + '</p><p class="note">' + esc(t('ev.safeMore')) + '</p></section>' +
        '<div class="evlist">' + list.map(function (e) { return card(e); }).join('') + '</div><p class="note">' + esc(t('ev.eclNote')) + '</p>';
      i18n.apply(box); wireRows(box, function (id) { return idx[id]; }, function () { eclipsesPage(box); });
    }, 30);
  };

  /* ------------------------------------------------------------ Moon calendar */
  var moonPage = function (box) {
    var lp = astro.tzParts(Date.now(), tzOf()), cur = { y: lp.y, m: lp.mo - 1 }, base = lp.y * 12 + lp.mo - 1;
    var draw = function () {
      var idx = cur.y * 12 + cur.m, first = Date.UTC(cur.y, cur.m, 1), dim = new Date(Date.UTC(cur.y, cur.m + 1, 0)).getUTCDate(), dow0 = new Date(first).getUTCDay();
      var from = Date.UTC(cur.y, cur.m, 1) - 14 * HR, to = Date.UTC(cur.y, cur.m + 1, 1) + 14 * HR, ph = E.moonPhases(from - 2 * DAY, to + 2 * DAY, tzOf());
      var byDay = {}; ph.forEach(function (p) { var q = astro.tzParts(p.t, tzOf()); if (q.y === cur.y && q.mo - 1 === cur.m) (byDay[q.d] = byDay[q.d] || []).push(p); });
      var wk = []; for (var i = 0; i < 7; i++) wk.push(new Intl.DateTimeFormat(i18n.lang === 'hi' ? 'en-IN' : 'en-GB', { timeZone: 'UTC', weekday: 'short' }).format(new Date(Date.UTC(2023, 0, 1 + i))));
      var cells = ''; for (i = 0; i < dow0; i++) cells += '<div class="mc empty"></div>';
      var A = root.Astronomy;
      for (var d = 1; d <= dim; d++) {
        var wall = Date.UTC(cur.y, cur.m, d, 20, 0), m = wall - astro.tzOffset(wall, tzOf()), deg = A.MoonPhase(new Date(m)), illum = (1 - Math.cos(deg * Math.PI / 180)) / 2, ev = byDay[d] || [], key = ev.length ? ev[0] : null;
        cells += '<div class="mc' + (key ? ' ph' + key.q : '') + (cur.y === lp.y && cur.m === lp.mo - 1 && d === lp.d ? ' today' : '') + '" aria-label="' + esc(d + ' ' + (key ? t('ev.ph.' + key.q) : '')) + '"><span class="mn">' + d + '</span>' + UI.moonIcon(illum, deg < 180, 26, S.loc.lat < 0) + (key ? '<small>' + esc(tm(key.t)) + '</small>' : '') + '</div>';
      }
      var evs = ph.filter(function (p) { var q = astro.tzParts(p.t, tzOf()); return q.y === cur.y && q.mo - 1 === cur.m; }); evs.forEach(function (e) { e.uid = E.idOf(e); }); var ix = {}; evs.forEach(function (e) { ix[e.uid] = e; });
      box.innerHTML = '<p class="lead">' + esc(t('ev.moonLead')) + '</p>' +
        '<div class="daybar"><button class="btn ico" id="mPrev" aria-label="' + esc(t('prevMonth')) + '"' + (idx <= base - 12 ? ' disabled' : '') + '>‹</button><b class="mtitle">' + esc(monthLong(Date.UTC(cur.y, cur.m, 15, 12))) + '</b><button class="btn ico" id="mNext" aria-label="' + esc(t('nextMonth')) + '"' + (idx >= base + 24 ? ' disabled' : '') + '>›</button></div>' +
        '<section class="card mcal"><div class="mgrid mh">' + wk.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('') + '</div><div class="mgrid">' + cells + '</div></section>' +
        '<div class="evlist">' + evs.map(function (e) { return card(e); }).join('') + '</div><p class="note">' + esc(t('ev.moonNote')) + '</p>';
      i18n.apply(box);
      $('#mPrev', box).onclick = function () { cur.m--; if (cur.m < 0) { cur.m = 11; cur.y--; } draw(); }; $('#mNext', box).onclick = function () { cur.m++; if (cur.m > 11) { cur.m = 0; cur.y++; } draw(); };
      wireRows(box, function (id) { return ix[id]; }, draw);
    };
    draw();
  };

  /* ------------------------------------------------------------ the screen */
  V.events = function (el, parts) {
    var sub = TABS.indexOf(parts[0]) >= 0 ? parts[0] : 'up';
    el.innerHTML = '<div class="page events">' + tabsBar(sub) + '<div id="evBox"></div></div>';
    var on = $('.tabs a.on', el); if (on) { try { on.parentNode.scrollLeft = Math.max(0, on.offsetLeft - 16); } catch (e) { /* ignore */ } }
    var box = $('#evBox', el), cleanup = null;
    if (sub === 'up') upPage(box); else if (sub === 'meteors') meteorsPage(box); else if (sub === 'eclipses') eclipsesPage(box); else if (sub === 'moon') moonPage(box);
    else if (planPages[sub]) cleanup = planPages[sub](box);
    i18n.apply(el);
    return typeof cleanup === 'function' ? cleanup : null;
  };

  /* ------------------------------------------------------------ the Today card: the next thing worth looking up for */
  X.nextEventCard = function (box) {
    setTimeout(function () {
      if (!document.body.contains(box)) return;
      var list; try { list = E.upcoming(Date.now(), 120, S.loc, tzOf()); } catch (e) { return; }
      var e = list.filter(E.notable)[0]; if (!e) { box.innerHTML = ''; return; }
      var d = describe(e), days = Math.round((e.t - Date.now()) / DAY);
      box.innerHTML = '<section class="card nextev"><h3>✦ ' + esc(t('ev.next')) + '</h3><a class="pmain" href="#/events/' + (d.tab === 'moon' ? 'up' : d.tab) + '"><span class="ev-d sm"><b>' + astro.tzParts(e.t, tzOf()).d + '</b><span>' + esc(monthShort(e.t)) + '</span></span>' +
        '<span class="ptxt"><b>' + esc(d.title) + '</b><small>' + esc(dtm(e.t)) + ' · ' + esc(days <= 0 ? t('ev.today') : days === 1 ? t('ev.tomorrow') : t('ev.inDays', { n: days })) + '</small>' + (d.lines[1] || d.lines[0] ? '<small>' + esc(d.lines[d.lines.length > 1 && e.type !== 'phase' ? 1 : 0]) + '</small>' : '') + '</span></a>' +
        '<a class="more" href="#/events">' + esc(t('ev.seeAll')) + ' →</a></section>';
      i18n.apply(box);
    }, 60);
  };
})(typeof window !== 'undefined' ? window : globalThis);
