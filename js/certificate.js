/* =========================================================================
   Cosmica — js/certificate.js : draws the quiz certificate on a canvas (A4 landscape, 1754 × 1240 px).
   Everything is made on the device; nothing is uploaded.
   X.certificate.draw(canvas, { name, level, levelTitle, score, passed, dateText }) → Promise
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {};
  var W = 1754, H = 1240, NAVY = '#14214d', GOLD = '#b8892b', GOLD2 = '#e3b94f', INK = '#33405f', PAPER = '#fbf6e9';
  var F = function (w, px) { return w + ' ' + px + 'px Poppins, "Noto Sans Devanagari", "Segoe UI", system-ui, sans-serif'; };

  var star = function (c, x, y, r, fill) {
    c.beginPath(); for (var i = 0; i < 8; i++) { var a = -Math.PI / 2 + i * Math.PI / 4, rr = i % 2 ? r * 0.28 : r; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fillStyle = fill; c.fill();
  };
  var fit = function (c, text, weight, px, maxW) { var s = px; c.font = F(weight, s); while (c.measureText(text).width > maxW && s > 36) { s -= 4; c.font = F(weight, s); } return s; };

  var paint = function (canvas, o) {
    var t = X.i18n.t, c = canvas.getContext('2d'); canvas.width = W; canvas.height = H;
    c.fillStyle = PAPER; c.fillRect(0, 0, W, H);
    /* soft corner glow + faint stars */
    var g = c.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 1100); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(184,137,43,.13)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    var seed = 11, rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (var i = 0; i < 46; i++) { var x = 90 + rnd() * (W - 180), y = 90 + rnd() * (H - 180); if (x > 330 && x < W - 330 && y > 260 && y < H - 240) continue; star(c, x, y, 5 + rnd() * 9, 'rgba(20,33,77,.10)'); }
    /* frame */
    c.lineWidth = 16; c.strokeStyle = NAVY; c.strokeRect(46, 46, W - 92, H - 92);
    c.lineWidth = 4; c.strokeStyle = GOLD; c.strokeRect(76, 76, W - 152, H - 152);
    [[76, 76], [W - 76, 76], [76, H - 76], [W - 76, H - 76]].forEach(function (p) { star(c, p[0], p[1], 26, GOLD); });
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    /* brand */
    star(c, W / 2 - 150, 178, 22, NAVY); c.fillStyle = NAVY; c.font = F(700, 38); c.textAlign = 'left'; c.fillText('COSMICA', W / 2 - 112, 192); c.textAlign = 'center';
    /* title */
    c.fillStyle = NAVY; c.font = F(700, 86); c.fillText(t(o.passed ? 'cert.titlePass' : 'cert.titlePart'), W / 2, 330);
    c.fillStyle = GOLD; c.fillRect(W / 2 - 160, 360, 320, 5);
    c.fillStyle = INK; c.font = F(400, 34); c.fillText(t('cert.presented'), W / 2, 440);
    /* name */
    var s = fit(c, o.name, 700, 120, 1350); c.fillStyle = NAVY; c.font = F(700, s); c.fillText(o.name, W / 2, 590);
    var nw = Math.min(1350, c.measureText(o.name).width + 120); c.fillStyle = GOLD2; c.fillRect(W / 2 - nw / 2, 618, nw, 4);
    /* what for */
    c.fillStyle = INK; c.font = F(400, 34); c.fillText(t('cert.for'), W / 2, 690);
    c.fillStyle = NAVY; c.font = F(700, 46); var lv = t('cert.level', { n: o.level }) + ' — ' + o.levelTitle; fit(c, lv, 700, 46, 1300); c.fillText(lv, W / 2, 758);
    c.fillStyle = INK; c.font = F(400, 30); c.fillText(t('cert.quiz'), W / 2, 806);
    /* score seal */
    var cx = W / 2, cy = 954, r = 100; c.beginPath(); c.arc(cx, cy, r + 14, 0, 7); c.fillStyle = GOLD2; c.fill(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fillStyle = NAVY; c.fill();
    c.lineWidth = 3; c.strokeStyle = GOLD2; c.beginPath(); c.arc(cx, cy, r - 12, 0, 7); c.stroke();
    c.fillStyle = '#fff'; c.font = F(700, 72); c.fillText(String(o.score), cx, cy + 16); c.font = F(500, 26); c.fillStyle = GOLD2; c.fillText('/ 100', cx, cy + 54);
    c.font = F(500, 26); c.fillStyle = o.passed ? '#1f7a4d' : INK; c.fillText(t(o.passed ? 'cert.cleared' : 'cert.keep'), cx, 1104);
    /* footer */
    c.textAlign = 'left'; c.fillStyle = INK; c.font = F(500, 26); c.fillText(t('cert.date') + ': ' + o.dateText, 150, 990);
    c.textAlign = 'right'; c.fillText('Cosmica · ' + t('developer') + ' ΣTΣЯПITY', W - 150, 990);
    c.textAlign = 'center'; c.font = F(400, 20); c.fillStyle = 'rgba(51,64,95,.75)'; c.fillText(t('cert.note'), W / 2, 1140);
  };

  X.certificate = {
    W: W, H: H,
    draw: function (canvas, o) {
      var load = root.document && document.fonts && document.fonts.load ? Promise.all([document.fonts.load('700 40px Poppins'), document.fonts.load('400 30px Poppins'), document.fonts.load('500 26px Poppins')]).catch(function () { }) : Promise.resolve();
      return load.then(function () { paint(canvas, o); });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
