/* Cosmica — astronomy glossary, English + Hinglish. */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var g = function (term, en, hi) { return { term: term, en: en, hi: hi }; };
  X.glossary = [
    g('Altitude', 'How high an object is above the horizon, in degrees. 0° is on the horizon, 90° is straight overhead.', 'Koi pind horizon se kitna upar hai, degrees me. 0° horizon par, 90° seedha sir ke upar.'),
    g('Azimuth', 'The compass direction of an object, in degrees clockwise from north: 0° N, 90° E, 180° S, 270° W.', 'Pind ki disha, north se ghadi ki disha me degrees me: 0° uttar, 90° poorv, 180° dakshin, 270° paschim.'),
    g('Zenith', 'The point directly above your head (altitude 90°).', 'Aapke seedha sir ke upar ka bindu (altitude 90°).'),
    g('Horizon', 'The line where the sky seems to meet the ground or sea.', 'Wo rekha jahan aasmaan zameen ya samundar se milta dikhta hai.'),
    g('Magnitude', 'A star’s or planet’s brightness. The smaller (or more negative) the number, the brighter it is. About 6 is the faintest the naked eye can see in a dark sky; the Sun is −26.7.', 'Tare ya grah ki chamak. Number jitna chhota (ya negative), utna chamakdaar. Andhere aasmaan me bina upkaran lagbhag 6 tak dikhta hai; Surya −26.7 hai.'),
    g('Constellation', 'A pattern of stars that people have named, like Orion or the Big Dipper. Today the sky is divided into 88 official constellations.', 'Taron ka naam diya gaya pattern, jaise Orion ya Saptarishi. Aaj aasmaan ko 88 official constellations me baanta gaya hai.'),
    g('Ecliptic', 'The path the Sun seems to follow across the sky during the year. The Moon and planets stay close to it.', 'Wo raasta jis par Surya saal bhar aasmaan me chalta dikhta hai. Chandrama aur grah isi ke paas rehte hain.'),
    g('Twilight', 'The time when the Sun is just below the horizon. Civil twilight ends when the Sun is 6° down, nautical at 12°, and astronomical at 18° — after that the sky is fully dark.', 'Jab Surya horizon ke thoda neeche hota hai. Civil twilight tab khatam hota hai jab Surya 6° neeche ho, nautical 12° par, aur astronomical 18° par — uske baad aasmaan poora andhera hota hai.'),
    g('Solar noon', 'The moment the Sun is highest in the sky for the day. It is usually not exactly 12:00 on the clock.', 'Wo pal jab Surya din me sabse ooncha hota hai. Ye ghadi me aksar theek 12:00 nahi hota.'),
    g('Phase (Moon)', 'How much of the Moon’s lit side we can see from Earth: new, crescent, quarter, gibbous, full.', 'Chandrama ka kitna roshan hissa hume Prithvi se dikhta hai: amavasya, crescent, quarter, gibbous, poornima.'),
    g('Waxing / Waning', 'Waxing means the lit part is growing (new → full); waning means it is shrinking (full → new).', 'Waxing yaani roshan hissa badh raha hai (amavasya → poornima); waning yaani ghat raha hai (poornima → amavasya).'),
    g('Illumination', 'The percentage of the Moon’s (or a planet’s) visible disc that is lit by the Sun.', 'Chandrama (ya grah) ki dikhne wali disc ka kitna pratishat Surya se roshan hai.'),
    g('Conjunction', 'When two objects look very close together in the sky, such as the Moon next to Jupiter.', 'Jab do pind aasmaan me bahut paas dikhte hain, jaise Chandrama aur Jupiter saath-saath.'),
    g('Opposition', 'When a planet is directly opposite the Sun as seen from Earth. It rises at sunset, is up all night, and is at its brightest and closest.', 'Jab koi grah Prithvi se Surya ke theek saamne hota hai. Wo sunset par ugta hai, poori raat dikhta hai, aur sabse chamakdaar aur paas hota hai.'),
    g('Elongation', 'The angle in the sky between a planet and the Sun. A small elongation means the planet is lost in the Sun’s glare.', 'Aasmaan me kisi grah aur Surya ke beech ka kon. Chhota elongation matlab grah Surya ki chamak me kho jaata hai.'),
    g('Retrograde', 'When a planet seems to move backwards against the stars for a while. It is an illusion caused by Earth overtaking (or being overtaken by) the planet.', 'Jab koi grah kuch samay ke liye taron ke beech ulta chalta dikhta hai. Ye bhram hai, jo Prithvi ke us grah ko overtake karne (ya grah ke Prithvi ko overtake karne) se hota hai.'),
    g('Light-year', 'The distance light travels in one year: about 9.46 trillion km. It measures distance, not time.', 'Prakash ek saal me jitni doori tay karta hai: lagbhag 9.46 kharab km. Ye doori naapta hai, samay nahi.'),
    g('Solstice', 'The two days a year when the Sun is at its highest (June) or lowest (December) noon position in the northern hemisphere — the longest and shortest days.', 'Saal ke do din jab uttari gola me Surya dopahar me sabse ooncha (June) ya sabse neecha (December) hota hai — sabse lamba aur sabse chhota din.'),
    g('Equinox', 'The two days a year (around 20 March and 22–23 September) when day and night are nearly equal everywhere on Earth.', 'Saal ke do din (lagbhag 20 March aur 22–23 September) jab poori Prithvi par din aur raat lagbhag barabar hote hain.'),
    g('Right ascension & declination', 'The “longitude and latitude” of the sky. Astronomers use them to give a star’s position among the stars, whatever the time or place.', 'Aasmaan ke “longitude aur latitude”. Khagolshastri inse taron ki sthiti batate hain, chahe samay ya jagah kuch bhi ho.'),
    g('Naked eye', 'Seen without a telescope or binoculars.', 'Bina telescope ya binoculars ke dekha gaya.'),
    g('Dwarf planet', 'A round world that orbits the Sun but has not cleared other objects from its path. Pluto is the best-known example.', 'Gol pind jo Surya ki parikrama karta hai par apne raaste ke doosre pindon ko saaf nahi kar paaya. Pluto sabse jaana-pehchana udaaharan hai.'),
    g('Meteor', 'The streak of light made when a small piece of space rock or dust burns up in the atmosphere. Often called a shooting star.', 'Jab antariksh ki chhoti chattan ya dhool vaayumandal me jalti hai to bani roshni ki lakeer. Ise toota tara bhi kehte hain.')
  ];
})(typeof window !== 'undefined' ? window : globalThis);
