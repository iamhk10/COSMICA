/* =========================================================================
   Cosmica — js/i18n.js : UI text in English (default) and Hinglish (Hindi written in English letters).
   t('key', {name: value}) fills {name} placeholders. A missing key falls back to English, then to the key itself.
   The history cards, facts and glossary carry their own en/hi text in js/data/*.js.
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {};

  var en = {
    skip: 'Skip to content', offline: 'Offline', install: 'Install', chooseLoc: 'Choose location', nightMode: 'Night (red) mode',
    'nav.today': 'Today', 'nav.sky': 'Sky', 'nav.learn': 'Learn', 'nav.about': 'About',
    'dir.n': 'N', 'dir.e': 'E', 'dir.s': 'S', 'dir.w': 'W',
    'dir8.n': 'north', 'dir8.ne': 'north-east', 'dir8.e': 'east', 'dir8.se': 'south-east', 'dir8.s': 'south', 'dir8.sw': 'south-west', 'dir8.w': 'west', 'dir8.nw': 'north-west',
    sun: 'Sun', moon: 'Moon', star: 'Star',
    'pl.mercury': 'Mercury', 'pl.venus': 'Venus', 'pl.mars': 'Mars', 'pl.jupiter': 'Jupiter', 'pl.saturn': 'Saturn', 'pl.uranus': 'Uranus', 'pl.neptune': 'Neptune',
    'phase.new': 'New Moon', 'phase.waxcres': 'Waxing crescent', 'phase.firstq': 'First quarter', 'phase.waxgib': 'Waxing gibbous', 'phase.full': 'Full Moon',
    'phase.wangib': 'Waning gibbous', 'phase.lastq': 'Last quarter', 'phase.wancres': 'Waning crescent',
    'st.good': 'Well placed', 'st.low': 'Low in the sky', 'st.none': 'Not visible tonight', 'st.sun': 'Lost in the Sun’s glare',
    'eye.eye': 'Naked eye', 'eye.binoc': 'Needs binoculars', 'eye.scope': 'Needs a telescope',

    prevDay: 'Previous day', nextDay: 'Next day', pickDate: 'Pick a date', backToToday: 'Back to today',
    tonightIn: 'Tonight in {place}', nightOf: 'The night in {place}',
    'sum.moon': '{phase}, {illum}% lit.', 'sum.moonNone': 'The Moon stays below the horizon all night — a dark sky for stars.',
    'sum.moonAll': 'It is up all night, so faint stars will be washed out.', 'sum.moonSets': 'It sets at {time}.', 'sum.moonRises': 'It rises at {time}.',
    'sum.dark': 'Fully dark from {from} to {to} ({len}).', 'sum.noDark': 'The sky never gets fully dark tonight at this latitude.',
    'sum.planets': 'Planets to look for: {names}.', 'sum.noPlanets': 'No bright planet is well placed tonight.',
    openSky: 'Open the sky map', planetsTonight: 'Planets tonight', showSky: 'Show in sky',
    planetNote: 'Times are for the best moment of the night. “Needs binoculars / telescope” planets are too faint for the naked eye.',
    'pl.glare': 'Too close to the Sun to see.', 'pl.below': 'Stays below the horizon during the dark hours.',
    'pl.best': 'Best at {time}, {dir}, {alt} high', 'pl.riseSet': 'Rises {rise} · sets {set}',
    sunrise: 'Sunrise', sunset: 'Sunset', dayLen: 'Day length', solarNoon: 'Solar noon', civilEnd: 'Twilight ends', darkBegins: 'Fully dark from',
    'sun.polarDay': 'The Sun does not set today at this place.', 'sun.polarNight': 'The Sun does not rise today at this place.',
    moonrise: 'Moonrise', moonset: 'Moonset', nextFull: 'Next Full Moon', nextNew: 'Next New Moon', nextQuarter: 'Next quarter', distance: 'Distance',
    illum: '{n}% lit', age: '{n} days old', historyCard: 'History card',
    factOfDay: 'Fact of the day', moreFacts: 'More facts', nextFact: 'Next fact', factsCount: '{n} facts', all: 'All',
    calcError: 'Something went wrong while calculating the sky. Please pick the place again.',

    skyAria: 'Map of the sky as seen from your place. Tap a star or planet to learn about it.', timeSlider: 'Time of day',
    now: 'Now', midnight: 'Mid-night', minus1h: 'Back one hour', plus1h: 'Forward one hour', play: 'Play', pause: 'Pause', layers: 'Show on map',
    'layer.lines': 'Constellation lines', 'layer.names': 'Names', 'layer.grid': 'Altitude rings', 'layer.mw': 'Milky Way',
    skyHint: 'Top of the map is straight overhead and the edge is the horizon. Hold the map up and face the direction you want — east is on the left, as in the real sky.',
    'sky.day': 'Daylight', 'sky.civil': 'Twilight', 'sky.naut': 'Deep twilight', 'sky.astro': 'Last light', 'sky.dark': 'Dark sky',
    magLine: 'Brightness {m}', inCon: 'in {c}', close: 'Close', altitude: 'Height', direction: 'Direction', aboveHor: 'Above the horizon right now.', belowHor: 'Below the horizon at this time.',

    'learn.history': 'History', 'learn.facts': 'Facts', 'learn.glossary': 'Glossary',
    historyLead: 'The story behind each world: names, discoveries, culture and missions.', notFound: 'Nothing here.', sources: 'Sources',
    'cat.sun': 'Sun', 'cat.earth': 'Earth', 'cat.moon': 'Moon', 'cat.planets': 'Planets', 'cat.stars': 'Stars', 'cat.universe': 'Universe', 'cat.missions': 'Missions', 'cat.life': 'Life',
    glossSearch: 'Search a word…', noResults: 'No matches.',

    'about.tag': 'Your sky, offline or online.', 'about.what': 'Cosmica shows tonight’s Moon, Sun, planets and stars for your place. The sky is calculated on your device, so it keeps working without internet.',
    installIos: 'On iPhone/iPad: tap Share, then “Add to Home Screen”.',
    privTitle: 'Your data is safe',
    'priv.p1': 'No accounts, no ads, no trackers. Cosmica does not collect your personal data.',
    'priv.p2': 'The sky is calculated on your own device. Your location is not sent anywhere for that, and it works offline.',
    'priv.p3': 'Your chosen place and settings are saved only in this browser. “Clear my data” removes them.',
    'priv.p4': 'Only when you type in the city search while online, the text you typed goes to the free Open-Meteo geocoding service to find the place. “Use my current location” is read by your browser and stays on your device.',
    'priv.p5': 'Links to NASA, Wikipedia and others open their own websites, which have their own privacy rules.',
    clearData: 'Clear my data', clearConfirm: 'Remove your saved place and settings from this browser?', cleared: 'Data cleared',
    disclaimerTitle: 'Good to know', disclaimer: 'Positions are calculated and accurate for sky-watching, not for navigation. Never look at the Sun directly or through binoculars or a telescope without proper solar filters.',
    credits: 'Credits', 'cr.engine': 'sky maths', 'cr.stars': 'star and constellation data', 'cr.geo': 'online city search', developer: 'Developed by',
    timeFmt: 'Time format', h12: '12-hour', h24: '24-hour', settings: 'Settings',

    searchCity: 'Search a city or town…', onlineTag: 'online', offlineSearch: 'You are offline — showing saved cities only.', searching: 'Searching online…',
    searchFail: 'Online search is not available right now — showing saved cities.', useMyLoc: 'Use my current location', enterCoords: 'Enter coordinates',
    latitude: 'Latitude', longitude: 'Longitude', timezone: 'Time zone', useThis: 'Use this place', geoNo: 'This browser cannot give your location.', locating: 'Finding your location…',
    geoDenied: 'Could not get your location. You can search a city instead.', yourPlace: 'Your location', nearCity: 'near {c}', customPlace: 'Custom place',
    badCoords: 'Enter a latitude between −90 and 90 and a longitude between −180 and 180.', badTz: 'That time zone name is not valid (example: Asia/Kolkata).',
    installed: 'Cosmica installed', updateReady: 'Update ready — reopen the app to use it.', offlineReady: 'Ready to work offline',
    defaultLoc: 'Showing {place}. Tap the place name at the top to change it.'
  };

  var hi = {
    skip: 'Content par jao', offline: 'Offline', install: 'Install', chooseLoc: 'Jagah chuno', nightMode: 'Raat (laal) mode',
    'nav.today': 'Aaj', 'nav.sky': 'Aasmaan', 'nav.learn': 'Seekho', 'nav.about': 'Jaankari',
    'dir.n': 'N', 'dir.e': 'E', 'dir.s': 'S', 'dir.w': 'W',
    'dir8.n': 'uttar', 'dir8.ne': 'uttar-poorv', 'dir8.e': 'poorv', 'dir8.se': 'dakshin-poorv', 'dir8.s': 'dakshin', 'dir8.sw': 'dakshin-paschim', 'dir8.w': 'paschim', 'dir8.nw': 'uttar-paschim',
    sun: 'Surya', moon: 'Chandrama', star: 'Tara',
    'pl.mercury': 'Budh', 'pl.venus': 'Shukra', 'pl.mars': 'Mangal', 'pl.jupiter': 'Brihaspati', 'pl.saturn': 'Shani', 'pl.uranus': 'Arun (Uranus)', 'pl.neptune': 'Varun (Neptune)',
    'phase.new': 'Amavasya', 'phase.waxcres': 'Badhta crescent', 'phase.firstq': 'Pehli quarter', 'phase.waxgib': 'Badhta gibbous', 'phase.full': 'Poornima',
    'phase.wangib': 'Ghatta gibbous', 'phase.lastq': 'Aakhri quarter', 'phase.wancres': 'Ghatta crescent',
    'st.good': 'Achhi jagah par', 'st.low': 'Aasmaan me neeche', 'st.none': 'Aaj raat nahi dikhega', 'st.sun': 'Surya ki chamak me kho gaya',
    'eye.eye': 'Aankh se dikhta hai', 'eye.binoc': 'Binoculars chahiye', 'eye.scope': 'Telescope chahiye',

    prevDay: 'Pichla din', nextDay: 'Agla din', pickDate: 'Tareekh chuno', backToToday: 'Aaj par wapas',
    tonightIn: '{place} me aaj raat', nightOf: '{place} me raat',
    'sum.moon': '{phase}, {illum}% roshan.', 'sum.moonNone': 'Chandrama poori raat horizon ke neeche rahega — taron ke liye andhera aasmaan.',
    'sum.moonAll': 'Ye poori raat upar rahega, isliye halke tare phike dikhenge.', 'sum.moonSets': 'Ye {time} par doobega.', 'sum.moonRises': 'Ye {time} par ugega.',
    'sum.dark': '{from} se {to} tak poora andhera ({len}).', 'sum.noDark': 'Is latitude par aaj raat aasmaan poora andhera nahi hota.',
    'sum.planets': 'Dekhne layak grah: {names}.', 'sum.noPlanets': 'Aaj raat koi chamakdaar grah achhi jagah par nahi hai.',
    openSky: 'Sky map kholo', planetsTonight: 'Aaj raat ke grah', showSky: 'Aasmaan me dikhao',
    planetNote: 'Samay raat ke sabse achhe pal ka hai. “Binoculars / telescope chahiye” wale grah aankh se dekhne ke liye bahut halke hain.',
    'pl.glare': 'Surya ke bahut paas, dikhna mushkil.', 'pl.below': 'Andhere ke ghanton me horizon ke neeche rahega.',
    'pl.best': '{time} par sabse achha, {dir} me, {alt} ooncha', 'pl.riseSet': 'Udai {rise} · ast {set}',
    sunrise: 'Suryoday', sunset: 'Suryast', dayLen: 'Din ki lambai', solarNoon: 'Solar noon', civilEnd: 'Twilight khatam', darkBegins: 'Poora andhera',
    'sun.polarDay': 'Aaj is jagah par Surya nahi doobta.', 'sun.polarNight': 'Aaj is jagah par Surya nahi ugta.',
    moonrise: 'Chandrodaya', moonset: 'Chandra-ast', nextFull: 'Agli poornima', nextNew: 'Agli amavasya', nextQuarter: 'Agli quarter', distance: 'Doori',
    illum: '{n}% roshan', age: '{n} din purana', historyCard: 'Itihaas card',
    factOfDay: 'Aaj ka fact', moreFacts: 'Aur facts', nextFact: 'Agla fact', factsCount: '{n} facts', all: 'Sab',
    calcError: 'Aasmaan calculate karte waqt kuch gadbad ho gayi. Kripya jagah dobara chuno.',

    skyAria: 'Aapki jagah se dikhta aasmaan ka naksha. Kisi tare ya grah par tap karke uske baare me jaano.', timeSlider: 'Din ka samay',
    now: 'Abhi', midnight: 'Aadhi raat', minus1h: 'Ek ghanta peeche', plus1h: 'Ek ghanta aage', play: 'Chalao', pause: 'Roko', layers: 'Map par dikhao',
    'layer.lines': 'Constellation lines', 'layer.names': 'Naam', 'layer.grid': 'Altitude rings', 'layer.mw': 'Aakashganga',
    skyHint: 'Map ka upar ka hissa seedha sir ke upar hai aur kinara horizon hai. Map ko upar uthao aur jis disha me dekhna hai usi taraf muh karo — poorv baayen taraf hai, asli aasmaan ki tarah.',
    'sky.day': 'Din ki roshni', 'sky.civil': 'Twilight', 'sky.naut': 'Gehra twilight', 'sky.astro': 'Aakhri roshni', 'sky.dark': 'Andhera aasmaan',
    magLine: 'Chamak {m}', inCon: '{c} me', close: 'Band karo', altitude: 'Oonchai', direction: 'Disha', aboveHor: 'Abhi horizon ke upar hai.', belowHor: 'Is samay horizon ke neeche hai.',

    'learn.history': 'Itihaas', 'learn.facts': 'Facts', 'learn.glossary': 'Shabdkosh',
    historyLead: 'Har pind ki kahani: naam, khoj, sanskriti aur missions.', notFound: 'Yahan kuch nahi mila.', sources: 'Sources',
    'cat.sun': 'Surya', 'cat.earth': 'Prithvi', 'cat.moon': 'Chandrama', 'cat.planets': 'Grah', 'cat.stars': 'Tare', 'cat.universe': 'Brahmand', 'cat.missions': 'Missions', 'cat.life': 'Jeevan',
    glossSearch: 'Koi shabd khojo…', noResults: 'Kuch nahi mila.',

    'about.tag': 'Aapka aasmaan, offline ya online.', 'about.what': 'Cosmica aapki jagah ke liye aaj raat ka Chandrama, Surya, grah aur tare dikhata hai. Aasmaan aapke device par hi calculate hota hai, isliye bina internet ke bhi chalta hai.',
    installIos: 'iPhone/iPad par: Share dabao, phir “Add to Home Screen”.',
    privTitle: 'Aapka data surakshit hai',
    'priv.p1': 'Koi account nahi, koi ads nahi, koi tracker nahi. Cosmica aapka personal data collect nahi karta.',
    'priv.p2': 'Aasmaan aapke apne device par calculate hota hai. Iske liye aapki location kahin nahi bheji jaati, aur ye offline bhi chalta hai.',
    'priv.p3': 'Aapki chuni hui jagah aur settings sirf is browser me save hoti hain. “Mera data hatao” se ye hat jaati hain.',
    'priv.p4': 'Sirf jab aap online hote hue city search me type karte ho, tab aapka likha hua text jagah dhoondhne ke liye free Open-Meteo geocoding service ko jaata hai. “Meri location use karo” ko aapka browser padhta hai aur wo aapke device par hi rehti hai.',
    'priv.p5': 'NASA, Wikipedia aadi ke links unki apni websites kholte hain, jinke apne privacy rules hote hain.',
    clearData: 'Mera data hatao', clearConfirm: 'Is browser se aapki saved jagah aur settings hata dein?', cleared: 'Data hata diya',
    disclaimerTitle: 'Jaanne layak', disclaimer: 'Positions calculate ki gayi hain aur aasmaan dekhne ke liye sahi hain, navigation ke liye nahi. Surya ko kabhi seedha, ya binoculars/telescope se bina sahi solar filter ke mat dekho.',
    credits: 'Credits', 'cr.engine': 'aasmaan ka calculation', 'cr.stars': 'tare aur constellation data', 'cr.geo': 'online city search', developer: 'Banaya',
    timeFmt: 'Samay ka format', h12: '12 ghanta', h24: '24 ghanta', settings: 'Settings',

    searchCity: 'Koi shahar ya kasba khojo…', onlineTag: 'online', offlineSearch: 'Aap offline ho — sirf saved shahar dikh rahe hain.', searching: 'Online khoj rahe hain…',
    searchFail: 'Online search abhi uplabdh nahi hai — saved shahar dikh rahe hain.', useMyLoc: 'Meri location use karo', enterCoords: 'Coordinates daalo',
    latitude: 'Latitude', longitude: 'Longitude', timezone: 'Time zone', useThis: 'Ye jagah use karo', geoNo: 'Ye browser aapki location nahi de sakta.', locating: 'Aapki location dhoondh rahe hain…',
    geoDenied: 'Aapki location nahi mil saki. Aap shahar search kar sakte ho.', yourPlace: 'Aapki location', nearCity: '{c} ke paas', customPlace: 'Apni jagah',
    badCoords: 'Latitude −90 se 90 ke beech aur longitude −180 se 180 ke beech daalo.', badTz: 'Ye time zone naam sahi nahi hai (jaise: Asia/Kolkata).',
    installed: 'Cosmica install ho gaya', updateReady: 'Update taiyaar hai — app dobara kholo.', offlineReady: 'Ab offline bhi chalega',
    defaultLoc: '{place} dikha rahe hain. Badalne ke liye upar jagah ke naam par tap karo.'
  };

  var strings = { en: en, hi: hi };
  var i18n = X.i18n = {
    lang: 'en', strings: strings,
    t: function (key, params) {
      var s = strings[i18n.lang][key]; if (s == null) s = en[key]; if (s == null) return key;
      if (params) s = s.replace(/\{(\w+)\}/g, function (m, k) { return params[k] != null ? params[k] : m; });
      return s;
    },
    init: function () { var l = X.store && X.store.get('lang', 'en'); i18n.lang = l === 'hi' ? 'hi' : 'en'; document.documentElement.lang = i18n.lang === 'hi' ? 'hi-Latn' : 'en'; },
    setLang: function (l) { i18n.lang = l === 'hi' ? 'hi' : 'en'; if (X.store) X.store.set('lang', i18n.lang); document.documentElement.lang = i18n.lang === 'hi' ? 'hi-Latn' : 'en'; },
    /** fill every [data-i18n] / [data-i18n-aria] element inside root */
    apply: function (rootEl) {
      var r = rootEl || document;
      Array.prototype.forEach.call(r.querySelectorAll('[data-i18n]'), function (e) { e.textContent = i18n.t(e.getAttribute('data-i18n')); });
      Array.prototype.forEach.call(r.querySelectorAll('[data-i18n-aria]'), function (e) { e.setAttribute('aria-label', i18n.t(e.getAttribute('data-i18n-aria'))); });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
