/* Cosmica — history cards for the Sun, the Moon and the planets. English + Hinglish (key "hi").
   Every card ends with source links. Facts here are well-established; if you change one, keep the source. */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var NASA = function (p) { return { l: 'NASA Science', u: 'https://science.nasa.gov/' + p + '/' }; };
  var WIKI = function (l, p) { return { l: l + ' (Wikipedia)', u: 'https://en.wikipedia.org/wiki/' + p }; };

  X.objects = {
    sun: {
      kind: 'star', dev: 'सूर्य', hindi: 'Surya', color: '#ffd166',
      en: {
        name: 'Sun', tag: 'Our star — a ball of hot gas that gives the Solar System its light and heat.',
        s: [
          { h: 'The name', t: 'The English word comes from Old English “sunne”. In Sanskrit and Hindi it is Surya, and Sunday (Ravivaar) is named after it.' },
          { h: 'Discovery & history', t: 'Ancient astronomers tracked the Sun to build calendars. Around 270 BCE Aristarchus of Samos suggested the Earth moves around the Sun; Copernicus published the idea in 1543. In 1610–11 Galileo and others studied sunspots through telescopes. In 1868 Pierre Janssen saw a new yellow line in sunlight during a total eclipse at Guntur, India — it turned out to be a new element, helium, named after the Greek word for the Sun.' },
          { h: 'Culture', t: 'Surya is one of the oldest deities in the Vedic tradition. The Konark Sun Temple in Odisha (13th century) is built as a giant chariot of the Sun god and is a UNESCO World Heritage Site.' },
          { h: 'Missions', t: 'ISRO’s Aditya-L1 (launched 2 September 2023) studies the Sun from a halo orbit around the L1 point, about 1.5 million km from Earth, which it reached on 6 January 2024.' },
          { h: 'Quick facts', t: 'About 4.6 billion years old. Holds about 99.86% of the Solar System’s mass. Its light needs about 8 minutes 20 seconds to reach us. Never look at it directly without proper eclipse glasses.' }
        ]
      },
      hi: {
        name: 'Surya (Sun)', tag: 'Hamara tara — garam gas ka ek vishaal gola, jo Solar System ko roshni aur garmi deta hai.',
        s: [
          { h: 'Naam', t: 'English me ise “Sun” kehte hain (Old English “sunne” se). Sanskrit aur Hindi me Surya, aur Ravivaar bhi isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Purane khagolshastri calendar banane ke liye Surya ko dekhte the. Lagbhag 270 BCE me Aristarchus ne kaha ki Prithvi Surya ke chakkar lagati hai; Copernicus ne ye vichar 1543 me chhapa. 1610–11 me Galileo jaise vaigyanikon ne telescope se sunspots dekhe. 1868 me Pierre Janssen ne Guntur (India) me poorn surya grahan ke dauran sunlight me ek nayi peeli line dekhi — wo ek naya element nikla, Helium, jiska naam Surya ke Greek shabd par rakha gaya.' },
          { h: 'Sanskriti', t: 'Vedic parampara me Surya sabse purane devtaon me hain. Odisha ka Konark Sun Temple (13vi shatabdi) Surya dev ke vishaal rath jaisa bana hai aur UNESCO World Heritage Site hai.' },
          { h: 'Missions', t: 'ISRO ka Aditya-L1 (2 September 2023 ko launch) Surya ko L1 point ke halo orbit se dekhta hai, jo Prithvi se lagbhag 15 lakh km door hai. Ye 6 January 2024 ko wahan pahuncha.' },
          { h: 'Chhote facts', t: 'Umar lagbhag 4.6 arab saal. Solar System ke kul mass ka lagbhag 99.86% isi me hai. Iski roshni hum tak lagbhag 8 minute 20 second me pahunchti hai. Bina sahi eclipse glasses ke seedha kabhi na dekhein.' }
        ]
      },
      src: [NASA('sun'), WIKI('Sun', 'Sun'), WIKI('Helium', 'Helium'), WIKI('Aditya-L1', 'Aditya-L1')]
    },

    moon: {
      kind: 'moon', dev: 'चंद्र', hindi: 'Chandra', color: '#e8e6dc',
      en: {
        name: 'Moon', tag: 'Earth’s only natural satellite — the first world humans ever visited.',
        s: [
          { h: 'The name', t: '“Moon” comes from Old English “mōna”, linked to the word for “month”. In Hindi it is Chand or Chandra, and Monday (Somvaar) is named after Soma, another name for the Moon.' },
          { h: 'Discovery & history', t: 'Early calendars everywhere were built on its phases. In 1609–10 Galileo saw mountains and craters through a telescope. In 1959 the Soviet Luna 2 became the first spacecraft to reach the Moon and Luna 3 photographed its far side. Apollo 11 landed the first humans on 20 July 1969.' },
          { h: 'India and the Moon', t: 'Chandrayaan-1 (launched 22 October 2008) carried NASA’s M3 instrument, which helped confirm water molecules on the Moon’s surface. On 23 August 2023 Chandrayaan-3’s Vikram lander touched down near the lunar south pole region, making India the fourth country to soft-land on the Moon.' },
          { h: 'Culture', t: 'Chandra Grahan, Karwa Chauth, Eid and many other observances are tied to the Moon’s phases. Lunar calendars still decide the dates of many festivals.' },
          { h: 'Quick facts', t: 'Average distance about 384,400 km. It always shows the same face to Earth. It drifts away by about 3.8 cm every year. Gravity there is about one-sixth of Earth’s.' }
        ]
      },
      hi: {
        name: 'Chandra (Moon)', tag: 'Prithvi ka akela prakritik upgraha — pehli duniya jahan insaan pahunche.',
        s: [
          { h: 'Naam', t: '“Moon” Old English “mōna” se aaya hai, jo “month” se juda hai. Hindi me Chand ya Chandra, aur Somvaar ka naam Soma (Chandra ka ek naam) par hai.' },
          { h: 'Khoj aur itihaas', t: 'Har jagah ke purane calendar iski kalaon par bane. 1609–10 me Galileo ne telescope se pahaad aur craters dekhe. 1959 me Soviet Luna 2 Chandrama tak pahunchne wala pehla yaan bana aur Luna 3 ne uske doosre hisse ki tasveer li. Apollo 11 ne 20 July 1969 ko pehle insaan utare.' },
          { h: 'Bharat aur Chandrama', t: 'Chandrayaan-1 (22 October 2008) me NASA ka M3 instrument tha, jisne Chandrama ki sataha par paani ke molecules ki pushti me madad ki. 23 August 2023 ko Chandrayaan-3 ka Vikram lander south pole ke paas utra, aur Bharat Chandrama par soft landing karne wala chauntha desh bana.' },
          { h: 'Sanskriti', t: 'Chandra Grahan, Karwa Chauth, Eid aur kai tyohar Chandrama ki kalaon se jude hain. Aaj bhi chandra calendar se kai tyoharon ki date tay hoti hai.' },
          { h: 'Chhote facts', t: 'Ausat doori lagbhag 3,84,400 km. Ye hamesha Prithvi ko apna ek hi chehra dikhata hai. Har saal lagbhag 3.8 cm door ja raha hai. Wahan gravity Prithvi ki lagbhag ek-chhathai hai.' }
        ]
      },
      src: [NASA('moon'), WIKI('Moon', 'Moon'), WIKI('Chandrayaan-3', 'Chandrayaan-3'), WIKI('Chandrayaan-1', 'Chandrayaan-1')]
    },

    mercury: {
      kind: 'planet', dev: 'बुध', hindi: 'Budh', color: '#b5a7a0',
      en: {
        name: 'Mercury', tag: 'The smallest planet and the closest to the Sun.',
        s: [
          { h: 'The name', t: 'Named after the swift Roman messenger god Mercury, because it races across the sky. In Hindi it is Budh, and Wednesday (Budhvaar) is named after it.' },
          { h: 'Discovery & history', t: 'Known since ancient times — Babylonian astronomers recorded it. It is hard to see because it stays close to the Sun, appearing only briefly after sunset or before sunrise. NASA’s Mariner 10 made the first flybys in 1974–75, and MESSENGER orbited it from 2011 to 2015.' },
          { h: 'Missions', t: 'BepiColombo, a joint ESA–JAXA mission launched in 2018, is on its way to study Mercury from orbit.' },
          { h: 'Quick facts', t: 'A year lasts just 88 Earth days. Temperatures swing from about 430 °C by day to about −180 °C at night. It is only about 40% wider than our Moon.' }
        ]
      },
      hi: {
        name: 'Budh (Mercury)', tag: 'Sabse chhota grah aur Surya ke sabse kareeb.',
        s: [
          { h: 'Naam', t: 'Tez bhaagne wale Roman sandesh-vahak devta Mercury ke naam par, kyunki ye aasmaan me tezi se chalta dikhta hai. Hindi me Budh, aur Budhvaar isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Prachin kaal se jaana jaata hai — Babylon ke khagolshastriyon ne ise record kiya tha. Surya ke bahut paas rehne se ye dikhna mushkil hai; sirf sunset ke baad ya sunrise se pehle thodi der dikhta hai. NASA ke Mariner 10 ne 1974–75 me pehle flyby kiye, aur MESSENGER ne 2011 se 2015 tak iski parikrama ki.' },
          { h: 'Missions', t: 'BepiColombo, ESA aur JAXA ka sanyukt mission (2018 me launch), Mercury ke orbit me jaakar adhyayan karne ke raaste par hai.' },
          { h: 'Chhote facts', t: 'Ek saal sirf 88 Prithvi-din ka. Taapmaan din me lagbhag 430 °C aur raat me lagbhag −180 °C. Ye hamare Chandrama se sirf lagbhag 40% hi bada hai.' }
        ]
      },
      src: [NASA('mercury'), WIKI('Mercury', 'Mercury_(planet)'), WIKI('BepiColombo', 'BepiColombo')]
    },

    venus: {
      kind: 'planet', dev: 'शुक्र', hindi: 'Shukra', color: '#f4d58d',
      en: {
        name: 'Venus', tag: 'The brightest planet — Earth’s hot, cloudy “evening and morning star”.',
        s: [
          { h: 'The name', t: 'Named after the Roman goddess of love and beauty. In Hindi it is Shukra, and Friday (Shukravaar) is named after it.' },
          { h: 'Discovery & history', t: 'Seen as both an “evening star” and a “morning star” since ancient times; early Greek astronomers worked out that they are the same object. In 1610 Galileo saw that Venus shows phases like the Moon — strong evidence that planets orbit the Sun. The transits of Venus in 1761 and 1769 were used to measure the size of the Solar System; Captain Cook sailed to Tahiti to watch the 1769 transit.' },
          { h: 'Missions', t: 'The Soviet Venera 7 (1970) sent data from the surface, and Venera 9 (1975) sent the first pictures from it. ISRO has planned its own Venus orbiter mission, Shukrayaan.' },
          { h: 'Quick facts', t: 'The hottest planet, around 465 °C under thick carbon-dioxide clouds. It spins backwards and so slowly that its day (243 Earth days) is longer than its year (225 Earth days).' }
        ]
      },
      hi: {
        name: 'Shukra (Venus)', tag: 'Sabse chamakdaar grah — Prithvi ka garam, baadalon se dhaka “shaam aur subah ka tara”.',
        s: [
          { h: 'Naam', t: 'Roman prem aur sundarta ki devi Venus ke naam par. Hindi me Shukra, aur Shukravaar isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Prachin kaal se ise “shaam ka tara” aur “subah ka tara” dono ke roop me dekha gaya; shuruaati Greek khagolshastriyon ne samjha ki ye ek hi pind hai. 1610 me Galileo ne dekha ki Venus ki bhi Chandrama jaisi kalayein hoti hain — ye saboot tha ki grah Surya ke chakkar lagate hain. 1761 aur 1769 ke Venus transit se Solar System ka size naapa gaya; Captain Cook 1769 ka transit dekhne Tahiti gaye the.' },
          { h: 'Missions', t: 'Soviet Venera 7 (1970) ne sataha se data bheja, aur Venera 9 (1975) ne wahan se pehli tasveerein bheji. ISRO ka apna Venus orbiter mission Shukrayaan planned hai.' },
          { h: 'Chhote facts', t: 'Sabse garam grah, mote carbon-dioxide baadalon ke neeche lagbhag 465 °C. Ye ulta ghoomta hai aur itna dheere ki iska din (243 Prithvi-din) iske saal (225 Prithvi-din) se lamba hai.' }
        ]
      },
      src: [NASA('venus'), WIKI('Venus', 'Venus'), WIKI('Transit of Venus', 'Transit_of_Venus')]
    },

    mars: {
      kind: 'planet', dev: 'मंगल', hindi: 'Mangal', color: '#e07a5f',
      en: {
        name: 'Mars', tag: 'The red planet — the most explored world after Earth and the Moon.',
        s: [
          { h: 'The name', t: 'Named after the Roman god of war, probably because of its blood-red colour. In Hindi it is Mangal, and Tuesday (Mangalvaar) is named after it.' },
          { h: 'Discovery & history', t: 'Known since ancient times. Johannes Kepler used Tycho Brahe’s careful Mars observations to discover that planets move in ellipses (1609). In 1877 Asaph Hall discovered its two small moons, Phobos and Deimos.' },
          { h: 'Missions', t: 'Mariner 4 made the first flyby in 1965 and the Viking landers touched down in 1976. India’s Mangalyaan (Mars Orbiter Mission), launched on 5 November 2013, entered Mars orbit on 24 September 2014 — India’s first attempt, and the first Asian country to reach Mars orbit. NASA’s Perseverance rover landed in Jezero Crater on 18 February 2021.' },
          { h: 'Quick facts', t: 'Home to Olympus Mons, the tallest volcano known in the Solar System (about 22 km). A day there (a “sol”) lasts 24 h 37 min. Mars is at its best for viewing about every 26 months, when it is at opposition.' }
        ]
      },
      hi: {
        name: 'Mangal (Mars)', tag: 'Laal grah — Prithvi aur Chandrama ke baad sabse zyada khoja gaya pind.',
        s: [
          { h: 'Naam', t: 'Roman yuddh ke devta Mars ke naam par, shayad iske khoon jaise laal rang ki wajah se. Hindi me Mangal, aur Mangalvaar isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Prachin kaal se jaana jaata hai. Johannes Kepler ne Tycho Brahe ke Mars ke dhyan se kiye observations se khoja ki grah ellipse me chalte hain (1609). 1877 me Asaph Hall ne iske do chhote chaand Phobos aur Deimos khoje.' },
          { h: 'Missions', t: 'Mariner 4 ne 1965 me pehla flyby kiya, aur Viking landers 1976 me utre. Bharat ka Mangalyaan (Mars Orbiter Mission), 5 November 2013 ko launch hua aur 24 September 2014 ko Mars ke orbit me pahuncha — Bharat ki pehli hi koshish me, aur Mars orbit tak pahunchne wala pehla Asian desh. NASA ka Perseverance rover 18 February 2021 ko Jezero Crater me utra.' },
          { h: 'Chhote facts', t: 'Yahan Olympus Mons hai, Solar System ka gyaat sabse ooncha jwalamukhi (lagbhag 22 km). Wahan ka ek din (“sol”) 24 ghante 37 minute ka hota hai. Mars dekhne ke liye sabse achha lagbhag har 26 mahine me hota hai, jab wo opposition par hota hai.' }
        ]
      },
      src: [NASA('mars'), WIKI('Mars', 'Mars'), WIKI('Mars Orbiter Mission', 'Mars_Orbiter_Mission'), WIKI('Moons of Mars', 'Moons_of_Mars')]
    },

    jupiter: {
      kind: 'planet', dev: 'बृहस्पति', hindi: 'Brihaspati (Guru)', color: '#e9c46a',
      en: {
        name: 'Jupiter', tag: 'The giant — more massive than all the other planets put together.',
        s: [
          { h: 'The name', t: 'Named after Jupiter, the king of the Roman gods. In Hindi it is Brihaspati or Guru, and Thursday (Guruvaar) is named after it.' },
          { h: 'Discovery & history', t: 'Known since ancient times. In January 1610 Galileo discovered four moons circling Jupiter — Io, Europa, Ganymede and Callisto — proof that not everything orbits the Earth. The Great Red Spot, a storm wider than Earth, has been observed since at least the 1830s.' },
          { h: 'Missions', t: 'Pioneer 10 made the first flyby (1973). NASA’s Juno has orbited it since 2016; ESA’s JUICE (2023) and NASA’s Europa Clipper (2024) are on their way to its icy moons.' },
          { h: 'Quick facts', t: 'Has more than 90 known moons. Spins once in about 10 hours — the fastest day of any planet. Easy to spot: after Venus it is usually the brightest planet in the sky.' }
        ]
      },
      hi: {
        name: 'Brihaspati (Jupiter)', tag: 'Vishaal grah — baaki saare grahon ke mass ko jodne par bhi isse kam.',
        s: [
          { h: 'Naam', t: 'Roman devtaon ke raja Jupiter ke naam par. Hindi me Brihaspati ya Guru, aur Guruvaar isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Prachin kaal se jaana jaata hai. January 1610 me Galileo ne Jupiter ke chaar chaand khoje — Io, Europa, Ganymede aur Callisto — jo saboot tha ki sab kuch Prithvi ke chakkar nahi lagata. Great Red Spot, Prithvi se bada ek toofan, kam se kam 1830 ke dashak se dekha ja raha hai.' },
          { h: 'Missions', t: 'Pioneer 10 ne pehla flyby kiya (1973). NASA ka Juno 2016 se iski parikrama kar raha hai; ESA ka JUICE (2023) aur NASA ka Europa Clipper (2024) iske barfeele chaandon ki taraf ja rahe hain.' },
          { h: 'Chhote facts', t: '90 se zyada gyaat chaand. Lagbhag 10 ghante me ek chakkar — kisi bhi grah ka sabse chhota din. Dhoondhna aasaan: Shukra ke baad aam taur par sabse chamakdaar grah.' }
        ]
      },
      src: [NASA('jupiter'), WIKI('Jupiter', 'Jupiter'), WIKI('Galilean moons', 'Galilean_moons'), WIKI('Great Red Spot', 'Great_Red_Spot')]
    },

    saturn: {
      kind: 'planet', dev: 'शनि', hindi: 'Shani', color: '#d9c38c',
      en: {
        name: 'Saturn', tag: 'The ringed planet — the jewel of the Solar System.',
        s: [
          { h: 'The name', t: 'Named after the Roman god of farming. In Hindi it is Shani, and Saturday (Shanivaar) is named after it.' },
          { h: 'Discovery & history', t: 'Known since ancient times as the slowest-moving bright planet. In 1610 Galileo saw odd “ears” beside it; in 1655 Christiaan Huygens worked out they were a ring and found the moon Titan. In 1675 Giovanni Cassini noticed the dark gap in the rings now called the Cassini Division.' },
          { h: 'Missions', t: 'The Cassini–Huygens mission orbited Saturn from 2004 to 2017. Its Huygens probe landed on Titan on 14 January 2005 — the farthest landing from Earth so far.' },
          { h: 'Quick facts', t: 'It is so light for its size that it would float in water, if you could find a bathtub big enough. The rings are mostly water ice and are incredibly thin. From Earth they looked edge-on in 2025.' }
        ]
      },
      hi: {
        name: 'Shani (Saturn)', tag: 'Chhalle wala grah — Solar System ka heera.',
        s: [
          { h: 'Naam', t: 'Roman kheti ke devta Saturn ke naam par. Hindi me Shani, aur Shanivaar isi ke naam par hai.' },
          { h: 'Khoj aur itihaas', t: 'Prachin kaal se sabse dheere chalne wale chamakdaar grah ke roop me jaana jaata hai. 1610 me Galileo ne iske dono taraf ajeeb “kaan” dekhe; 1655 me Christiaan Huygens ne samjha ki wo ek chhalla hai aur chaand Titan bhi khoja. 1675 me Giovanni Cassini ne chhallon me kaali daraar dekhi, jise ab Cassini Division kehte hain.' },
          { h: 'Missions', t: 'Cassini–Huygens mission ne 2004 se 2017 tak Saturn ki parikrama ki. Uske Huygens probe ne 14 January 2005 ko Titan par utarkar ab tak ki Prithvi se sabse door landing ki.' },
          { h: 'Chhote facts', t: 'Apne size ke hisaab se itna halka hai ki paani me tairega, agar itna bada tub mil jaye. Chhalle zyadatar paani ki barf ke hain aur bahut patle hain. 2025 me Prithvi se ye chhalle sidhe kinare (edge-on) dikhe.' }
        ]
      },
      src: [NASA('saturn'), WIKI('Saturn', 'Saturn'), WIKI('Cassini–Huygens', 'Cassini%E2%80%93Huygens'), WIKI('Rings of Saturn', 'Rings_of_Saturn')]
    },

    uranus: {
      kind: 'planet', dev: 'अरुण', hindi: 'Arun', color: '#9ad1d4',
      en: {
        name: 'Uranus', tag: 'The tilted ice giant — the first planet found with a telescope.',
        s: [
          { h: 'The name', t: 'Named after Ouranos, the Greek god of the sky. In Hindi it is commonly called Arun.' },
          { h: 'Discovery & history', t: 'On 13 March 1781 William Herschel spotted it from Bath, England, and first took it for a comet. It was the first planet found with a telescope and doubled the known size of the Solar System. Herschel wanted to call it “Georgium Sidus” after King George III. Older star catalogues had recorded it, unrecognised, as a star.' },
          { h: 'Missions', t: 'Only Voyager 2 has visited it, in January 1986.' },
          { h: 'Quick facts', t: 'It spins tilted by about 98°, practically rolling along its orbit. A year lasts about 84 Earth years. In a very dark sky it can just be seen without a telescope (magnitude about 5.7), but binoculars make it easy.' }
        ]
      },
      hi: {
        name: 'Arun (Uranus)', tag: 'Jhuka hua ice giant — telescope se khoja gaya pehla grah.',
        s: [
          { h: 'Naam', t: 'Greek aakash ke devta Ouranos ke naam par. Hindi me ise aam taur par Arun kehte hain.' },
          { h: 'Khoj aur itihaas', t: '13 March 1781 ko William Herschel ne ise Bath (England) se dekha aur pehle ise dumdaar tara samjha. Ye telescope se khoja gaya pehla grah tha aur isse Solar System ka gyaat size dugna ho gaya. Herschel ise King George III ke naam par “Georgium Sidus” kehna chahte the. Purane star catalogues me ye bina pehchane ek tare ke roop me darj tha.' },
          { h: 'Missions', t: 'Sirf Voyager 2 wahan gaya hai, January 1986 me.' },
          { h: 'Chhote facts', t: 'Ye lagbhag 98° jhuka hua ghoomta hai, jaise apne orbit par ludhak raha ho. Ek saal lagbhag 84 Prithvi-saal ka. Bahut andhere aasmaan me ye bina telescope ke bas dikh sakta hai (magnitude lagbhag 5.7), par binoculars se aasaani se dikhta hai.' }
        ]
      },
      src: [NASA('uranus'), WIKI('Uranus', 'Uranus'), WIKI('William Herschel', 'William_Herschel')]
    },

    neptune: {
      kind: 'planet', dev: 'वरुण', hindi: 'Varun', color: '#5b8def',
      en: {
        name: 'Neptune', tag: 'The farthest planet — found first by mathematics, then by telescope.',
        s: [
          { h: 'The name', t: 'Named after the Roman god of the sea, for its deep blue colour. In Hindi it is commonly called Varun.' },
          { h: 'Discovery & history', t: 'Astronomers noticed that Uranus was straying from its predicted path. Urbain Le Verrier in France and John Couch Adams in England independently calculated where an unseen planet must be. On 23 September 1846 Johann Galle at the Berlin Observatory found it within about one degree of Le Verrier’s prediction.' },
          { h: 'Missions', t: 'Only Voyager 2 has visited it, in August 1989.' },
          { h: 'Quick facts', t: 'It has the fastest winds of any planet, up to about 2,000 km/h. A year lasts about 165 Earth years; it completed its first orbit since discovery in 2011. Its large moon Triton orbits backwards. You need a telescope to see it (magnitude about 7.8).' }
        ]
      },
      hi: {
        name: 'Varun (Neptune)', tag: 'Sabse door ka grah — pehle ganit se mila, phir telescope se.',
        s: [
          { h: 'Naam', t: 'Roman samudra ke devta Neptune ke naam par, iske gehre neele rang ki wajah se. Hindi me ise aam taur par Varun kehte hain.' },
          { h: 'Khoj aur itihaas', t: 'Khagolshastriyon ne dekha ki Uranus apne anumaanit raaste se bhatak raha hai. France ke Urbain Le Verrier aur England ke John Couch Adams ne alag-alag ganit se nikala ki koi anjaana grah kahaan hona chahiye. 23 September 1846 ko Berlin Observatory ke Johann Galle ne ise Le Verrier ki bhavishyavani ke lagbhag ek degree ke andar khoj nikala.' },
          { h: 'Missions', t: 'Sirf Voyager 2 wahan gaya hai, August 1989 me.' },
          { h: 'Chhote facts', t: 'Kisi bhi grah ki sabse tez hawayein, lagbhag 2,000 km/h tak. Ek saal lagbhag 165 Prithvi-saal ka; 2011 me isne khoj ke baad apna pehla poora chakkar poora kiya. Iska bada chaand Triton ulta ghoomta hai. Ise dekhne ke liye telescope chahiye (magnitude lagbhag 7.8).' }
        ]
      },
      src: [NASA('neptune'), WIKI('Neptune', 'Neptune'), WIKI('Discovery of Neptune', 'Discovery_of_Neptune')]
    }
  };
  X.objectOrder = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
})(typeof window !== 'undefined' ? window : globalThis);
