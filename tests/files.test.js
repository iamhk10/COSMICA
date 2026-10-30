/* Offline safety: everything index.html loads must be in the service worker's list, and every listed file must exist. */
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
let bad = 0, n = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('FAIL ' + m); } };
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), list = [...sw.match(/const FILES = \[([\s\S]*?)\];/)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
list.forEach(f => f !== './' && ok(fs.existsSync(path.join(root, f)), 'listed in sw.js but missing: ' + f));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
[...html.matchAll(/(?:src|href)="([^"#:]+?)"/g)].map(m => m[1]).filter(f => !f.startsWith('http')).forEach(f => ok(list.includes(f), 'index.html uses but sw.js does not cache: ' + f));
[...fs.readFileSync(path.join(root, 'css/app.css'), 'utf8').matchAll(/url\(\.\.\/([^)]+)\)/g)].forEach(m => ok(list.includes(m[1]), 'css uses but sw.js does not cache: ' + m[1]));
const mf = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
mf.icons.forEach(i => ok(list.includes(i.src), 'manifest icon not cached: ' + i.src)); ok(list.includes(mf.start_url.replace('./', '')), 'start_url not cached');
// no personal name anywhere in the shipped files
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? (e.name === 'node_modules' || e.name === 'vendor' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]);
walk(root).filter(f => !f.endsWith('files.test.js')).filter(f => /\.(js|html|css|json|webmanifest|md|svg)$/.test(f)).forEach(f => ok(!/Himanshu|Sah\b/.test(fs.readFileSync(f, 'utf8')), 'personal name found in ' + path.relative(root, f)));
console.log(bad ? 'files: ' + bad + ' FAILED of ' + n : 'files: all ' + n + ' checks passed'); process.exit(bad ? 1 : 0);
