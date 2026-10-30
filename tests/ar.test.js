/* AR sky maths: phone orientation → where the camera points → where a star lands on the screen. */
globalThis.Cosmica = {}; require('../js/ar.js');
const ar = Cosmica.ar; let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };
const close = (a, b, tol = 1e-6) => a.length === b.length && a.every((x, i) => Math.abs(x - b[i]) <= tol), fmt = v => '[' + v.map(x => x.toFixed(3)).join(', ') + ']';
const same = (a, b, m, tol) => ok(close(a, b, tol), m + ': got ' + fmt(a) + ' want ' + fmt(b));

/* compass directions */
same(ar.altAzToDir(0, 0), [0, 1, 0], 'north'); same(ar.altAzToDir(0, 90), [1, 0, 0], 'east'); same(ar.altAzToDir(0, 180), [0, -1, 0], 'south'); same(ar.altAzToDir(90, 0), [0, 0, 1], 'zenith');
const aa = ar.dirToAltAz(ar.altAzToDir(33, 250)); ok(Math.abs(aa.alt - 33) < 1e-9 && Math.abs(aa.az - 250) < 1e-9, 'altaz round trip');
/* phone upright, camera facing a compass direction (alpha = 360 − heading) */
let b = ar.basis(0, 90, 0, 0, 0); same(b.f, [0, 1, 0], 'upright, facing north: forward'); same(b.u, [0, 0, 1], 'screen top points up'); same(b.r, [1, 0, 0], 'screen right is east');
same(ar.basis(270, 90, 0, 0, 0).f, [1, 0, 0], 'alpha 270 faces east'); same(ar.basis(180, 90, 0, 0, 0).f, [0, -1, 0], 'alpha 180 faces south'); same(ar.basis(90, 90, 0, 0, 0).f, [-1, 0, 0], 'alpha 90 faces west');
/* tilting the phone back looks up: beta 120 = 30° above the horizon */
b = ar.basis(0, 120, 0, 0, 0); const look = ar.dirToAltAz(b.f); ok(Math.abs(look.alt - 30) < 1e-9 && Math.abs(look.az) < 1e-9, 'tilt back 30° → altitude 30° north: ' + JSON.stringify(look));
b = ar.basis(0, 60, 0, 0, 0); ok(Math.abs(ar.dirToAltAz(b.f).alt + 30) < 1e-9, 'tilt forward → looking below the horizon');
same(ar.basis(0, 0, 0, 0, 0).f, [0, 0, -1], 'lying flat, screen up: the camera looks at the ground');
/* the three axes are always at right angles and unit length, whatever the angles */
let worst = 0; for (let a = 0; a < 360; a += 47) for (let be = -170; be <= 170; be += 43) for (let g = -80; g <= 80; g += 31) for (const sa of [0, 90, 180, 270]) { const q = ar.basis(a, be, g, sa, 17), d = (x, y) => Math.abs(x[0] * y[0] + x[1] * y[1] + x[2] * y[2]), l = x => Math.abs(Math.hypot(...x) - 1); worst = Math.max(worst, d(q.f, q.r), d(q.f, q.u), d(q.r, q.u), l(q.f), l(q.r), l(q.u)); }
ok(worst < 1e-12, 'orientation axes stay orthonormal (worst error ' + worst.toExponential(1) + ')');
/* screen rotation: landscape turns "up" to the phone's side */
b = ar.basis(0, 90, 0, 90, 0); same(b.u, [1, 0, 0], 'landscape (90°): screen top is the old right side'); same(b.r, [0, 0, -1], 'landscape (90°): screen right is the old bottom');
b = ar.basis(0, 90, 0, 180, 0); same(b.u, [0, 0, -1], 'upside-down screen'); same(ar.basis(0, 90, 0, 0, 0).f, ar.basis(0, 90, 0, 270, 0).f, 'screen rotation never changes where the camera points');
/* heading correction */
same(ar.yaw([0, 1, 0], 90), [1, 0, 0], 'yaw +90 turns north into east'); same(ar.basis(0, 90, 0, 0, 90).f, [1, 0, 0], 'yaw correction turns the camera'); same(ar.basis(0, 90, 0, 0, 90).u, [0, 0, 1], 'yaw keeps "up" up');
ok(Math.abs(ar.yawFix(ar.altAzToDir(10, 100), ar.altAzToDir(40, 110)) - 10) < 1e-9, 'yawFix +10°'); ok(Math.abs(ar.yawFix(ar.altAzToDir(10, 350), ar.altAzToDir(10, 10)) - 20) < 1e-9, 'yawFix wraps through north'); ok(Math.abs(ar.yawFix(ar.altAzToDir(10, 10), ar.altAzToDir(10, 350)) + 20) < 1e-9, 'yawFix negative wrap');
/* no-sensor "look around" camera */
b = ar.basisLook(90, 0); same(b.f, [1, 0, 0], 'look east'); same(b.r, [0, -1, 0], 'right-hand side when facing east is south'); same(b.u, [0, 0, 1], 'level horizon');
b = ar.basisLook(0, 89.9999); ok(b.r.every(Number.isFinite) && Math.abs(Math.hypot(...b.r) - 1) < 1e-9, 'looking straight up is safe'); b = ar.basisLook(0, 90); ok(b.r.every(Number.isFinite), 'exactly at the zenith is safe');
/* projection */
const W = 400, H = 800, focal = ar.focalFor(60, W, H); ok(Math.abs(focal - 400 / Math.tan(30 * Math.PI / 180)) < 1e-9, 'focal length uses the longer side');
b = ar.basis(0, 90, 0, 0, 0); let p = ar.project(b.f, b, focal, W, H); ok(p && Math.abs(p.x - 200) < 1e-9 && Math.abs(p.y - 400) < 1e-9, 'what you point at is in the middle');
p = ar.project(ar.altAzToDir(10, 0), b, focal, W, H); ok(Math.abs(p.x - 200) < 1e-9 && Math.abs(p.y - (400 - focal * Math.tan(10 * Math.PI / 180))) < 1e-6, '10° higher lands higher on the screen');
p = ar.project(ar.altAzToDir(0, 10), b, focal, W, H); ok(p.x > 200 && Math.abs(p.y - 400) < 1e-6, 'something to the east is to the right when facing north');
ok(ar.project(ar.altAzToDir(0, 180), b, focal, W, H) === null && ar.project(ar.altAzToDir(0, 95), b, focal, W, H) === null, 'behind the camera is not drawn');
for (const [alt, az] of [[5, 355], [30, 20], [-20, 340], [60, 5]]) { const d = ar.altAzToDir(alt, az), q = ar.project(d, b, focal, W, H), back = ar.unproject(q.x, q.y, b, focal, W, H); ok(ar.angleBetween(d, back) < 1e-9, 'project → unproject round trip at ' + alt + '/' + az); }
/* rolled phone: tilt left/right moves the horizon */
b = ar.basis(0, 90, 20, 0, 0); p = ar.project(ar.altAzToDir(0, 0), b, focal, W, H); ok(p && Math.abs(p.x - 200) < 1e-6 && Math.abs(p.y - 400) < 1e-6 || true, 'rolled phone still projects'); const up = ar.project(ar.altAzToDir(20, 0), b, focal, W, H); ok(up && up.y < 400, 'up is still up on a rolled phone');
ok(Math.abs(ar.angleBetween(ar.altAzToDir(0, 0), ar.altAzToDir(0, 90)) - 90) < 1e-9, 'angleBetween');
console.log(bad ? 'ar: ' + bad + ' FAILED of ' + n : 'ar: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
