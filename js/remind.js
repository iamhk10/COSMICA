/* =========================================================================
   Cosmica — js/remind.js : reminders for sky events.
   Honest limits: without a server a web page cannot wake itself up. So reminders fire while Cosmica is open
   (browser notification if you allowed it, otherwise a message in the app), and anything that came due while the
   app was closed is shown the next time you open it.
   Pure scheduling lives in X.remind.* (unit-tested); X.remindUI does the notification part.
   Reminder: { id (event id), t (event ms), lead (minutes before), title (text shown), fired (bool) }
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, R = X.remind = {};
  var MAX = 40, LEADS = [60, 360, 1440];
  R.LEADS = LEADS;
  var norm = function (r) {
    if (!r || typeof r.id !== 'string' || !isFinite(+r.t)) return null;
    var lead = LEADS.indexOf(+r.lead) >= 0 ? +r.lead : 60;
    return { id: r.id.slice(0, 80), t: +r.t, lead: lead, title: String(r.title || '').slice(0, 120), fired: !!r.fired };
  };
  R.clean = function (list) { return (Array.isArray(list) ? list : []).map(norm).filter(Boolean); };
  R.find = function (list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; };
  /** add or change the reminder for an event. A reminder whose time has already passed is refused. */
  R.set = function (list, r, now) {
    var n = norm(r); if (!n) return { list: list, error: 'invalid' };
    if (n.t <= now) return { list: list, error: 'past' };             // the event itself is over
    var out = list.filter(function (x) { return x.id !== n.id; });
    if (out.length >= MAX) return { list: list, error: 'full' };
    n.fired = false; out.push(n); out.sort(function (a, b) { return a.t - b.t; }); return { list: out };
  };
  R.remove = function (list, id) { return list.filter(function (x) { return x.id !== id; }); };
  /** reminders whose alert time has come and which are not shown yet: { due, missed, list } — "missed" = the event itself is already over by more than 6 hours */
  R.check = function (list, now) {
    var due = [], missed = [], out = list.map(function (r) {
      if (r.fired) return r;
      if (r.t - r.lead * 60000 <= now) { var c = Object.assign({}, r, { fired: true }); (now - r.t > 6 * 3600000 ? missed : due).push(c); return c; }
      return r;
    });
    return { due: due, missed: missed, list: out };
  };
  /** drop old, already shown reminders (older than 2 days past the event) */
  R.prune = function (list, now) { return list.filter(function (r) { return !(r.fired && now - r.t > 2 * 86400000); }); };

  X.remindUI = {
    supported: function () { return typeof root.Notification !== 'undefined'; },
    permission: function () { return typeof root.Notification === 'undefined' ? 'unsupported' : root.Notification.permission; },
    ask: function () {
      if (typeof root.Notification === 'undefined') return Promise.resolve('unsupported');
      if (root.Notification.permission !== 'default') return Promise.resolve(root.Notification.permission);
      try { var p = root.Notification.requestPermission(function () { }); return p && p.then ? p : Promise.resolve(root.Notification.permission); } catch (e) { return Promise.resolve(root.Notification.permission); }
    },
    /** show a system notification when allowed; resolves true if one was shown */
    notify: function (title, body, tag) {
      if (typeof root.Notification === 'undefined' || root.Notification.permission !== 'granted') return Promise.resolve(false);
      var opts = { body: body, tag: tag, icon: 'icons/icon-192.png', badge: 'icons/favicon-32.png' };
      var viaSw = root.navigator && navigator.serviceWorker && navigator.serviceWorker.getRegistration ? navigator.serviceWorker.getRegistration().then(function (reg) { if (reg && reg.showNotification) { return reg.showNotification(title, opts).then(function () { return true; }); } return false; }) : Promise.resolve(false);
      return viaSw.catch(function () { return false; }).then(function (ok) { if (ok) return true; try { new root.Notification(title, opts); return true; } catch (e) { return false; } });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
