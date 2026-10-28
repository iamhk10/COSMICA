# COSMICA 

Tonight's Moon, Sun, planets and a live star map for your place. Works **online and offline**, installable as an app (PWA), English + Hinglish.
Developer: **ΣTΣЯПITY**.

## Run it
It is a static site — no build step.
- **GitHub Pages / any static host:** upload the whole folder and open `index.html`'s URL. (Service worker + install need `https://`; `localhost` also works.)
- **Locally:** `python3 -m http.server 8000` in this folder, then open http://localhost:8000
- Opening `index.html` straight from disk (file://) shows the app, but offline caching and "Install" will not work.

## When you change something
Bump `VERSION` in `sw.js` (e.g. `cosmica-v1.0.1`) so installed copies pick up the update. New files must also be added to the `FILES` list there — `node tests/files.test.js` tells you if you forget.

## Tests (Node, no installs needed)
```
node tests/astro.test.js   # sky maths vs known real-world facts
node tests/i18n.test.js    # every UI text exists in English and Hinglish
node tests/files.test.js   # offline cache list is complete
```

## Where things are
- `js/astro.js` sky maths (offline) · `js/chart.js` star map canvas · `js/views.js` screens · `js/app.js` start-up, location, router
- `js/i18n.js` interface text (en + Hinglish) · `js/data/*.js` cities, history cards, facts, glossary, star catalogue
- Add a fact: append to the END of `js/data/facts.js` (the fact of the day is picked by date, so reordering changes it).

## Credits & licences
Astronomy Engine (MIT) · d3-celestial star/constellation data (BSD-3) · Open-Meteo geocoding for online city search · Poppins font (OFL). Licence files are in `js/vendor/` and `fonts/`.

## Privacy
No accounts, ads or trackers. Saved place and settings stay in the browser. Only the city-search text is sent (to Open-Meteo) when you search while online.
