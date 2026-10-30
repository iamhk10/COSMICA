/* Cosmica — js/data/meteors.js : the 12 main annual meteor showers.
   sl = solar longitude of the peak (J2000, IMO working list), ra in hours, dec in degrees (radiant), zhr = typical peak rate for perfect skies,
   from/to = usual activity dates [month, day]. Peak dates move by up to a day from year to year: Cosmica works the exact time out from the Sun's longitude. */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {};
  X.meteors = [
    { id: 'quad', sl: 283.15, ra: 15.33, dec: 49.5, zhr: 110, kms: 41, from: [12, 28], to: [1, 12], con: 'Boötes', parent: '2003 EH1',
      en: { name: 'Quadrantids', note: 'A short, sharp peak of a few hours — bright fireballs if you are lucky. Cold January nights, so dress warm. Radiant is high only in the north (Northern Hemisphere).' },
      hi: { name: 'Quadrantids', note: 'Sirf kuch ghante ka tez peak — kabhi kabhi chamakdaar fireball dikhte hain. Janwari ki thandi raat hai, garam kapde pehno. Radiant sirf uttar disha me ooncha rehta hai.' } },
    { id: 'lyr', sl: 32.32, ra: 18.07, dec: 34, zhr: 18, kms: 49, from: [4, 14], to: [4, 30], con: 'Lyra', parent: 'C/1861 G1 (Thatcher)',
      en: { name: 'Lyrids', note: 'One of the oldest known showers — Chinese records go back about 2,700 years. Steady and fairly reliable; best after midnight, when Lyra is high.' },
      hi: { name: 'Lyrids', note: 'Ye sabse purani jaani-pehchani showers me se hai — China ke record lagbhag 2,700 saal purane hain. Aam taur par bharosemand; aadhi raat ke baad, jab Lyra ooncha ho, tab sabse accha.' } },
    { id: 'eta', sl: 45.5, ra: 22.53, dec: -1, zhr: 50, kms: 66, from: [4, 19], to: [5, 28], con: 'Aquarius', parent: '1P/Halley',
      en: { name: 'Eta Aquariids', note: 'Dust from Halley’s Comet. Fast meteors with long glowing trails. Radiant rises only in the last hours before dawn, so watch before sunrise — especially good near the equator and in the south.' },
      hi: { name: 'Eta Aquariids', note: 'Halley ke Comet ki dhool. Tez meteors, lambi chamakti lakeeren. Radiant subah se kuch ghante pehle hi uthta hai, isliye suryoday se pehle dekho — bhoomadhya rekha aur dakshin me khaas accha.' } },
    { id: 'sda', sl: 125, ra: 22.6, dec: -16, zhr: 25, kms: 41, from: [7, 12], to: [8, 23], con: 'Aquarius', parent: '96P/Machholz (suspected)',
      en: { name: 'Southern Delta Aquariids', note: 'A slow, long-lasting shower with a broad peak. Good from India and further south; you may see it mixed with early Perseids.' },
      hi: { name: 'Southern Delta Aquariids', note: 'Dheemi, lambe samay tak chalne wali shower, chaudha peak. Bharat aur dakshin me accha; shuruaati Perseids ke saath mil sakti hai.' } },
    { id: 'per', sl: 140, ra: 3.2, dec: 58, zhr: 100, kms: 59, from: [7, 17], to: [8, 24], con: 'Perseus', parent: '109P/Swift–Tuttle',
      en: { name: 'Perseids', note: 'The most popular shower of the year — warm summer nights, many bright meteors and fireballs. In India the monsoon cloud is the main enemy; the radiant is high only after midnight.' },
      hi: { name: 'Perseids', note: 'Saal ki sabse mashhoor shower — garmi ki raatein, kai chamakdaar meteors aur fireballs. Bharat me baarish ke badal sabse bada dushman hain; radiant aadhi raat ke baad hi ooncha hota hai.' } },
    { id: 'dra', sl: 195.4, ra: 17.47, dec: 54, zhr: 10, kms: 20, from: [10, 6], to: [10, 10], con: 'Draco', parent: '21P/Giacobini–Zinner',
      en: { name: 'Draconids', note: 'Unusual: best in the evening, and slow meteors. Usually weak, but in some years it has produced sudden storms. Needs a northern-sky view.' },
      hi: { name: 'Draconids', note: 'Anokhi: shaam ko sabse accha, aur meteors dheeme. Aam taur par kamzor, par kuch saalon me achanak toofan jaisi barsaat hui hai. Uttar aakash dikhna chahiye.' } },
    { id: 'ori', sl: 208, ra: 6.33, dec: 16, zhr: 20, kms: 66, from: [10, 2], to: [11, 7], con: 'Orion', parent: '1P/Halley',
      en: { name: 'Orionids', note: 'Halley’s Comet’s second shower of the year. Fast, often with persistent trains. Orion rises late evening — look after midnight, high in the south.' },
      hi: { name: 'Orionids', note: 'Halley ke Comet ki saal ki doosri shower. Tez, aksar der tak tikne wali lakeeren. Orion der shaam ko uthta hai — aadhi raat ke baad, dakshin me ooncha dekho.' } },
    { id: 'sta', sl: 223, ra: 3.47, dec: 13, zhr: 5, kms: 27, from: [9, 10], to: [11, 20], con: 'Aries / Taurus', parent: '2P/Encke',
      en: { name: 'Southern Taurids', note: 'Few meteors, but many slow, bright fireballs. A patient show — good for photographers.' },
      hi: { name: 'Southern Taurids', note: 'Meteors kam, par kai dheeme, chamakdaar fireballs. Sabr ka khel — photographers ke liye accha.' } },
    { id: 'nta', sl: 230, ra: 3.87, dec: 22, zhr: 5, kms: 29, from: [10, 20], to: [12, 10], con: 'Taurus', parent: '2P/Encke',
      en: { name: 'Northern Taurids', note: 'The twin of the Southern Taurids; together they fill several weeks with a trickle of bright slow fireballs.' },
      hi: { name: 'Northern Taurids', note: 'Southern Taurids ki jodidaar; dono milkar kai hafton tak kuch chamakdaar, dheeme fireballs dete hain.' } },
    { id: 'leo', sl: 235.27, ra: 10.13, dec: 22, zhr: 15, kms: 71, from: [11, 6], to: [11, 30], con: 'Leo', parent: '55P/Tempel–Tuttle',
      en: { name: 'Leonids', note: 'The fastest of the big showers. Famous for meteor storms about every 33 years (1833, 1966, 1999–2002); in other years a modest 15 an hour. Leo rises after midnight.' },
      hi: { name: 'Leonids', note: 'Badi showers me sabse tez. Lagbhag har 33 saal me meteor toofan ke liye mashhoor (1833, 1966, 1999–2002); baaki saal me aam taur par 15 prati ghanta. Leo aadhi raat ke baad uthta hai.' } },
    { id: 'gem', sl: 262.2, ra: 7.47, dec: 33, zhr: 150, kms: 35, from: [12, 4], to: [12, 20], con: 'Gemini', parent: '3200 Phaethon (an asteroid)',
      en: { name: 'Geminids', note: 'Usually the best shower of the year — bright, many, and visible from the evening. Its parent is an asteroid, not a comet. Great from India: cool, clear December skies.' },
      hi: { name: 'Geminids', note: 'Aam taur par saal ki sabse badhiya shower — chamakdaar, kai, aur shaam se hi dikhne lagti hai. Iska parent asteroid hai, comet nahi. Bharat se shaandaar: thande, saaf December ke aasmaan.' } },
    { id: 'urs', sl: 270.7, ra: 14.47, dec: 75.3, zhr: 10, kms: 33, from: [12, 17], to: [12, 26], con: 'Ursa Minor', parent: '8P/Tuttle',
      en: { name: 'Ursids', note: 'A quiet, northern shower near the Little Dipper. Low rates, but nice for a winter-solstice night under a dark sky.' },
      hi: { name: 'Ursids', note: 'Shaant, uttari shower, Little Dipper ke paas. Dar kam, par sardi ke solstice ki andheri raat ke liye achhi.' } }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
