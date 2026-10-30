/* Cosmica — "Did you know?" space facts. English + Hinglish (key "hi"). Each has a source link.
   Add facts at the END of the list (the “fact of the day” is picked by date, so reordering changes which fact shows when). */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var W = function (t) { return { l: 'Wikipedia', u: 'https://en.wikipedia.org/wiki/' + t }; };
  var N = function (p, l) { return { l: l || 'NASA Science', u: 'https://science.nasa.gov/' + p }; };
  var f = function (cat, en, hi, src) { return { cat: cat, en: en, hi: hi, src: src }; };

  X.facts = [
    /* ---- Sun & Earth */
    f('sun', 'Sunlight takes about 8 minutes and 20 seconds to reach Earth, so you always see the Sun as it was a little while ago.', 'Sunlight ko Prithvi tak pahunchne me lagbhag 8 minute 20 second lagte hain, yaani hum Surya ko hamesha thodi der pehle ki halat me dekhte hain.', W('Sun')),
    f('sun', 'The Sun holds about 99.86% of all the mass in the Solar System.', 'Solar System ke kul mass ka lagbhag 99.86% akela Surya me hai.', W('Sun')),
    f('sun', 'About 1.3 million Earths could fit inside the Sun.', 'Surya ke andar lagbhag 13 lakh Prithviyan sama sakti hain.', W('Sun')),
    f('sun', 'The core of the Sun is about 15 million °C — hot enough to fuse hydrogen into helium.', 'Surya ka core lagbhag 1.5 crore °C garam hai — itna ki hydrogen helium me fuse ho jaye.', W('Sun')),
    f('sun', 'The Sun is about 4.6 billion years old and is roughly halfway through its life as a steady star.', 'Surya lagbhag 4.6 arab saal purana hai aur ek sthir tare ke roop me apni aadhi zindagi ke aaspaas hai.', W('Sun')),
    f('earth', 'At the equator the Earth’s surface moves at about 1,670 km/h as the planet spins.', 'Bhumadhya rekha par Prithvi ki sataha ghoomte hue lagbhag 1,670 km/h ki raftaar se chalti hai.', W('Earth%27s_rotation')),
    /* ---- Moon */
    f('moon', 'The Moon drifts away from Earth by about 3.8 cm every year, measured with laser beams bounced off mirrors left by Apollo astronauts.', 'Chandrama har saal Prithvi se lagbhag 3.8 cm door ja raha hai — ye Apollo yatriyon ke chhode sheeshon se laser bounce karke naapa gaya hai.', W('Orbit_of_the_Moon')),
    f('moon', 'We always see the same face of the Moon because it is tidally locked: it turns once on its axis in the time it takes to go once around Earth.', 'Hume Chandrama ka hamesha ek hi chehra dikhta hai kyunki wo tidally locked hai: wo Prithvi ka ek chakkar lagane me apne axis par bhi theek ek baar ghoomta hai.', W('Tidal_locking')),
    f('moon', 'Gravity on the Moon is only about one-sixth of Earth’s, so a 60 kg person would weigh like 10 kg there.', 'Chandrama par gravity Prithvi ki lagbhag ek-chhathai hai, to 60 kg ka insaan wahan 10 kg jaisa mehsoos karega.', W('Moon')),
    f('moon', 'Total solar eclipses happen because the Sun is about 400 times wider than the Moon and also about 400 times farther away, so they look the same size.', 'Poorn surya grahan isliye hota hai kyunki Surya Chandrama se lagbhag 400 guna chaura hai aur lagbhag 400 guna door bhi, isliye dono aasmaan me ek jitne bade dikhte hain.', W('Solar_eclipse')),
    f('moon', 'The Moon’s phases repeat every 29.5 days, but it goes around Earth in only 27.3 days — the Earth moves around the Sun in the meantime.', 'Chandrama ki kalayein 29.5 din me dohrati hain, par wo Prithvi ka chakkar sirf 27.3 din me lagata hai — beech me Prithvi bhi Surya ke chakkar me aage badh jaati hai.', W('Lunar_phase')),
    f('moon', 'With no wind or rain to wear them away, Apollo footprints on the Moon could last for millions of years.', 'Na hawa, na baarish — isliye Apollo ke Chandrama par chhode kadmon ke nishaan lakhon saal tak reh sakte hain.', W('Apollo_11')),
    /* ---- Planets */
    f('planets', 'A day on Venus (243 Earth days) is longer than its year (225 Earth days).', 'Shukra ka ek din (243 Prithvi-din) uske ek saal (225 Prithvi-din) se bhi lamba hai.', W('Venus')),
    f('planets', 'Venus is the hottest planet, about 465 °C — even hotter than Mercury, which is much closer to the Sun.', 'Shukra sabse garam grah hai, lagbhag 465 °C — Surya ke bahut paas wale Mercury se bhi zyada garam.', N('venus/')),
    f('planets', 'Mercury is only about 40% wider than our Moon, yet it is the smallest planet.', 'Mercury hamare Chandrama se sirf lagbhag 40% hi bada hai, phir bhi wahi sabse chhota grah hai.', W('Mercury_(planet)')),
    f('planets', 'Olympus Mons on Mars is about 22 km high — roughly two and a half times the height of Mount Everest.', 'Mars ka Olympus Mons lagbhag 22 km ooncha hai — Mount Everest se lagbhag dhai guna.', W('Olympus_Mons')),
    f('planets', 'A day on Mars (a “sol”) lasts 24 hours 37 minutes, very close to an Earth day.', 'Mars ka ek din (“sol”) 24 ghante 37 minute ka hota hai, yaani Prithvi ke din ke bahut kareeb.', W('Mars')),
    f('planets', 'Jupiter’s Great Red Spot is a storm wider than Earth, and it has been watched for at least 190 years.', 'Jupiter ka Great Red Spot Prithvi se bada ek toofan hai, jo kam se kam 190 saal se dekha ja raha hai.', W('Great_Red_Spot')),
    f('planets', 'Jupiter’s moon Io is the most volcanically active world in the Solar System.', 'Jupiter ka chaand Io Solar System ka sabse zyada jwalamukhi-sakriya pind hai.', W('Io_(moon)')),
    f('planets', 'Saturn is the only planet less dense than water — it would float, if you had an ocean big enough.', 'Saturn ekmatra grah hai jo paani se kam ghana hai — itna bada samudra mile to ye tairega.', W('Saturn')),
    f('planets', 'Saturn’s moon Enceladus shoots geysers of water ice into space; the Cassini spacecraft flew through them.', 'Saturn ka chaand Enceladus antariksh me paani ki barf ke fountains chhodta hai; Cassini yaan unke beech se guzra tha.', W('Enceladus')),
    f('planets', 'Titan, Saturn’s biggest moon, is the only moon with a thick atmosphere and has lakes of liquid methane.', 'Saturn ka sabse bada chaand Titan ekmatra chaand hai jiska mota vaayumandal hai, aur wahan liquid methane ki jheelein hain.', W('Titan_(moon)')),
    f('planets', 'Uranus is tilted by about 98°, so it rolls around the Sun almost on its side.', 'Uranus lagbhag 98° jhuka hua hai, isliye wo Surya ke chakkar me lagbhag apni kokh ke bal ludhakta hai.', W('Uranus')),
    f('planets', 'Neptune has the fastest winds in the Solar System — up to about 2,000 km/h.', 'Neptune par Solar System ki sabse tez hawayein chalti hain — lagbhag 2,000 km/h tak.', W('Neptune')),
    f('planets', 'Neptune finished its first full orbit since its discovery only in 2011 — a year there lasts about 165 Earth years.', 'Neptune ne apni khoj (1846) ke baad pehla poora chakkar sirf 2011 me poora kiya — wahan ka ek saal lagbhag 165 Prithvi-saal ka hota hai.', W('Neptune')),
    f('planets', 'Mars’s two small moons, Phobos and Deimos, were discovered in 1877 by Asaph Hall.', 'Mars ke do chhote chaand Phobos aur Deimos 1877 me Asaph Hall ne khoje the.', W('Moons_of_Mars')),
    f('planets', 'Pluto was reclassified from a planet to a “dwarf planet” by the International Astronomical Union in 2006.', 'Pluto ko 2006 me International Astronomical Union ne grah se “dwarf planet” ghoshit kiya.', W('Pluto')),
    /* ---- Stars & sky */
    f('stars', 'Polaris, the North Star, stays almost fixed in the northern sky because it lies within about one degree of the north celestial pole.', 'Polaris (Dhruv Tara) uttar aasmaan me lagbhag sthir rehta hai kyunki wo north celestial pole se lagbhag ek degree ke andar hai.', W('Polaris')),
    f('stars', 'Sirius is the brightest star in the night sky, about 8.6 light-years away.', 'Sirius raat ke aasmaan ka sabse chamakdaar tara hai, lagbhag 8.6 prakash-varsh door.', W('Sirius')),
    f('stars', 'Betelgeuse, the red shoulder of Orion, is a red supergiant several hundred times wider than the Sun.', 'Orion ka laal kandha Betelgeuse ek red supergiant hai, jo Surya se kai sau guna chaura hai.', W('Betelgeuse')),
    f('stars', 'A light-year — the distance light travels in a year — is about 9.46 trillion kilometres.', 'Ek prakash-varsh (light-year) — prakash ek saal me jitna chalta hai — lagbhag 9.46 kharab km hota hai.', W('Light-year')),
    f('stars', 'The nearest star after the Sun is Proxima Centauri, about 4.24 light-years away.', 'Surya ke baad sabse paas ka tara Proxima Centauri hai, lagbhag 4.24 prakash-varsh door.', W('Proxima_Centauri')),
    f('stars', 'Stars twinkle because moving air in Earth’s atmosphere bends their light; planets, being larger discs, usually shine steadier.', 'Tare isliye jhilmilate hain kyunki Prithvi ke vaayumandal ki hilti hawa unki roshni ko modti hai; grah bade disc hote hain, isliye aam taur par sthir chamakte hain.', W('Twinkling')),
    f('stars', 'A shooting star is usually a grain of dust or sand burning up about 80–100 km above you.', 'Toota tara aam taur par ek dhool ya ret ka kan hota hai jo aapse lagbhag 80–100 km upar jal jaata hai.', W('Meteoroid')),
    f('stars', 'The August Perseid meteors come from comet Swift–Tuttle; the December Geminids come from the asteroid 3200 Phaethon.', 'August ki Perseid ulkayein comet Swift–Tuttle se aati hain; December ki Geminid ulkayein asteroid 3200 Phaethon se.', W('Meteor_shower')),
    f('stars', 'Halley’s Comet returns about every 76 years; it is next due in mid-2061.', 'Halley ka dumdaar tara lagbhag har 76 saal me lautta hai; agli baar 2061 ke beech me.', W('Halley%27s_Comet')),
    /* ---- Universe */
    f('universe', 'The Milky Way holds hundreds of billions of stars and is about 100,000 light-years across.', 'Milky Way me sainkdon arab tare hain aur ye lagbhag 1 lakh prakash-varsh chauda hai.', W('Milky_Way')),
    f('universe', 'The Andromeda Galaxy, about 2.5 million light-years away, is the farthest thing most people can see with the naked eye.', 'Andromeda Galaxy lagbhag 25 lakh prakash-varsh door hai aur zyadatar logon ke liye bina upkaran dikhne wali sabse door ki cheez hai.', W('Andromeda_Galaxy')),
    f('universe', 'The universe is about 13.8 billion years old.', 'Brahmaand ki umar lagbhag 13.8 arab saal hai.', W('Age_of_the_universe')),
    f('universe', 'The observable universe is about 93 billion light-years across.', 'Dekhne yogya brahmaand lagbhag 93 arab prakash-varsh chauda hai.', W('Observable_universe')),
    f('universe', 'A teaspoon of neutron-star material would weigh around a billion tonnes on Earth.', 'Neutron star ke ek chammach bhar padarth ka wazan Prithvi par lagbhag ek arab ton hoga.', W('Neutron_star')),
    f('universe', 'The first picture of a black hole’s shadow, in the galaxy M87, was released on 10 April 2019 by the Event Horizon Telescope.', 'Black hole ki parchhai ki pehli tasveer (galaxy M87 me) 10 April 2019 ko Event Horizon Telescope ne jaari ki.', W('Event_Horizon_Telescope')),
    f('universe', 'At age 19, Subrahmanyan Chandrasekhar worked out the mass limit (about 1.4 Suns) above which a white dwarf collapses; he won the 1983 Nobel Prize in Physics.', '19 saal ki umar me Subrahmanyan Chandrasekhar ne wo mass limit (lagbhag 1.4 Surya) nikali jiske upar white dwarf dhah jaata hai; unhe 1983 ka Physics ka Nobel Prize mila.', W('Subrahmanyan_Chandrasekhar')),
    /* ---- Missions & history */
    f('missions', 'Sputnik 1, the first artificial satellite, was launched on 4 October 1957.', 'Sputnik 1, pehla kritrim upgraha, 4 October 1957 ko launch hua.', W('Sputnik_1')),
    f('missions', 'Yuri Gagarin became the first human in space on 12 April 1961; his flight around Earth lasted 108 minutes.', 'Yuri Gagarin 12 April 1961 ko antariksh me jaane wale pehle insaan bane; Prithvi ke ek chakkar ki unki udaan 108 minute ki thi.', W('Yuri_Gagarin')),
    f('missions', 'Neil Armstrong and Buzz Aldrin walked on the Moon on 20 July 1969 during Apollo 11.', 'Neil Armstrong aur Buzz Aldrin ne Apollo 11 me 20 July 1969 ko Chandrama par kadam rakhe.', W('Apollo_11')),
    f('missions', 'Rakesh Sharma became the first Indian in space on 3 April 1984, aboard Soyuz T-11.', 'Rakesh Sharma 3 April 1984 ko Soyuz T-11 me antariksh jaane wale pehle Bharatiya bane.', W('Rakesh_Sharma')),
    f('missions', 'India’s first satellite, Aryabhata, was launched on 19 April 1975.', 'Bharat ka pehla upgraha Aryabhata 19 April 1975 ko launch hua.', W('Aryabhata_(satellite)')),
    f('missions', 'Mangalyaan entered Mars orbit on 24 September 2014 — India’s first attempt, and the first Asian country to do it.', 'Mangalyaan 24 September 2014 ko Mars ke orbit me pahuncha — Bharat ki pehli hi koshish me, aur ye karne wala pehla Asian desh.', W('Mars_Orbiter_Mission')),
    f('missions', 'On 23 August 2023 Chandrayaan-3 landed near the Moon’s south pole region, making India the fourth country to soft-land on the Moon.', '23 August 2023 ko Chandrayaan-3 Chandrama ke south pole ke paas utra, aur Bharat Chandrama par soft landing karne wala chauntha desh bana.', W('Chandrayaan-3')),
    f('missions', 'Aditya-L1, India’s first dedicated Sun mission, has been in a halo orbit around the L1 point, about 1.5 million km away, since 6 January 2024.', 'Aditya-L1, Bharat ka pehla Surya-vishesh mission, 6 January 2024 se L1 point ke halo orbit me hai, jo lagbhag 15 lakh km door hai.', W('Aditya-L1')),
    f('missions', 'Voyager 1, launched in 1977, is the farthest human-made object — in interstellar space since 2012 and more than 24 billion km from Earth.', 'Voyager 1 (1977 me launch) insaan ki banai sabse door ki cheez hai — 2012 se interstellar space me aur Prithvi se 24 arab km se bhi zyada door.', W('Voyager_1')),
    f('missions', 'The James Webb Space Telescope, launched on 25 December 2021, works about 1.5 million km from Earth at the L2 point.', 'James Webb Space Telescope, 25 December 2021 ko launch hua, Prithvi se lagbhag 15 lakh km door L2 point par kaam karta hai.', W('James_Webb_Space_Telescope')),
    f('missions', 'The Hubble Space Telescope has been orbiting Earth since its launch in April 1990.', 'Hubble Space Telescope April 1990 ke launch se Prithvi ki parikrama kar raha hai.', W('Hubble_Space_Telescope')),
    /* ---- Space life */
    f('life', 'The International Space Station circles Earth about every 90 minutes at roughly 28,000 km/h, so its crew sees around 16 sunrises a day.', 'International Space Station lagbhag 28,000 km/h ki raftaar se har 90 minute me Prithvi ka chakkar lagata hai, isliye wahan ke yatri roz lagbhag 16 sunrise dekhte hain.', W('International_Space_Station')),
    f('life', 'People have lived aboard the ISS continuously since 2 November 2000.', '2 November 2000 se ISS par lagatar insaan rehte aa rahe hain.', W('International_Space_Station')),
    f('life', 'Astronauts can grow a few centimetres taller in space because their spines are no longer compressed by gravity.', 'Antariksh me yatri kuch centimetre lambe ho sakte hain, kyunki gravity na hone se unki reedh dabi nahi rehti.', W('Effect_of_spaceflight_on_the_human_body')),
    f('life', 'Space is silent: sound needs air or another material to travel through, and space is almost empty.', 'Antariksh me khamoshi hoti hai: awaaz ko chalne ke liye hawa ya koi padarth chahiye, aur antariksh lagbhag khaali hai.', W('Outer_space'))
  ];
  X.factCats = { sun: '☀️', earth: '🌍', moon: '🌙', planets: '🪐', stars: '✨', universe: '🌌', missions: '🚀', life: '🧑‍🚀' };
})(typeof window !== 'undefined' ? window : globalThis);
