/* Cosmica — constellation cards (12 well-known constellations). English + Hinglish (key "hi").
   Keyed by IAU abbreviation (same ids as CosmicaData.cons in sky.js). Every card ends with source links.
   Facts: Ptolemy’s 48 constellations, Arabic star names, and Indian traditions phrased as “commonly identified with”. */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var WIKI = function (l, p) { return { l: l + ' (Wikipedia)', u: 'https://en.wikipedia.org/wiki/' + p }; };

  X.constellations = {
    Ori: {
      abbr: 'Ori', hindi: 'Mriga / Kalpurush', dev: 'मृग', color: '#9fb4ff',
      season: { en: 'Best seen from India: December–March evenings', hi: 'India se sabse achha: December–March ki shaam' },
      en: {
        name: 'Orion', tag: 'The Hunter — the most recognisable constellation of the winter sky.',
        s: [
          { h: 'The name', t: 'Orion is named after a giant hunter of Greek myth. Its Hindi names are Mriga (the deer) and Kalpurush.' },
          { h: 'Story & history', t: 'Orion is one of the 48 constellations listed by Ptolemy in the 2nd century CE. In Greek myth the hunter was killed by a scorpion, which is why the sky places Orion and Scorpius on opposite sides — when one rises, the other sets.' },
          { h: 'Indian sky tradition', t: 'Orion is commonly identified with the Mriga (deer) of Vedic tradition, and its head is linked to the Mrigashira nakshatra. Betelgeuse is commonly identified with the Ardra nakshatra, and the three belt stars with the arrow shot at the deer by the hunter, Sirius.' },
          { h: 'Key stars', t: 'Betelgeuse (red supergiant, the left-hand shoulder as seen from the northern hemisphere, from Arabic “yad al-jawzā’”, hand of al-Jawzā’), Rigel (blue-white supergiant, the foot), Bellatrix, Saiph, and the belt stars Alnitak, Alnilam and Mintaka. The fuzzy glow in the “sword” is the Orion Nebula (M42), a stellar nursery.' },
          { h: 'How to find it', t: 'Look for three bright stars in a short straight row — Orion’s Belt — with a bright star at each corner of a big rectangle around it. Extend the belt downward (towards the horizon) to reach Sirius, the brightest star in the night sky.' }
        ]
      },
      hi: {
        name: 'Mriga / Kalpurush (Orion)', tag: 'Shikari — sardiyon ke aasmaan ka sabse pehchana jaane wala tara-samooh.',
        s: [
          { h: 'Naam', t: 'Orion naam Greek katha ke ek vishaal shikari par hai. Hindi me ise Mriga (hiran) aur Kalpurush kehte hain.' },
          { h: 'Kahani aur itihaas', t: 'Orion Ptolemy ke 2vi shatabdi CE ke 48 tara-samoohon me se ek hai. Greek katha me ye shikari bichchhu ke dankh se mara gaya, isi liye aasmaan me Orion aur Scorpius ek-doosre ke ulte taraf hain — ek uthta hai to doosra doobta hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Orion ko aam taur par Vedic parampara ke Mriga (hiran) se jodkar dekha jaata hai, aur iska sir Mrigashira nakshatra se juda hai. Betelgeuse ko aam taur par Ardra nakshatra se, aur belt ke teen taaron ko shikari (Sirius) ke chhode teer se jodkar bataya jaata hai.' },
          { h: 'Mukhya tare', t: 'Betelgeuse (laal supergiant, kandha; Arabic “yad al-jawzā’” se), Rigel (neela-safed supergiant, pair), Bellatrix, Saiph, aur belt ke tare Alnitak, Alnilam, Mintaka. “Talwar” me dikhne wala dhundhla dhabba Orion Nebula (M42) hai, jahan nae tare ban rahe hain.' },
          { h: 'Kaise dhundhein', t: 'Chhoti si seedhi line me teen chamakdar tare dhundhein — yahi Orion ka Belt hai — aur uske chaaron taraf ek bade rectangle ke kone par chamakdar tare. Belt ko neeche (kshitij ki taraf) badhayein to Sirius milta hai, jo raat ka sabse chamakdar tara hai.' }
        ]
      },
      src: [WIKI('Orion', 'Orion_(constellation)'), WIKI('Betelgeuse', 'Betelgeuse'), WIKI('Orion Nebula', 'Orion_Nebula'), WIKI('Mrigashira', 'Mrigashira')]
    },

    UMa: {
      abbr: 'UMa', hindi: 'Saptarishi', dev: 'सप्तर्षि', color: '#ffd9a0',
      season: { en: 'Best seen from India: February–May evenings, high in the north', hi: 'India se sabse achha: February–May ki shaam, uttar me oonchai par' },
      en: {
        name: 'Ursa Major', tag: 'The Great Bear — home of the Big Dipper, known in India as the Saptarishi.',
        s: [
          { h: 'The name', t: 'Ursa Major is Latin for “the Greater Bear”. In India its seven brightest stars are called the Saptarishi, the Seven Sages.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In Greek myth the nymph Callisto was turned into a bear, and Zeus later placed her in the sky. The Big Dipper (or Plough) is an asterism — a famous pattern inside the larger bear.' },
          { h: 'Indian sky tradition', t: 'The seven stars are commonly identified with the Saptarishi, the seven great sages, such as Vasishtha, Atri and Pulastya. In one common assignment Vasishtha is Mizar, and the tiny star Alcor beside it is his wife Arundhati — a pair shown to newlyweds in some wedding traditions.' },
          { h: 'Key stars', t: 'Dubhe and Merak (the “pointers”), Phecda, Megrez, Alioth, Mizar and Alkaid. “Dubhe” comes from the Arabic word for bear. Mizar and Alcor form a naked-eye double star that was once used as an eyesight test.' },
          { h: 'How to find it', t: 'Look north for a big saucepan or plough shape of seven stars. Draw a line through the two stars at the end of the pan, Dubhe and Merak, and extend it about five times their gap to reach Polaris, the North Star.' }
        ]
      },
      hi: {
        name: 'Saptarishi (Ursa Major)', tag: 'Bada Bhalu — Big Dipper ka ghar, jise Bharat me Saptarishi kehte hain.',
        s: [
          { h: 'Naam', t: 'Ursa Major Latin me “bada bhalu” hota hai. Bharat me iske saat sabse chamakdar taaron ko Saptarishi, yaani saat rishi, kehte hain.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Greek katha me apsara Callisto bhalu ban gayi thi aur Zeus ne use aasmaan me jagah di. Big Dipper (ya Plough) ek asterism hai — bade bhalu ke andar bana mashhoor pattern.' },
          { h: 'Bharatiya aakash parampara', t: 'Ye saat tare aam taur par Saptarishi se jode jaate hain, jaise Vasishtha, Atri, Pulastya. Ek prachalit mapping me Vasishtha = Mizar hai aur uske paas ka nanha tara Alcor unki patni Arundhati hai — kuch vivah paramparaon me navdampati ko ye jodi dikhayi jaati hai.' },
          { h: 'Mukhya tare', t: 'Dubhe aur Merak (“pointers”), Phecda, Megrez, Alioth, Mizar aur Alkaid. “Dubhe” Arabic ke bhalu wale shabd se aaya hai. Mizar aur Alcor aankhon se dikhne wala double star hai, jo kabhi nazar test ke liye use hota tha.' },
          { h: 'Kaise dhundhein', t: 'Uttar me patile ya plough jaise saat taare dhundhein. Patile ke kinare ke do taare, Dubhe aur Merak, se line kheenchkar unke beech ki doori se lagbhag paanch guna aage badhayein — wahan Polaris, yaani Dhruva Tara, milega.' }
        ]
      },
      src: [WIKI('Ursa Major', 'Ursa_Major'), WIKI('Big Dipper', 'Big_Dipper'), WIKI('Saptarshi', 'Saptarshi'), WIKI('Mizar and Alcor', 'Mizar_and_Alcor')]
    },

    UMi: {
      abbr: 'UMi', hindi: 'Dhruva (Polaris)', dev: 'ध्रुव', color: '#bcd0ff',
      season: { en: 'Visible all year from north India, low in the north; hard to see from the far south', hi: 'Uttar India se saal bhar dikhta hai, uttar me neeche; door dakshin se dekhna mushkil' },
      en: {
        name: 'Ursa Minor', tag: 'The Little Bear — it holds Polaris, the star that hardly moves.',
        s: [
          { h: 'The name', t: 'Ursa Minor is Latin for “the Lesser Bear”. Its brightest star is Polaris, called Dhruva Tara in Hindi — dhruva means “fixed”.' },
          { h: 'Story & history', t: 'Ursa Minor is one of Ptolemy’s 48 constellations; its seven brightest stars make the Little Dipper. Because Earth’s axis points almost exactly at Polaris, the star stays nearly in the same spot while the sky turns around it, so sailors and travellers have used it to find north.' },
          { h: 'Indian sky tradition', t: 'Polaris is the Dhruva Tara of the story of the child Dhruva, who was granted an unmoving place in the sky. In many Hindu weddings the couple is shown the Dhruva star as a symbol of steadiness.' },
          { h: 'Key stars', t: 'Polaris is less than 1° from the north celestial pole. It is only a moderately bright (2nd magnitude) star, not one of the brightest. Kochab and Pherkad, the outer pan stars, are nicknamed the “Guardians of the Pole”.' },
          { h: 'How to find it', t: 'Use the Big Dipper: extend the line from Merak through Dubhe by about five times their gap and you reach Polaris. Its height above the northern horizon equals your latitude, so it is about 28° up from Delhi but only about 8° from Kanyakumari.' }
        ]
      },
      hi: {
        name: 'Dhruva Tara (Ursa Minor)', tag: 'Chhota Bhalu — ismein Polaris hai, wo tara jo lagbhag hilta hi nahi.',
        s: [
          { h: 'Naam', t: 'Ursa Minor Latin me “chhota bhalu” hota hai. Iska sabse chamakdar tara Polaris hai, jise Hindi me Dhruva Tara kehte hain — dhruva ka matlab “atal”.' },
          { h: 'Kahani aur itihaas', t: 'Ursa Minor Ptolemy ke 48 tara-samoohon me se ek hai; iske saat sabse chamakdar tare Little Dipper banate hain. Prithvi ki dhuri lagbhag seedhe Polaris ki taraf hai, isliye aasmaan ghoomta hai par ye tara lagbhag wahin rehta hai — isi se musafir aur naavik uttar disha pehchante aaye hain.' },
          { h: 'Bharatiya aakash parampara', t: 'Polaris wahi Dhruva Tara hai jiski katha bachche Dhruva ki hai, jise aasmaan me atal sthaan mila. Kai Hindu vivahon me dulha-dulhan ko sthirta ke prateek ke roop me Dhruva tara dikhaya jaata hai.' },
          { h: 'Mukhya tare', t: 'Polaris uttari aakashiya dhruv se 1° se bhi kam door hai. Ye sirf madhyam chamak (2nd magnitude) ka tara hai, sabse chamakdar nahi. Kochab aur Pherkad, patile ke baahri tare, “Guardians of the Pole” kehlate hain.' },
          { h: 'Kaise dhundhein', t: 'Big Dipper se: Merak se Dubhe ki line ko unke beech ki doori se lagbhag paanch guna aage badhayein to Polaris milta hai. Iski uttari kshitij se oonchai aapke akshansh ke barabar hoti hai — Delhi se lagbhag 28°, Kanyakumari se sirf lagbhag 8°.' }
        ]
      },
      src: [WIKI('Ursa Minor', 'Ursa_Minor'), WIKI('Polaris', 'Polaris'), WIKI('Pole star', 'Pole_star')]
    },

    Cas: {
      abbr: 'Cas', hindi: 'Kasiyopiya', dev: 'कैसिओपिया', color: '#d8b4ff',
      season: { en: 'Best seen from India: October–January evenings, in the north (low from the far south)', hi: 'India se sabse achha: October–January ki shaam, uttar me (dakshin se neeche)' },
      en: {
        name: 'Cassiopeia', tag: 'The Queen — a bright “W” (or “M”) in the northern sky.',
        s: [
          { h: 'The name', t: 'Cassiopeia is named after a queen of Greek myth, the wife of King Cepheus and mother of Princess Andromeda.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In the myth Cassiopeia boasted that she or her daughter was more beautiful than the sea nymphs, and was placed in the sky as a queen on her throne, sometimes shown circling the pole.' },
          { h: 'Indian sky tradition', t: 'Cassiopeia is not tied to one widely agreed classical Indian figure, so Indian sky guides mostly use its modern name. It is very useful in practice: it sits on the opposite side of Polaris from the Saptarishi, so one of the two is nearly always visible.' },
          { h: 'Key stars', t: 'Schedar (from Arabic for “breast”), Caph (from Arabic for “hand”), Gamma Cassiopeiae, Ruchbah and Segin. Its five brightest stars draw the “W” shape.' },
          { h: 'How to find it', t: 'Look north for a lopsided W or M of five bright stars. It lies across Polaris from the Big Dipper — when the Dipper is low, Cassiopeia is high, and vice versa.' }
        ]
      },
      hi: {
        name: 'Kasiyopiya (Cassiopeia)', tag: 'Rani — uttari aasmaan me chamakdar “W” (ya “M”).',
        s: [
          { h: 'Naam', t: 'Cassiopeia naam Greek katha ki ek rani par hai, jo raja Cepheus ki patni aur rajkumari Andromeda ki maa thi.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Katha me Cassiopeia ne ghamand kiya ki wo ya uski beti samudri apsaraon se bhi sundar hai; use aasmaan me singhasan par baithi rani ke roop me jagah mili, jo dhruv ke chakkar lagati dikhti hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Cassiopeia kisi ek sarvasammat Bharatiya shastriya roop se nahi jodi jaati, isliye Bharatiya sky guides me ise aam taur par uske aadhunik naam se hi bulaya jaata hai. Vyavhaar me ye kaam ki hai: ye Polaris ke doosri taraf Saptarishi ke saamne rehti hai, isliye in dono me se ek lagbhag hamesha dikhta hai.' },
          { h: 'Mukhya tare', t: 'Schedar (Arabic ke “seena” se), Caph (Arabic ke “haath” se), Gamma Cassiopeiae, Ruchbah aur Segin. Iske paanch sabse chamakdar tare “W” aakar banate hain.' },
          { h: 'Kaise dhundhein', t: 'Uttar me paanch chamakdar taaron ka tedha W ya M dhundhein. Ye Polaris ke doosri taraf Big Dipper ke saamne hota hai — Dipper neeche ho to Cassiopeia oonchi, aur ulta.' }
        ]
      },
      src: [WIKI('Cassiopeia', 'Cassiopeia_(constellation)'), WIKI('Schedar', 'Schedar'), WIKI('Cassiopeia (mythology)', 'Cassiopeia_(mythology)')]
    },

    Sco: {
      abbr: 'Sco', hindi: 'Vrishchika', dev: 'वृश्चिक', color: '#ff7a5c',
      season: { en: 'Best seen from India: May–July evenings, low in the south', hi: 'India se sabse achha: May–July ki shaam, dakshin me neeche' },
      en: {
        name: 'Scorpius', tag: 'The Scorpion — a bright curved tail with red Antares as its heart.',
        s: [
          { h: 'The name', t: 'Scorpius is Latin for “scorpion”; in Hindi and Sanskrit it is Vrishchika, which is also the zodiac sign Scorpio.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In Greek myth a scorpion killed the hunter Orion, and both were placed in the sky on opposite sides, so Scorpius rises as Orion sets.' },
          { h: 'Indian sky tradition', t: 'Antares is commonly identified with the Jyeshtha nakshatra (“the eldest”), and the stars of the tail, including Shaula and Lesath, with the Mula nakshatra (“the root”). Vrishchika is the eighth rashi of the zodiac.' },
          { h: 'Key stars', t: 'Antares, a huge red supergiant whose name means “rival of Ares (Mars)” because of its red colour; Shaula (Arabic for “the raised [tail]”), Dschubba and Acrab at the head. The tail curls like a fishhook.' },
          { h: 'How to find it', t: 'Face south on a May–July evening and look for a red star with a curved line of stars sweeping down to its lower-left like a fishhook. From the far north of India parts of the tail stay low and may be hidden by the horizon.' }
        ]
      },
      hi: {
        name: 'Vrishchika (Scorpius)', tag: 'Bichchhu — mudi hui chamakdar poonchh aur laal Antares uska dil.',
        s: [
          { h: 'Naam', t: 'Scorpius Latin me “bichchhu” hota hai; Hindi–Sanskrit me Vrishchika, jo rashi Scorpio bhi hai.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Greek katha me ek bichchhu ne shikari Orion ko mara tha aur dono ko aasmaan me ulte chhor par jagah mili, isliye Scorpius tab uthta hai jab Orion doobta hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Antares ko aam taur par Jyeshtha nakshatra (“sabse bada”) se, aur poonchh ke tare, jaise Shaula aur Lesath, ko Mula nakshatra (“jad”) se jodkar bataya jaata hai. Vrishchika zodiac ki aathvi rashi hai.' },
          { h: 'Mukhya tare', t: 'Antares, vishaal laal supergiant, jiska naam “Ares (Mangal) ka pratidwandi” hai kyunki ye Mangal jaisa laal dikhta hai; Shaula (Arabic: “uthi hui [poonchh]”), Dschubba aur Acrab sir ke paas. Poonchh machhli pakadne ke kanta jaisi mudi hai.' },
          { h: 'Kaise dhundhein', t: 'May–July ki shaam dakshin ki taraf dekhein: ek laal tara aur uske neeche-baayein ek kante jaisi mudi taaron ki line. Bharat ke bahut uttari bhaag se poonchh ka kuchh hissa kshitij ke paas chhup sakta hai.' }
        ]
      },
      src: [WIKI('Scorpius', 'Scorpius'), WIKI('Antares', 'Antares'), WIKI('Jyeshtha', 'Jyeshtha'), WIKI('Mula (nakshatra)', 'Mula_(nakshatra)')]
    },

    Leo: {
      abbr: 'Leo', hindi: 'Simha', dev: 'सिंह', color: '#ffc46b',
      season: { en: 'Best seen from India: February–May evenings; highest in March–April', hi: 'India se sabse achha: February–May ki shaam; March–April me sabse oopar' },
      en: {
        name: 'Leo', tag: 'The Lion — a backward question mark of stars leading to Regulus.',
        s: [
          { h: 'The name', t: 'Leo is Latin for “lion”; in Hindi and Sanskrit it is Simha, the fifth zodiac sign (rashi).' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In Greek myth it is the Nemean lion with an unbreakable hide, killed by Heracles as the first of his twelve labours. The November Leonid meteors seem to come from this part of the sky.' },
          { h: 'Indian sky tradition', t: 'Regulus is commonly identified with the Magha nakshatra (“the mighty”), linked with royalty and ancestors. The Moon passes close to Regulus every month because it lies almost on the ecliptic.' },
          { h: 'Key stars', t: 'Regulus (Latin for “little king”), Denebola (Arabic for “the lion’s tail”), Algieba and Zosma. The head and chest form the “Sickle”, a backward question mark with Regulus at its base.' },
          { h: 'How to find it', t: 'Face south on a spring evening and look for a backward question mark with one bright star at the bottom — that is Regulus — followed by a triangle of stars to the east that forms the lion’s hind quarters.' }
        ]
      },
      hi: {
        name: 'Simha (Leo)', tag: 'Sher — ulte sawal-chinh jaisa tara-samooh, jiske neeche Regulus chamakta hai.',
        s: [
          { h: 'Naam', t: 'Leo Latin me “sher” hota hai; Hindi–Sanskrit me Simha, zodiac ki paanchvi rashi.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Greek katha me ye Nemean sher hai jiski khaal par hathiyar nahi chalte the; Heracles ne apne baarah kaamon me pehle kaam ke roop me ise mara. November ki Leonid ulka-barsaat isi hisse se aati dikhti hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Regulus ko aam taur par Magha nakshatra (“mahaan”) se jodkar bataya jaata hai, jo raja aur pitron se juda hai. Chandrama har mahine Regulus ke paas se guzarta hai kyunki ye lagbhag ecliptic par hai.' },
          { h: 'Mukhya tare', t: 'Regulus (Latin: “chhota raja”), Denebola (Arabic: “sher ki poonchh”), Algieba aur Zosma. Sir aur seena “Sickle” banate hain — ulta sawal-chinh jiske neeche Regulus hai.' },
          { h: 'Kaise dhundhein', t: 'Vasant ki shaam dakshin ki taraf dekhein: ulte sawal-chinh ke neeche ek chamakdar tara — wahi Regulus hai — aur poorv me taaron ka ek tribhuj, jo sher ke pichhle hisse ko dikhata hai.' }
        ]
      },
      src: [WIKI('Leo', 'Leo_(constellation)'), WIKI('Regulus', 'Regulus'), WIKI('Magha', 'Magha_(nakshatra)'), WIKI('Leonids', 'Leonids')]
    },

    Tau: {
      abbr: 'Tau', hindi: 'Vrishabha', dev: 'वृषभ', color: '#ffb07a',
      season: { en: 'Best seen from India: November–February evenings', hi: 'India se sabse achha: November–February ki shaam' },
      en: {
        name: 'Taurus', tag: 'The Bull — orange Aldebaran and the Pleiades star cluster.',
        s: [
          { h: 'The name', t: 'Taurus is Latin for “bull”; in Hindi and Sanskrit it is Vrishabha, the second zodiac sign.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations, among the oldest recognised in the sky. In Greek myth Zeus took the form of a white bull to carry off Europa. The Crab Nebula (M1) near its horn is the remains of a supernova seen from Earth in 1054.' },
          { h: 'Indian sky tradition', t: 'Aldebaran is commonly identified with the Rohini nakshatra. The Pleiades are the Krittika nakshatra, the six or seven Krittikas who in tradition nursed Kartikeya; the month name Kartika is linked to them.' },
          { h: 'Key stars', t: 'Aldebaran (Arabic for “the follower”, since it follows the Pleiades across the sky), El Nath, and the Pleiades (M45), about 440 light-years away. The V-shaped Hyades cluster forms the bull’s face; Aldebaran seems to sit in it but is much closer to us.' },
          { h: 'How to find it', t: 'From Orion’s Belt, extend the line away from Sirius, upward, to a bright orange star — Aldebaran — then carry on to a small, misty group of stars, the Pleiades. The Pleiades look like a tiny dipper to the unaided eye.' }
        ]
      },
      hi: {
        name: 'Vrishabha (Taurus)', tag: 'Saand — narangi Aldebaran aur Pleiades tara-guchchha.',
        s: [
          { h: 'Naam', t: 'Taurus Latin me “saand” hota hai; Hindi–Sanskrit me Vrishabha, zodiac ki doosri rashi.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai, aasmaan ke sabse purane pehchane gaye samoohon me. Greek katha me Zeus safed saand ban kar Europa ko le gaye the. Iske sing ke paas Crab Nebula (M1) 1054 me dikhe supernova ka bacha hua hissa hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Aldebaran ko aam taur par Rohini nakshatra se jodkar bataya jaata hai. Pleiades Krittika nakshatra hai, chhah–saat Krittikayen, jinhone parampara me Kartikeya ko paala; Kartik mahine ka naam inhi se juda hai.' },
          { h: 'Mukhya tare', t: 'Aldebaran (Arabic: “peechhe chalne wala”, kyunki ye Pleiades ke peechhe chalta hai), El Nath, aur Pleiades (M45), lagbhag 440 prakash-varsh door. V-aakar ka Hyades guchchha saand ka chehra banata hai; Aldebaran usme dikhta hai par hum se kahin zyada paas hai.' },
          { h: 'Kaise dhundhein', t: 'Orion ke Belt se Sirius ke ulte taraf, oopar ki or line badhayein to ek chamakdar narangi tara — Aldebaran — milega, aur aage ek chhota dhundhla guchchha, Pleiades. Nange aankh se Pleiades ek nanhe chamche jaisa dikhta hai.' }
        ]
      },
      src: [WIKI('Taurus', 'Taurus_(constellation)'), WIKI('Aldebaran', 'Aldebaran'), WIKI('Pleiades', 'Pleiades'), WIKI('Krittika', 'Krittika')]
    },

    Gem: {
      abbr: 'Gem', hindi: 'Mithuna', dev: 'मिथुन', color: '#8ee0d0',
      season: { en: 'Best seen from India: December–March evenings', hi: 'India se sabse achha: December–March ki shaam' },
      en: {
        name: 'Gemini', tag: 'The Twins — Castor and Pollux, two bright stars side by side.',
        s: [
          { h: 'The name', t: 'Gemini is Latin for “twins”; in Hindi and Sanskrit it is Mithuna, the third zodiac sign.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In Greek myth the twins Castor and Pollux (the Dioscuri) were brothers, Castor mortal and Pollux immortal; Zeus placed them together in the sky. The December Geminid meteor shower seems to radiate from near Castor.' },
          { h: 'Indian sky tradition', t: 'Castor and Pollux are commonly identified with the Punarvasu nakshatra, “the return of the light”. The rashi name Mithuna means “a pair”.' },
          { h: 'Key stars', t: 'Pollux, an orange giant and the brighter twin, and Castor, a white star that is really a system of six stars. Alhena marks one of the twins’ feet.' },
          { h: 'How to find it', t: 'Find Orion first, then look to the upper left (north-east) of Betelgeuse for two bright stars side by side. Castor is the more northern, and Pollux is the brighter, more orange one.' }
        ]
      },
      hi: {
        name: 'Mithuna (Gemini)', tag: 'Jodiya bhai — Castor aur Pollux, paas-paas do chamakdar tare.',
        s: [
          { h: 'Naam', t: 'Gemini Latin me “judwa” hota hai; Hindi–Sanskrit me Mithuna, zodiac ki teesri rashi.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Greek katha me judwa bhai Castor aur Pollux (Dioscuri) the, Castor nashwar aur Pollux amar; Zeus ne dono ko saath aasmaan me rakha. December ki Geminid ulka-barsaat Castor ke paas se aati dikhti hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Castor aur Pollux ko aam taur par Punarvasu nakshatra (“roshni ki wapasi”) se jodkar bataya jaata hai. Mithuna naam ka matlab “jodi” hai.' },
          { h: 'Mukhya tare', t: 'Pollux, narangi giant aur zyada chamakdar bhai, aur Castor, safed tara jo asal me chhah taaron ka system hai. Alhena judwa bhai ke pair ko dikhata hai.' },
          { h: 'Kaise dhundhein', t: 'Pehle Orion dhundhein, phir Betelgeuse ke upar-baayein (uttar-poorv) paas-paas do chamakdar tare dekhein. Castor zyada uttar me hai, aur Pollux zyada chamakdar aur narangi hai.' }
        ]
      },
      src: [WIKI('Gemini', 'Gemini_(constellation)'), WIKI('Castor', 'Castor_(star)'), WIKI('Pollux', 'Pollux_(star)'), WIKI('Punarvasu', 'Punarvasu')]
    },

    Cyg: {
      abbr: 'Cyg', hindi: 'Hans', dev: 'हंस', color: '#a8e0ff',
      season: { en: 'Best seen from India: July–November evenings, almost overhead around August–September', hi: 'India se sabse achha: July–November ki shaam, August–September me lagbhag sir ke oopar' },
      en: {
        name: 'Cygnus', tag: 'The Swan — a great cross flying down the Milky Way.',
        s: [
          { h: 'The name', t: 'Cygnus is Latin for “swan”, and its Hindi name is Hans. Its brightest stars also form the Northern Cross.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations, linked in Greek tradition with several stories of swans, including Zeus disguised as a swan. Cygnus X-1, in this constellation, was one of the first strong black hole candidates.' },
          { h: 'Indian sky tradition', t: 'No classical nakshatra is attached to Cygnus. In modern Hindi it is called Hans (swan), and it lies right along the Akashganga, the Milky Way, so it looks like a swan flying along a river of stars.' },
          { h: 'Key stars', t: 'Deneb (from Arabic for “tail”, marking the swan’s tail and top of the cross), Albireo (the head, a lovely gold-and-blue double star in a telescope), Sadr and Gienah. Deneb is a very luminous supergiant far more distant than Vega or Altair.' },
          { h: 'How to find it', t: 'Deneb is one corner of the Summer Triangle, together with Vega and Altair. Find the triangle high in the east on a monsoon-end evening, then look for the long cross shape stretching from Deneb along the Milky Way.' }
        ]
      },
      hi: {
        name: 'Hans (Cygnus)', tag: 'Hans — Akashganga me udta hua ek bada cross.',
        s: [
          { h: 'Naam', t: 'Cygnus Latin me “hans” hota hai, aur Hindi me ise Hans kehte hain. Iske sabse chamakdar tare Northern Cross bhi banate hain.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai, jo Greek parampara me hans se jude kai qisson se juda hai, jaise Zeus ka hans ka roop. Is tara-samooh me Cygnus X-1 pehle majboot black hole candidates me se ek tha.' },
          { h: 'Bharatiya aakash parampara', t: 'Cygnus se koi shastriya nakshatra nahi judta. Aadhunik Hindi me ise Hans kehte hain, aur ye Akashganga (Milky Way) ke ekdam beech me hai, isliye taaron ki nadi par udte hans jaisa lagta hai.' },
          { h: 'Mukhya tare', t: 'Deneb (Arabic ke “poonchh” se; hans ki poonchh aur cross ka sira), Albireo (sir; telescope me sunehra-neela double tara), Sadr aur Gienah. Deneb bahut chamakdar supergiant hai aur Vega ya Altair se kahin zyada door hai.' },
          { h: 'Kaise dhundhein', t: 'Deneb Summer Triangle ka ek kona hai, Vega aur Altair ke saath. Barsaat ke ant ki shaam poorv me oonchai par triangle dhundhein, phir Deneb se Akashganga ke saath failta lamba cross dekhein.' }
        ]
      },
      src: [WIKI('Cygnus', 'Cygnus_(constellation)'), WIKI('Deneb', 'Deneb'), WIKI('Summer Triangle', 'Summer_Triangle'), WIKI('Cygnus X-1', 'Cygnus_X-1')]
    },

    Cru: {
      abbr: 'Cru', hindi: 'Trishanku', dev: 'त्रिशंकु', color: '#7fd1ff',
      season: { en: 'Only from far-south India (low on the southern horizon): February–June evenings, best in April–May', hi: 'Sirf door dakshin Bharat se (dakshin kshitij ke paas): February–June ki shaam, April–May me sabse achha' },
      en: {
        name: 'Crux', tag: 'The Southern Cross — the smallest of the 88 constellations.',
        s: [
          { h: 'The name', t: 'Crux is Latin for “cross”. In India it is commonly called Trishanku, after a king of Indian legend.' },
          { h: 'Story & history', t: 'Ptolemy counted these stars as part of Centaurus, and Crux was separated as its own constellation by European astronomers in the 16th–17th centuries. It is the smallest of the 88 modern constellations, but it is famous in the southern hemisphere and appears on several national flags.' },
          { h: 'Indian sky tradition', t: 'Crux is commonly linked with Trishanku, the king whom the sage Vishwamitra sent up towards heaven by his power; the gods refused him entry and he was left hanging in the sky between earth and heaven.' },
          { h: 'Key stars', t: 'Acrux (the brightest, a bright blue double star), Mimosa, Gacrux (a red giant) and Imai. The stars Alpha and Beta Centauri sit just next to the Cross and are known as the “Pointers”.' },
          { h: 'How to find it', t: 'Only from the far south of India — such as Kanyakumari, Kerala, Tamil Nadu and Sri Lanka’s latitudes — and only for a short time, low above a clear southern horizon, roughly 14° up from Chennai and 19° up from Kanyakumari at its best. Look for four stars in a kite shape, and the two bright Pointer stars beside it.' }
        ]
      },
      hi: {
        name: 'Trishanku (Crux)', tag: 'Dakshini Cross — 88 tara-samoohon me sabse chhota.',
        s: [
          { h: 'Naam', t: 'Crux Latin me “cross” hota hai. Bharat me ise aam taur par Trishanku kehte hain, ek pauranik raja ke naam par.' },
          { h: 'Kahani aur itihaas', t: 'Ptolemy ne in taaron ko Centaurus ka hissa gina tha, aur Crux ko 16vi–17vi shatabdi me European khagolshastriyon ne alag tara-samooh banaya. Ye aaj ke 88 tara-samoohon me sabse chhota hai, par dakshini goladh me mashhoor hai aur kai deshon ke jhandon par dikhta hai.' },
          { h: 'Bharatiya aakash parampara', t: 'Crux ko aam taur par Trishanku se jodkar dekha jaata hai, wo raja jise rishi Vishwamitra ne apni shakti se swarg ki taraf bheja; devtaon ne use pravesh nahi diya aur wo prithvi aur swarg ke beech aasmaan me latak gaya.' },
          { h: 'Mukhya tare', t: 'Acrux (sabse chamakdar, neela double tara), Mimosa, Gacrux (laal giant) aur Imai. Alpha aur Beta Centauri Cross ke bilkul paas hain aur “Pointers” kehlate hain.' },
          { h: 'Kaise dhundhein', t: 'Sirf Bharat ke door dakshin se — jaise Kanyakumari, Kerala, Tamil Nadu — aur sirf thodi der ke liye, saaf dakshini kshitij ke upar neeche; Chennai se lagbhag 14° aur Kanyakumari se lagbhag 19° tak oopar. Patang jaise chaar tare aur uske paas do chamakdar Pointer tare dhundhein.' }
        ]
      },
      src: [WIKI('Crux', 'Crux'), WIKI('Acrux', 'Acrux'), WIKI('Trishanku', 'Trishanku')]
    },

    CMa: {
      abbr: 'CMa', hindi: 'Lubdhaka (Vyadha)', dev: 'लुब्धक', color: '#c9e4ff',
      season: { en: 'Best seen from India: December–March evenings (Sirius is brightest in January–February)', hi: 'India se sabse achha: December–March ki shaam (Sirius January–February me sabse chamakdar)' },
      en: {
        name: 'Canis Major', tag: 'The Great Dog — home of Sirius, the brightest star in the night sky.',
        s: [
          { h: 'The name', t: 'Canis Major is Latin for “the Greater Dog”. Sirius, its main star, is also called the Dog Star; in Sanskrit it is Lubdhaka or Mrigavyadha, “the hunter”.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations and is pictured as the hunting dog following Orion. The ancient Egyptians watched Sirius rising before dawn to forecast the Nile flood, and the Greek and Roman “dog days” of summer are named after it.' },
          { h: 'Indian sky tradition', t: 'Sirius is commonly identified with Lubdhaka or Mrigavyadha, the hunter of the Mriga (Orion), who is pursuing the deer across the sky. Orion’s belt is traditionally pictured as the arrow aimed at him.' },
          { h: 'Key stars', t: 'Sirius (from Greek for “scorching” or “glowing”), Mirzam, Adhara and Wezen. Sirius is only 8.6 light-years away; its small companion Sirius B was one of the first white dwarfs discovered.' },
          { h: 'How to find it', t: 'Follow Orion’s Belt downwards to the left (towards the horizon) to reach Sirius — the brightest star after the Sun, shining white-blue. Canis Major’s other stars form a rough arrow shape beneath it.' }
        ]
      },
      hi: {
        name: 'Lubdhaka (Canis Major)', tag: 'Bada Kutta — Sirius ka ghar, raat ka sabse chamakdar tara.',
        s: [
          { h: 'Naam', t: 'Canis Major Latin me “bada kutta” hota hai. Iska mukhya tara Sirius Dog Star bhi kehlata hai; Sanskrit me Lubdhaka ya Mrigavyadha, yaani “shikari”.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai aur Orion ke peechhe chalte shikari kutte ki tarah dikhaya jaata hai. Prachin Misr ke log Sirius ko subah se pehle uthta dekh kar Nile ki baadh ka andaza lagate the, aur garmi ke “dog days” ka naam bhi isi se aaya.' },
          { h: 'Bharatiya aakash parampara', t: 'Sirius ko aam taur par Lubdhaka ya Mrigavyadha se jodkar bataya jaata hai, jo Mriga (Orion) ka shikari hai aur hiran ke peechhe aasmaan me daud raha hai. Orion ke belt ko parampara me us par taana teer maana jaata hai.' },
          { h: 'Mukhya tare', t: 'Sirius (Greek ke “jhulsane wala” ya “chamakne wala” se), Mirzam, Adhara aur Wezen. Sirius sirf 8.6 prakash-varsh door hai; iska chhota saathi Sirius B pehle khoje gaye white dwarfs me se ek tha.' },
          { h: 'Kaise dhundhein', t: 'Orion ke Belt ko neeche-baayein (kshitij ki taraf) badhayein to Sirius milta hai — Surya ke baad sabse chamakdar tara, safed-neela. Iske neeche Canis Major ke baaki tare teer jaisa aakar banate hain.' }
        ]
      },
      src: [WIKI('Canis Major', 'Canis_Major'), WIKI('Sirius', 'Sirius'), WIKI('Mriga (Orion)', 'Mrigashira')]
    },

    Lyr: {
      abbr: 'Lyr', hindi: 'Abhijit (Vega)', dev: 'अभिजित्', color: '#e6efff',
      season: { en: 'Best seen from India: June–October evenings, almost overhead in July–August', hi: 'India se sabse achha: June–October ki shaam, July–August me lagbhag sir ke oopar' },
      en: {
        name: 'Lyra', tag: 'The Lyre — small but home to brilliant blue-white Vega.',
        s: [
          { h: 'The name', t: 'Lyra is Latin for “lyre”, a small stringed instrument. Its brightest star is Vega, linked in India with the Abhijit nakshatra.' },
          { h: 'Story & history', t: 'It is one of Ptolemy’s 48 constellations. In Greek myth this is the lyre of Orpheus, the musician whose music charmed animals and even the gods of the underworld. Vega was the north pole star about 12,000 years ago and will be again in about 12,000 years.' },
          { h: 'Indian sky tradition', t: 'Vega is commonly identified with the Abhijit nakshatra (“victorious”), the old “28th nakshatra” that was sometimes counted with the 27 lunar mansions.' },
          { h: 'Key stars', t: 'Vega (from Arabic “al-nasr al-wāqi‘”, the falling eagle), the 5th-brightest star in the night sky and only about 25 light-years away. Also Sheliak and Sulafat, the Ring Nebula (M57) and the “Double Double” star Epsilon Lyrae.' },
          { h: 'How to find it', t: 'Vega is the brightest star of the Summer Triangle, with Deneb and Altair. In summer look almost overhead for a brilliant blue-white star with a small parallelogram of faint stars attached — that parallelogram is the lyre.' }
        ]
      },
      hi: {
        name: 'Abhijit (Lyra)', tag: 'Veena — chhota tara-samooh par chamakdar neela-safed Vega ka ghar.',
        s: [
          { h: 'Naam', t: 'Lyra Latin me “lyre”, ek chhota taar wala vaadya hai. Iska sabse chamakdar tara Vega hai, jo Bharat me Abhijit nakshatra se jodkar dekha jaata hai.' },
          { h: 'Kahani aur itihaas', t: 'Ye Ptolemy ke 48 tara-samoohon me se ek hai. Greek katha me ye sangeetkar Orpheus ki lyre hai, jiske sangeet se jaanwar aur paataal ke devta bhi mohit ho jaate the. Vega lagbhag 12,000 saal pehle uttari dhruv tara tha aur lagbhag 12,000 saal baad phir hoga.' },
          { h: 'Bharatiya aakash parampara', t: 'Vega ko aam taur par Abhijit nakshatra (“vijayi”) se jodkar bataya jaata hai, jo purani “28vi nakshatra” thi aur kabhi 27 nakshatron ke saath gini jaati thi.' },
          { h: 'Mukhya tare', t: 'Vega (Arabic “al-nasr al-wāqi‘”, yaani girta hua baaz, se), raat ka 5va sabse chamakdar tara aur sirf lagbhag 25 prakash-varsh door. Sheliak aur Sulafat, Ring Nebula (M57) aur “Double Double” tara Epsilon Lyrae bhi yahin hain.' },
          { h: 'Kaise dhundhein', t: 'Vega Summer Triangle ka sabse chamakdar tara hai, Deneb aur Altair ke saath. Garmi me lagbhag sir ke oopar ek chamakdar neela-safed tara dhundhein jiske saath halke taaron ka chhota samanantar-chaturbhuj juda ho — wahi lyre hai.' }
        ]
      },
      src: [WIKI('Lyra', 'Lyra'), WIKI('Vega', 'Vega'), WIKI('Abhijit (nakshatra)', 'Abhijit_(nakshatra)'), WIKI('Ring Nebula', 'Ring_Nebula')]
    }
  };
  X.constellationOrder = ['Ori', 'UMa', 'UMi', 'Cas', 'Sco', 'Leo', 'Tau', 'Gem', 'Cyg', 'Cru', 'CMa', 'Lyr'];
})(typeof window !== 'undefined' ? window : globalThis);
