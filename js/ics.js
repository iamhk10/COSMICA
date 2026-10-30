/* =========================================================================
   Cosmica — js/ics.js : build a calendar file (.ics, RFC 5545) from sky events, on the device.
   Works with Google Calendar, Apple Calendar, Outlook … Nothing is uploaded.
   X.ics.build(events, { prodId, stamp, alarmMin }) → text with CRLF line endings.
   An event: { uid, start (ms), end (ms, optional), summary, description, location }
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, ics = X.ics = {};
  var pad = function (n, w) { n = String(n); while (n.length < (w || 2)) n = '0' + n; return n; };
  /** 20261029T183000Z */
  ics.utc = function (ms) { var d = new Date(ms); return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z'; };
  /** escape text values */
  ics.esc = function (s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\;').replace(/,/g, '\\,'); };
  var utf8len = function (ch) { var c = ch.codePointAt(0); return c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4; };
  /** fold a long line at 75 octets (never inside a character): continuation lines start with one space */
  ics.fold = function (line) {
    var out = [], cur = '', n = 0, limit = 75;
    for (var ch of line) {
      var l = utf8len(ch);
      if (n + l > limit) { out.push(cur); cur = ' '; n = 1; limit = 75; }
      cur += ch; n += l;
    }
    out.push(cur); return out.join('\r\n');
  };
  ics.build = function (events, opt) {
    opt = opt || {}; var stamp = ics.utc(opt.stamp || Date.now()), lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:' + (opt.prodId || '-//Cosmica//Sky events//EN'), 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:' + ics.esc(opt.name || 'Cosmica sky events')
    ];
    events.forEach(function (e) {
      var end = e.end && e.end > e.start ? e.end : e.start + 3600000;
      lines.push('BEGIN:VEVENT', 'UID:' + String(e.uid).replace(/[^\w.:@-]/g, '') + '@cosmica', 'DTSTAMP:' + stamp, 'DTSTART:' + ics.utc(e.start), 'DTEND:' + ics.utc(end), 'SUMMARY:' + ics.esc(e.summary));
      if (e.description) lines.push('DESCRIPTION:' + ics.esc(e.description));
      if (e.location) lines.push('LOCATION:' + ics.esc(e.location));
      lines.push('TRANSP:TRANSPARENT');
      if (opt.alarmMin > 0) lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + ics.esc(e.summary), 'TRIGGER:-PT' + Math.round(opt.alarmMin) + 'M', 'END:VALARM');
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.map(ics.fold).join('\r\n') + '\r\n';
  };
})(typeof window !== 'undefined' ? window : globalThis);
