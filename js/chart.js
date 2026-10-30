/* =========================================================================
   Cosmica — js/chart.js : the sky chart, drawn on a <canvas>.
   Looking straight up: zenith in the middle, horizon on the circle, north at the top, east on the LEFT
   (that is how the real sky looks when you lie back and look up). Stereographic projection keeps shapes true.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, astro = X.astro, D = X.data = root.CosmicaData;
  var D2R = Math.PI / 180;

  var lerp = function (a, b, f) { return a + (b - a) * f; };
  var hex = function (h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; };
  var mix = function (a, b, f) { return 'rgb(' + Math.round(lerp(a[0], b[0], f)) + ',' + Math.round(lerp(a[1], b[1], f)) + ',' + Math.round(lerp(a[2], b[2], f)) + ')'; };
  /* sky colours (centre, edge) for the Sun's altitude: day → dusk → night */
  var SKY = [[10, '#3d7fd0', '#9ccbf0'], [0, '#2c4f8f', '#e8965a'], [-6, '#16275a', '#a85a5a'], [-12, '#0b1536', '#33305f'], [-18, '#04061a', '#0b1233']].map(function (s) { return [s[0], hex(s[1]), hex(s[2])]; });
  var skyAt = function (alt) {
    if (alt >= SKY[0][0]) return [SKY[0][1], SKY[0][2]]; if (alt <= SKY[4][0]) return [SKY[4][1], SKY[4][2]];
    for (var i = 0; i < 4; i++) if (alt >= SKY[i + 1][0]) { var f = (alt - SKY[i + 1][0]) / (SKY[i][0] - SKY[i + 1][0]); return [SKY[i + 1][1].map(function (v, k) { return lerp(v, SKY[i][1][k], f); }), SKY[i + 1][2].map(function (v, k) { return lerp(v, SKY[i][2][k], f); })]; }
  };
  /* star colour from B–V colour index */
  var starRGB = function (bv) {
    if (bv < -0.1) return [170, 195, 255]; if (bv < 0.25) return [215, 228, 255]; if (bv < 0.6) return [255, 248, 235];
    if (bv < 1.0) return [255, 232, 170]; if (bv < 1.5) return [255, 196, 130]; return [255, 150, 110];
  };
  var PLANET_COL = { mercury: '#c9bdb6', venus: '#ffe9a8', mars: '#ff8a65', jupiter: '#ffd58a', saturn: '#e6d29a', uranus: '#9be7ea', neptune: '#7da2ff' };
  X.planetColor = PLANET_COL;

  var SkyChart = X.SkyChart = function (canvas) {
    this.cv = canvas; this.ctx = canvas.getContext('2d'); this.sf = new astro.StarField(D.stars);
    this.layers = { lines: true, names: true, grid: false, mw: true }; this.night = false; this.items = []; this.selected = null;
    this.view = null; this.info = null; this.resize();
  };

  SkyChart.prototype.resize = function () {
    var w = Math.max(240, Math.min(760, this.cv.parentElement.clientWidth)), dpr = Math.min(window.devicePixelRatio || 1, 3);
    this.w = w; this.cv.style.width = w + 'px'; this.cv.style.height = w + 'px';
    this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(w * dpr); this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cx = w / 2; this.cy = w / 2; this.R = w * 0.43; this.sc = Math.max(0.85, Math.min(1.5, this.R / 170));
    if (this.view) this.draw();
  };

  /** altitude/azimuth → screen. Points below the horizon land outside the circle. */
  SkyChart.prototype.pt = function (alt, az, o) {
    var r = this.R * Math.tan((90 - Math.max(alt, -85)) * D2R / 2), a = az * D2R;
    o.x = this.cx - r * Math.sin(a); o.y = this.cy - r * Math.cos(a); return o;
  };

  SkyChart.prototype.col = function (rgbOrHex, a) {
    var c = typeof rgbOrHex === 'string' ? hex(rgbOrHex) : rgbOrHex;
    if (this.night) { var l = 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]; c = [Math.round(95 + 0.62 * l), Math.round(14 + 0.2 * l), Math.round(10 + 0.12 * l)]; }
    return a == null || a >= 1 ? 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' : 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')';
  };

  /** view = { tms, loc } ; also set .layers / .night / .selected before calling */
  SkyChart.prototype.draw = function (view) {
    if (view) this.view = view; view = this.view; if (!view) return;
    var ctx = this.ctx, w = this.w, cx = this.cx, cy = this.cy, R = this.R, sc = this.sc, self = this, p = { x: 0, y: 0 }, q = { x: 0, y: 0 }, o = {};
    var B = astro.bodies(view.tms, view.loc), sunAlt = B.sun.alt, lim = astro.limitingMag(sunAlt), sf = this.sf, i, j;
    sf.project(view.tms, view.loc);
    var pr = astro.makeProjector(view.tms, view.loc);
    this.items = []; this.info = { sunAlt: sunAlt, lim: lim, bodies: B };
    ctx.clearRect(0, 0, w, w);

    /* sky disc */
    var sk = this.night ? [[10, 0, 0], [26, 3, 3]] : skyAt(sunAlt);
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, mix(sk[0], sk[0], 0)); g.addColorStop(1, mix(sk[1], sk[1], 0));
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fillStyle = g; ctx.fill(); ctx.clip();

    /* Milky Way */
    if (this.layers.mw && sunAlt < -3) {
      var fade = Math.min(1, (-3 - sunAlt) / 12);
      for (i = 0; i < D.mw.length; i++) {
        ctx.fillStyle = this.col([200, 215, 255], (0.035 + i * 0.012) * fade);
        for (j = 0; j < D.mw[i].length; j++) {
          var ring = D.mw[i][j]; ctx.beginPath();
          for (var k = 0; k < ring.length; k++) { pr(ring[k][0], ring[k][1], o); self.pt(o.alt, o.az, p); if (k) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }
          ctx.closePath(); ctx.fill();
        }
      }
    }

    /* grid */
    if (this.layers.grid) {
      ctx.lineWidth = 1; ctx.strokeStyle = this.col([140, 160, 220], 0.22); ctx.fillStyle = this.col([150, 170, 230], 0.6); ctx.font = '500 ' + (10 * sc) + 'px Poppins, sans-serif'; ctx.textAlign = 'left';
      [30, 60].forEach(function (a) { var r = R * Math.tan((90 - a) * D2R / 2); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.fillText(a + '°', cx + 4, cy - r - 3); });
      ctx.beginPath(); for (i = 0; i < 8; i++) { var a = i * 45 * D2R; ctx.moveTo(cx, cy); ctx.lineTo(cx - R * Math.sin(a), cy - R * Math.cos(a)); } ctx.stroke();
    }

    /* constellation lines */
    if (this.layers.lines) {
      ctx.lineWidth = 1; ctx.strokeStyle = this.col([130, 160, 255], sunAlt > -3 ? 0.12 : 0.30);
      ctx.beginPath();
      for (i = 0; i < D.cons.length; i++) for (j = 0; j < D.cons[i].l.length; j++) {
        var seg = D.cons[i].l[j], pen = false;
        for (var m = 0; m < seg.length; m++) {
          pr(seg[m][0], seg[m][1], o);
          if (o.alt < -2) { pen = false; continue; }
          self.pt(o.alt, o.az, p); if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); pen = true;
        }
      }
      ctx.stroke();
    }

    /* stars */
    var shown = [];
    for (i = 0; i < sf.n; i++) {
      var s = D.stars[i], mag = s[2]; if (mag > lim) break;
      var alt = sf.alt[i]; if (alt < -0.3) continue;
      this.pt(alt, sf.az[i], p);
      var ext = alt < 10 ? 0.4 + 0.6 * Math.max(0, alt) / 10 : 1, al = Math.min(1, 0.32 + (lim - mag) * 0.34) * ext, r = Math.max(0.55, (3.0 - 0.5 * mag) * sc * 0.85);
      var rgb = starRGB(s[3]);
      if (mag < 1.7 && !this.night) { var gg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4); gg.addColorStop(0, this.col(rgb, 0.35 * al)); gg.addColorStop(1, this.col(rgb, 0)); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, 7); ctx.fill(); }
      ctx.fillStyle = this.col(rgb, al); ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill();
      if (mag <= 3.6) { this.items.push({ type: 'star', hip: s[4], mag: mag, x: p.x, y: p.y, r: Math.max(r, 7), alt: alt, az: sf.az[i], ra: s[0], dec: s[1] }); if (mag <= 2.6) shown.push(this.items[this.items.length - 1]); }
    }

    /* planets */
    var pl = B.planets.slice().sort(function (a, b) { return b.mag - a.mag; });
    for (i = 0; i < pl.length; i++) {
      var P = pl[i]; if (P.alt < -0.5) continue; this.pt(P.alt, P.az, p);
      var pr2 = Math.max(2.1, Math.min(5.6, 3.0 - 0.55 * P.mag)) * sc * 0.9, dim = P.mag > lim + 0.8 ? 0.45 : 1;
      if (P.mag > 7) { ctx.strokeStyle = this.col(PLANET_COL[P.id], 0.9); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(p.x, p.y, 3.6 * sc, 0, 7); ctx.stroke(); }
      else { var pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr2 * 3.2); pg.addColorStop(0, this.col(PLANET_COL[P.id], 0.5 * dim)); pg.addColorStop(1, this.col(PLANET_COL[P.id], 0)); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(p.x, p.y, pr2 * 3.2, 0, 7); ctx.fill(); ctx.fillStyle = this.col(PLANET_COL[P.id], dim); ctx.beginPath(); ctx.arc(p.x, p.y, pr2, 0, 7); ctx.fill(); }
      this.items.push({ type: 'planet', id: P.id, x: p.x, y: p.y, r: Math.max(pr2 + 6, 13), alt: P.alt, az: P.az, mag: P.mag, pri: 1 });
    }

    /* Sun */
    var sp = { x: 0, y: 0 }; this.pt(B.sun.alt, B.sun.az, sp);
    if (B.sun.alt > -2) {
      var sr = Math.max(7, R * 0.042), sg = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sr * 4); sg.addColorStop(0, this.col([255, 220, 120], 0.65)); sg.addColorStop(1, this.col([255, 200, 90], 0));
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sp.x, sp.y, sr * 4, 0, 7); ctx.fill(); ctx.fillStyle = this.col([255, 224, 130]); ctx.beginPath(); ctx.arc(sp.x, sp.y, sr, 0, 7); ctx.fill();
      this.items.push({ type: 'sun', x: sp.x, y: sp.y, r: sr + 10, alt: B.sun.alt, az: B.sun.az, pri: 0 });
    }

    /* Moon (lit side turned towards the Sun) */
    this.pt(B.moon.alt, B.moon.az, p);
    if (B.moon.alt > -2) {
      var mr = Math.max(8, R * 0.05), ang = Math.atan2(sp.y - p.y, sp.x - p.x), k = B.moon.illum;
      var mg = ctx.createRadialGradient(p.x, p.y, mr * 0.8, p.x, p.y, mr * 3.2); mg.addColorStop(0, this.col([230, 230, 255], 0.28 * (0.3 + k))); mg.addColorStop(1, this.col([230, 230, 255], 0));
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(p.x, p.y, mr * 3.2, 0, 7); ctx.fill();
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(ang);
      ctx.fillStyle = this.col([48, 56, 82]); ctx.beginPath(); ctx.arc(0, 0, mr, 0, 7); ctx.fill();
      ctx.fillStyle = this.col([240, 238, 222]); ctx.beginPath(); ctx.arc(0, 0, mr, -Math.PI / 2, Math.PI / 2, false);
      var kk = 1 - 2 * k; for (j = 20; j >= -20; j--) { var th = j / 20 * Math.PI / 2; ctx.lineTo(kk * mr * Math.cos(th), mr * Math.sin(th)); }
      ctx.closePath(); ctx.fill(); ctx.restore();
      this.items.push({ type: 'moon', x: p.x, y: p.y, r: mr + 10, alt: B.moon.alt, az: B.moon.az, pri: 0 });
    }

    /* names */
    ctx.textAlign = 'left';
    if (this.layers.names) {
      ctx.font = '400 ' + (10.5 * sc) + 'px Poppins, sans-serif'; ctx.fillStyle = this.col([200, 212, 255], sunAlt > -6 ? 0.4 : 0.78);
      var cap = w < 460 ? 1.8 : 2.3;
      shown.forEach(function (s) { var nm = D.names[s.hip]; if (nm && s.mag <= cap) ctx.fillText(nm[0], s.x + 6, s.y - 5); });
      ctx.font = '500 ' + (9.5 * sc) + 'px Poppins, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = this.col([140, 170, 255], sunAlt > -6 ? 0.25 : 0.55);
      for (i = 0; i < D.cons.length; i++) { var c = D.cons[i]; if (!c.l.length) continue; pr(c.c[0], c.c[1], o); if (o.alt < 12) continue; self.pt(o.alt, o.az, p); ctx.fillText(c.en.toUpperCase(), p.x, p.y); }
      ctx.textAlign = 'left'; ctx.font = '600 ' + (11.5 * sc) + 'px Poppins, sans-serif';
      pl.forEach(function (P) { if (P.alt < -0.5) return; self.pt(P.alt, P.az, p); ctx.fillStyle = self.col(PLANET_COL[P.id], 1); ctx.fillText(X.i18n ? X.i18n.t('pl.' + P.id).replace(/\s*\(.*\)/, '') : P.id, p.x + 8, p.y + 4); });
      if (B.sun.alt > -2) { ctx.fillStyle = this.col([255, 230, 150]); ctx.fillText(X.i18n ? X.i18n.t('sun') : 'Sun', sp.x + 12, sp.y + 4); }
    }
    ctx.restore();

    /* selection ring */
    if (this.selected) {
      var it = this.find(this.selected); if (it) { ctx.strokeStyle = this.col([255, 255, 255], 0.9); ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.arc(it.x, it.y, Math.max(it.r, 12), 0, 7); ctx.stroke(); ctx.setLineDash([]); }
    }

    /* horizon ring + compass points */
    ctx.strokeStyle = this.col([150, 175, 255], 0.55); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.fillStyle = this.col([210, 222, 255], 0.95); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var lab = X.i18n ? [X.i18n.t('dir.n'), X.i18n.t('dir.e'), X.i18n.t('dir.s'), X.i18n.t('dir.w')] : ['N', 'E', 'S', 'W'], off = R + 16 * sc;
    ctx.font = '700 ' + (14 * sc) + 'px Poppins, sans-serif';
    ctx.fillText(lab[0], cx, cy - off); ctx.fillText(lab[1], cx - off, cy); ctx.fillText(lab[2], cx, cy + off); ctx.fillText(lab[3], cx + off, cy);
    ctx.font = '500 ' + (9.5 * sc) + 'px Poppins, sans-serif'; ctx.fillStyle = this.col([150, 170, 230], 0.7); var d2 = (R + 14 * sc) * Math.SQRT1_2;
    ctx.fillText('NE', cx - d2, cy - d2); ctx.fillText('NW', cx + d2, cy - d2); ctx.fillText('SE', cx - d2, cy + d2); ctx.fillText('SW', cx + d2, cy + d2);
    ctx.textBaseline = 'alphabetic';
    /* zenith cross */
    ctx.strokeStyle = this.col([180, 200, 255], 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx - 4, cy); ctx.lineTo(cx + 4, cy); ctx.moveTo(cx, cy - 4); ctx.lineTo(cx, cy + 4); ctx.stroke();
    return this.info;
  };

  SkyChart.prototype.find = function (sel) {
    for (var i = 0; i < this.items.length; i++) { var it = this.items[i]; if (it.type !== sel.type) continue; if (sel.type === 'sun' || sel.type === 'moon') return it; if (sel.type === 'star' ? (sel.hip != null && it.hip === sel.hip) : (sel.id != null && it.id === sel.id)) return it; }
    return null;
  };

  /** nearest object to a tap (x, y in CSS pixels inside the canvas) */
  SkyChart.prototype.hit = function (x, y) {
    var best = null, bd = 1e9;
    for (var i = 0; i < this.items.length; i++) {
      var it = this.items[i], d = Math.hypot(it.x - x, it.y - y) - (it.pri === 0 ? it.r * 0.4 : 0);
      if (d <= it.r && (d - (it.pri != null ? 6 : 0)) < bd) { bd = d - (it.pri != null ? 6 : 0); best = it; }
    }
    return best;
  };
})(typeof window !== 'undefined' ? window : globalThis);
