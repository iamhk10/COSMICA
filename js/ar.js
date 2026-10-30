/* =========================================================================
   Cosmica — js/ar.js : AR sky — hold the phone up and the star map follows where you point it.
   The maths is in X.ar.* (no DOM — unit-tested in Node, tests/ar.test.js); V.ar is the full-screen view.
   Axes used everywhere here: E (east), N (north), U (up). Altitude/azimuth are in degrees, azimuth from north towards east.
   Honest limits: phone compasses are often 5–20° off near metal/magnets — the "Align" button fixes the heading using a real object.
   The camera picture never leaves the device (it is only shown on screen).
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {}, ar = X.ar = {};
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;

  /* ------------------------------------------------------------ pure maths */
  ar.altAzToDir = function (alt, az) { var a = alt * D2R, z = az * D2R, c = Math.cos(a); return [Math.sin(z) * c, Math.cos(z) * c, Math.sin(a)]; };
  ar.dirToAltAz = function (v) {
    var n = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1, az = Math.atan2(v[0], v[1]) * R2D; if (az < 0) az += 360;
    return { alt: Math.asin(Math.max(-1, Math.min(1, v[2] / n))) * R2D, az: az };
  };
  var dot = function (a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; };
  var norm = function (v) { var n = Math.sqrt(dot(v, v)) || 1; return [v[0] / n, v[1] / n, v[2] / n]; };
  var cross = function (a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; };
  /** turn a vector clockwise (seen from above) by `deg` — i.e. increase its azimuth */
  ar.yaw = function (v, deg) { var c = Math.cos(deg * D2R), s = Math.sin(deg * D2R); return [v[0] * c + v[1] * s, -v[0] * s + v[1] * c, v[2]]; };

  /** the camera of a phone from the W3C orientation angles (degrees): forward = out of the back, up/right = screen up/right.
   *  screenAngle = screen.orientation.angle (0, 90, 180, 270); yawDeg = heading correction */
  ar.basis = function (alpha, beta, gamma, screenAngle, yawDeg) {
    var ca = Math.cos(alpha * D2R), sa = Math.sin(alpha * D2R), cb = Math.cos(beta * D2R), sb = Math.sin(beta * D2R), cg = Math.cos(gamma * D2R), sg = Math.sin(gamma * D2R);
    var x = [ca * cg - sa * sb * sg, sa * cg + ca * sb * sg, -cb * sg];      // device right
    var y = [-sa * cb, ca * cb, sb];                                           // device top
    var z = [ca * sg + sa * sb * cg, sa * sg - ca * sb * cg, cb * cg];        // out of the screen
    var th = (screenAngle || 0) * D2R, c = Math.cos(th), s = Math.sin(th);
    var up = [y[0] * c + x[0] * s, y[1] * c + x[1] * s, y[2] * c + x[2] * s], right = [x[0] * c - y[0] * s, x[1] * c - y[1] * s, x[2] * c - y[2] * s];
    var b = { f: [-z[0], -z[1], -z[2]], r: right, u: up };
    if (yawDeg) { b.f = ar.yaw(b.f, yawDeg); b.r = ar.yaw(b.r, yawDeg); b.u = ar.yaw(b.u, yawDeg); }
    return b;
  };
  /** a camera looking at (az, alt) with the horizon level — used when there is no motion sensor (drag to look around) */
  ar.basisLook = function (az, alt) {
    var f = ar.altAzToDir(alt, az), r = norm(cross(f, [0, 0, 1])); if (!isFinite(r[0]) || (Math.abs(r[0]) + Math.abs(r[1]) < 1e-9)) r = [1, 0, 0];
    return { f: f, r: r, u: cross(r, f) };
  };
  /** direction → screen pixel (or null when it is behind the camera). focal in pixels. */
  ar.project = function (d, b, focal, W, H) {
    var z = dot(d, b.f); if (z <= 0.02) return null;
    return { x: W / 2 + dot(d, b.r) / z * focal, y: H / 2 - dot(d, b.u) / z * focal, z: z };
  };
  /** screen pixel → direction on the sky */
  ar.unproject = function (x, y, b, focal, W, H) {
    var px = (x - W / 2) / focal, py = -(y - H / 2) / focal;
    return norm([b.f[0] + px * b.r[0] + py * b.u[0], b.f[1] + px * b.r[1] + py * b.u[1], b.f[2] + px * b.r[2] + py * b.u[2]]);
  };
  ar.focalFor = function (fovDeg, W, H) { return (Math.max(W, H) / 2) / Math.tan(fovDeg * D2R / 2); };
  ar.angleBetween = function (a, b) { return Math.acos(Math.max(-1, Math.min(1, dot(a, b)))) * R2D; };
  /** the heading correction that makes the object at `objDir` appear where the user tapped `tapDir` (degrees, −180…180) */
  ar.yawFix = function (tapDir, objDir) { var d = ar.dirToAltAz(objDir).az - ar.dirToAltAz(tapDir).az; return ((d + 540) % 360) - 180; };
})(typeof window !== 'undefined' ? window : globalThis);

(function (root) {
  'use strict';
  if (typeof document === 'undefined') return;
  var X = root.Cosmica, astro = X.astro, UI = X.ui, S = X.S, i18n = X.i18n, V = X.views, ar = X.ar, D = root.CosmicaData;
  var t = i18n.t, esc = UI.esc, $ = UI.$;
  var STATE = null;
  ar.state = function () { return STATE; };

  V.ar = function (el) {
    var loc = S.loc, destroyed = false, started = false, raf = 0, sky = null, skyAt = 0, ori = null, gotAbs = false, relative = false, manual = false, look = { az: 180, alt: 35 };
    var yaw = 0, fov = X.store.get('arFov', 65), aligning = false, stream = null, wake = null, size = { W: 0, H: 0, dpr: 1 }, camOn = X.store.get('arCam', true), lastFrame = null, sensorTimer = null;
    var sf = new astro.StarField(D.stars);
    el.innerHTML = '<div class="ar" id="arRoot"><video id="arVid" playsinline muted autoplay></video><canvas id="arCv" aria-label="' + esc(t('ar.aria')) + '"></canvas>' +
      '<div class="ar-top"><a class="btn sm" href="#/sky" id="arBack">← ' + esc(t('ar.back')) + '</a><span class="ar-title">' + esc(t('ar.title')) + '</span>' +
      '<button class="btn sm" id="arCamBtn" aria-pressed="' + camOn + '">' + esc(t('ar.camera')) + '</button><button class="btn sm" id="arAlign" aria-pressed="false">' + esc(t('ar.align')) + '</button></div>' +
      '<div class="ar-bot" id="arInfo"></div>' +
      '<div class="ar-zoom"><label><span class="sr">' + esc(t('ar.zoom')) + '</span><input type="range" id="arFov" min="25" max="100" step="1" value="' + fov + '" aria-label="' + esc(t('ar.zoom')) + '"></label></div>' +
      '<div class="ar-intro" id="arIntro"><div class="card"><h2>' + esc(t('ar.title')) + '</h2><p>' + esc(t('ar.how')) + '</p><ul class="plain sm"><li>' + esc(t('ar.tip1')) + '</li><li>' + esc(t('ar.tip2')) + '</li><li>' + esc(t('ar.tip3')) + '</li></ul>' +
      '<p class="warn sm">☀ ' + esc(t('ar.sun')) + '</p><div class="row wrap"><label class="chk"><input type="checkbox" id="arUseCam"' + (camOn ? ' checked' : '') + '> ' + esc(t('ar.useCam')) + '</label></div>' +
      '<div id="arMsg" class="err" role="alert"></div><button class="btn pri" id="arStart">' + esc(t('ar.start')) + '</button><p class="note">' + esc(t('ar.privacy')) + '</p></div></div></div>';
    var root_ = $('#arRoot', el), cv = $('#arCv', el), ctx = cv.getContext('2d'), vid = $('#arVid', el), info = $('#arInfo', el), msg = $('#arMsg', el);

    var resize = function () {
      var W = root_.clientWidth || innerWidth, H = root_.clientHeight || innerHeight, dpr = Math.min(root.devicePixelRatio || 1, 2.5);
      size = { W: W, H: H, dpr: dpr }; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var screenAngle = function () { var a = (root.screen && screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (typeof root.orientation === 'number' ? root.orientation : 0); return ((a % 360) + 360) % 360; };
    var basis = function () {
      if (ori && !manual) return ar.basis(ori.a, ori.b, ori.g, screenAngle(), yaw);
      return ar.basisLook(look.az + yaw, look.alt);
    };

    /* ---- the sky for this moment (refreshed every 2 s) */
    var refreshSky = function () {
      var now = Date.now(); sf.project(now, loc); var pr = astro.makeProjector(now, loc), o = {}, B = astro.bodies(now, loc), lim = 5.0, stars = [], i, j, k;
      for (i = 0; i < sf.n; i++) { var s = D.stars[i], mag = s[2]; if (mag > lim) break; if (sf.alt[i] < -12) continue; stars.push({ d: ar.altAzToDir(sf.alt[i], sf.az[i]), mag: mag, bv: s[3], hip: s[4], alt: sf.alt[i], az: sf.az[i] }); }
      var lines = [];
      for (i = 0; i < D.cons.length; i++) for (j = 0; j < D.cons[i].l.length; j++) { var seg = D.cons[i].l[j], prev = null; for (k = 0; k < seg.length; k++) { pr(seg[k][0], seg[k][1], o); var d = ar.altAzToDir(o.alt, o.az); if (prev && o.alt > -12) lines.push([prev, d]); prev = o.alt > -12 ? d : null; } }
      var cons = []; for (i = 0; i < D.cons.length; i++) { var c = D.cons[i]; if (!c.l.length) continue; pr(c.c[0], c.c[1], o); if (o.alt > -5) cons.push({ d: ar.altAzToDir(o.alt, o.az), name: c.en }); }
      var bodies = [{ id: 'sun', d: ar.altAzToDir(B.sun.alt, B.sun.az), alt: B.sun.alt, az: B.sun.az, mag: -26 }, { id: 'moon', d: ar.altAzToDir(B.moon.alt, B.moon.az), alt: B.moon.alt, az: B.moon.az, mag: -10, illum: B.moon.illum }];
      B.planets.forEach(function (p) { bodies.push({ id: p.id, d: ar.altAzToDir(p.alt, p.az), alt: p.alt, az: p.az, mag: p.mag }); });
      sky = { stars: stars, lines: lines, cons: cons, bodies: bodies, sunAlt: B.sun.alt, at: now }; skyAt = now;
    };

    var COL = X.planetColor || {};
    var nameOf = function (b) { return b.id === 'sun' ? t('sun') : b.id === 'moon' ? t('moon') : t('pl.' + b.id).replace(/\s*\(.*\)/, ''); };
    var dirWord = function (az) { return t('dir8.' + astro.dir8(az)); };

    /* ---- draw one frame */
    var frame = function () {
      raf = 0; if (destroyed) return;
      if (!sky || Date.now() - skyAt > 2000) { try { refreshSky(); } catch (e) { if (root.console) console.error(e); } }
      var W = size.W, H = size.H, b = basis(), focal = ar.focalFor(fov, W, H), i, p, q;
      ctx.clearRect(0, 0, W, H);
      var night = sky.sunAlt < -6;
      if (!stream) { ctx.fillStyle = night ? '#030612' : sky.sunAlt > 0 ? '#27456e' : '#0c1634'; ctx.fillRect(0, 0, W, H); }
      /* horizon + below it a little darker so you know where the ground is */
      ctx.strokeStyle = 'rgba(120,255,170,.75)'; ctx.lineWidth = 2; ctx.beginPath(); var pen = false;
      for (var az = 0; az <= 360; az += 4) { p = ar.project(ar.altAzToDir(0, az), b, focal, W, H); if (!p) { pen = false; continue; } if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); pen = true; }
      ctx.stroke();
      ctx.font = '700 15px Poppins, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#9dffc4';
      [['n', 0], ['e', 90], ['s', 180], ['w', 270], ['ne', 45], ['se', 135], ['sw', 225], ['nw', 315]].forEach(function (c) {
        var pp = ar.project(ar.altAzToDir(2, c[1]), b, focal, W, H); if (pp) { ctx.globalAlpha = c[0].length === 1 ? 1 : 0.6; ctx.fillText(c[0].length === 1 ? t('dir.' + c[0]) : c[0].toUpperCase(), pp.x, pp.y - 8); }
      }); ctx.globalAlpha = 1;
      /* altitude rings every 30° */
      ctx.strokeStyle = 'rgba(150,170,230,.25)'; ctx.lineWidth = 1; ctx.fillStyle = 'rgba(190,205,255,.7)'; ctx.font = '500 11px Poppins, sans-serif';
      [30, 60].forEach(function (alt) { ctx.beginPath(); var pn = false; for (var z = 0; z <= 360; z += 5) { var pp = ar.project(ar.altAzToDir(alt, z), b, focal, W, H); if (!pp) { pn = false; continue; } if (pn) ctx.lineTo(pp.x, pp.y); else ctx.moveTo(pp.x, pp.y); pn = true; } ctx.stroke(); var lp = ar.project(ar.altAzToDir(alt, ar.dirToAltAz(b.f).az), b, focal, W, H); if (lp) ctx.fillText(alt + '°', lp.x, lp.y - 4); });
      /* constellation lines */
      ctx.strokeStyle = 'rgba(140,170,255,.55)'; ctx.lineWidth = 1.2; ctx.beginPath();
      sky.lines.forEach(function (l) { var a = ar.project(l[0], b, focal, W, H), c = ar.project(l[1], b, focal, W, H); if (a && c) { ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); } }); ctx.stroke();
      /* stars */
      var lim = night ? 5.0 : sky.sunAlt < -1 ? 3.0 : 0.5, sc = Math.min(1.6, Math.max(0.8, size.W / 400)), named = [];
      sky.stars.forEach(function (s) {
        if (s.mag > lim) return; p = ar.project(s.d, b, focal, W, H); if (!p || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) return;
        var r = Math.max(0.9, (3.4 - 0.55 * s.mag)) * sc; ctx.fillStyle = s.bv < 0.2 ? '#cfe0ff' : s.bv < 0.7 ? '#fff6e6' : s.bv < 1.2 ? '#ffe2aa' : '#ffb98a'; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill();
        if (s.mag <= 2.3 && D.names[s.hip]) named.push([D.names[s.hip][0], p.x, p.y, s]);
      });
      ctx.font = '500 12px Poppins, sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(225,232,255,.9)'; named.forEach(function (n) { ctx.fillText(n[0], n[1] + 7, n[2] - 5); });
      ctx.font = '600 11px Poppins, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(140,170,255,.75)';
      sky.cons.forEach(function (c) { var pp = ar.project(c.d, b, focal, W, H); if (pp && pp.x > 0 && pp.x < W && pp.y > 0 && pp.y < H) ctx.fillText(c.name.toUpperCase(), pp.x, pp.y); });
      /* Sun, Moon, planets */
      sky.bodies.forEach(function (bd) {
        if (bd.alt < -2) return; p = ar.project(bd.d, b, focal, W, H); if (!p || p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) return;
        var col = bd.id === 'sun' ? '#ffd66b' : bd.id === 'moon' ? '#f1eedc' : (COL[bd.id] || '#fff'), r = bd.id === 'sun' || bd.id === 'moon' ? 11 : Math.max(4, 7 - bd.mag * 0.8);
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3); g.addColorStop(0, col); g.addColorStop(0.3, col); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.globalAlpha = 0.55; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r * 3, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.font = '700 13px Poppins, sans-serif'; ctx.textAlign = 'left'; ctx.fillStyle = col; ctx.fillText(nameOf(bd), p.x + r + 6, p.y + 4);
      });
      /* crosshair */
      ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(W / 2, H / 2, 14, 0, 7); ctx.moveTo(W / 2 - 22, H / 2); ctx.lineTo(W / 2 - 8, H / 2); ctx.moveTo(W / 2 + 8, H / 2); ctx.lineTo(W / 2 + 22, H / 2); ctx.moveTo(W / 2, H / 2 - 22); ctx.lineTo(W / 2, H / 2 - 8); ctx.moveTo(W / 2, H / 2 + 8); ctx.lineTo(W / 2, H / 2 + 22); ctx.stroke();
      /* what is in the middle? */
      var aa = ar.dirToAltAz(b.f), best = null, bd2 = 7;
      sky.bodies.forEach(function (x) { if (x.alt < -2) return; var a = ar.angleBetween(b.f, x.d); if (a < bd2) { bd2 = a; best = nameOf(x); } });
      if (!best) sky.stars.forEach(function (s) { if (s.mag > 3.2 || !D.names[s.hip]) return; var a = ar.angleBetween(b.f, s.d); if (a < Math.min(bd2, 5)) { bd2 = a; best = D.names[s.hip][0]; } });
      var cn = null, cd = 1e9; sky.cons.forEach(function (c) { var a = ar.angleBetween(b.f, c.d); if (a < cd) { cd = a; cn = c.name; } });
      lastFrame = { az: aa.az, alt: aa.alt, looking: best, con: cn && cd < 25 ? cn : null };
      info.innerHTML = (aligning ? '<b>' + esc(t('ar.alignNow')) + '</b>' : '<b>' + esc(t('ar.pointing', { dir: dirWord(aa.az), az: Math.round(aa.az), alt: Math.round(aa.alt) })) + '</b>' +
        (best ? '<span>' + esc(t('ar.nearCenter', { name: best })) + '</span>' : lastFrame.con ? '<span>' + esc(t('ar.inCon', { name: lastFrame.con })) + '</span>' : '')) +
        (manual ? '<small>' + esc(t('ar.manual')) + '</small>' : relative ? '<small>' + esc(t('ar.relative')) + '</small>' : '');
      STATE = { started: started, az: aa.az, alt: aa.alt, fov: fov, manual: manual, sensor: !!ori, absolute: gotAbs, yaw: yaw, camera: !!stream, stars: sky.stars.length, lines: sky.lines.length, looking: best, con: lastFrame.con, aligning: aligning };
      raf = root.requestAnimationFrame(frame);
    };

    /* ---- sensors */
    var onOri = function (ev) {
      if (ev.type === 'deviceorientation' && gotAbs) return;
      if (ev.type === 'deviceorientationabsolute') gotAbs = true;
      var a = ev.alpha, bt = ev.beta, g = ev.gamma; if (a == null || bt == null || g == null) return;
      if (typeof ev.webkitCompassHeading === 'number') { a = 360 - ev.webkitCompassHeading; relative = false; }
      else if (ev.type === 'deviceorientation' && !ev.absolute) relative = true; else relative = false;
      ori = { a: a, b: bt, g: g }; manual = false; clearTimeout(sensorTimer);
    };
    var askOrientation = function () {
      var DO = root.DeviceOrientationEvent;
      if (DO && typeof DO.requestPermission === 'function') return DO.requestPermission().then(function (r) { return r === 'granted'; }).catch(function () { return false; });
      return Promise.resolve(true);
    };
    var startCamera = function () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.reject(new Error('nocam'));
      return navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false }).then(function (s) {
        if (destroyed) { s.getTracks().forEach(function (x) { x.stop(); }); return; }
        stream = s; vid.srcObject = s; vid.style.display = 'block'; var pl = vid.play(); if (pl && pl.catch) pl.catch(function () { /* autoplay blocked: still shows */ });
      });
    };
    var stopCamera = function () { if (stream) { stream.getTracks().forEach(function (x) { x.stop(); }); stream = null; } vid.srcObject = null; vid.style.display = 'none'; };

    var begin = function () {
      started = true; $('#arIntro', el).hidden = true; msg.textContent = '';
      root.addEventListener('deviceorientationabsolute', onOri, true); root.addEventListener('deviceorientation', onOri, true);
      sensorTimer = setTimeout(function () { if (!ori) manual = true; }, 1500);
      try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () { }); } catch (e) { /* optional */ }
      if (!raf) raf = root.requestAnimationFrame(frame);
    };
    $('#arStart', el).onclick = function () {
      camOn = $('#arUseCam', el).checked; X.store.set('arCam', camOn); $('#arCamBtn', el).setAttribute('aria-pressed', camOn);
      askOrientation().then(function (ok) {
        if (!ok) { manual = true; msg.textContent = t('ar.noPerm'); }
        begin();
        if (camOn) startCamera().catch(function () { UI.toast(t('ar.noCam'), 5000); });
      });
    };
    $('#arCamBtn', el).onclick = function () {
      camOn = !camOn; X.store.set('arCam', camOn); this.setAttribute('aria-pressed', camOn);
      if (!started) return; if (camOn) startCamera().catch(function () { UI.toast(t('ar.noCam'), 5000); camOn = false; $('#arCamBtn', el).setAttribute('aria-pressed', false); }); else stopCamera();
    };
    $('#arAlign', el).onclick = function () { aligning = !aligning; this.setAttribute('aria-pressed', aligning); if (!aligning) { yaw = 0; UI.toast(t('ar.alignReset')); } else UI.toast(t('ar.alignHint'), 5000); };
    $('#arFov', el).oninput = function () { fov = +this.value; X.store.set('arFov', fov); };

    /* ---- touch: tap to align, drag to look around when there is no sensor, wheel to zoom */
    var drag = null;
    cv.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, az: look.az, alt: look.alt, moved: false }; try { cv.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ } });
    cv.addEventListener('pointermove', function (e) {
      if (!drag) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
      if (manual || !ori) { var deg = fov / Math.max(size.W, size.H); look.az = ((drag.az - dx * deg) % 360 + 360) % 360; look.alt = Math.max(-89, Math.min(89, drag.alt + dy * deg)); }
    });
    cv.addEventListener('pointerup', function (e) {
      var d = drag; drag = null; if (!d || d.moved || !aligning || !sky) return;
      var rect = cv.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top, b = basis(), focal = ar.focalFor(fov, size.W, size.H), tap = ar.unproject(x, y, b, focal, size.W, size.H);
      var cands = sky.bodies.filter(function (q) { return q.id !== 'sun' && q.alt > 0; }).concat(sky.stars.filter(function (s) { return s.mag <= 2 && s.alt > 0; })), best = null, bd = 25;
      cands.forEach(function (c) { var a = ar.angleBetween(tap, c.d); if (a < bd) { bd = a; best = c; } });
      if (!best) { UI.toast(t('ar.alignNone'), 3500); return; }
      yaw += ar.yawFix(tap, best.d); yaw = ((yaw + 540) % 360) - 180; aligning = false; $('#arAlign', el).setAttribute('aria-pressed', false);
      UI.toast(t('ar.aligned', { name: best.id ? nameOf(best) : (D.names[best.hip] ? D.names[best.hip][0] : 'HIP ' + best.hip) }), 4000);
    });
    cv.addEventListener('wheel', function (e) { e.preventDefault(); fov = Math.max(25, Math.min(100, fov + (e.deltaY > 0 ? 4 : -4))); $('#arFov', el).value = fov; X.store.set('arFov', fov); }, { passive: false });

    resize(); root.addEventListener('resize', resize); root.addEventListener('orientationchange', resize);
    root.__arSetYaw = null;
    STATE = { started: false };
    return function () {
      destroyed = true; if (raf) root.cancelAnimationFrame(raf); clearTimeout(sensorTimer); stopCamera();
      root.removeEventListener('deviceorientationabsolute', onOri, true); root.removeEventListener('deviceorientation', onOri, true); root.removeEventListener('resize', resize); root.removeEventListener('orientationchange', resize);
      if (wake && wake.release) { try { wake.release(); } catch (e) { /* ignore */ } } STATE = null;
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
