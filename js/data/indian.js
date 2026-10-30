/* Cosmica — Indian astronomy: people, ideas and the 27 nakshatras. English + Hinglish (key "hi").
   Facts are well-established history; where traditions differ the text says so. Cultural/historical only — no astrology predictions. */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var W = function (title) { return { l: 'Wikipedia', u: 'https://en.wikipedia.org/wiki/' + title }; };
  var s = function (h, t) { return { h: h, t: t }; };

  X.indian = {
    people: [
      {
        id: 'aryabhata', name: 'Aryabhata', years: '476–c.550',
        en: { role: 'Mathematician-astronomer, author of the Aryabhatiya', s: [
          s('Who', 'Aryabhata was born in 476 CE and is thought to have worked at Kusumapura, near today’s Patna. He wrote the Aryabhatiya in about 499 CE, when he says he was 23.'),
          s('Contribution', 'He taught that the Earth spins on its axis, which is why the stars seem to move across the sky. He explained solar and lunar eclipses as shadows of the Earth and the Moon, not the work of Rahu. He also gave 3.1416 as a very good value of pi.'),
          s('Legacy', 'India’s first satellite, Aryabhata, launched on 19 April 1975, is named after him.')
        ] },
        hi: { role: 'Ganitagya-khagolshastri, Aryabhatiya ke lekhak', s: [
          s('Kaun the', 'Aryabhata ka janm 476 CE me hua tha aur maana jaata hai ki unhone Kusumapura (aaj ke Patna ke paas) me kaam kiya. Unhone Aryabhatiya lagbhag 499 CE me likhi, jab ve khud ke anusaar 23 saal ke the.'),
          s('Yogdaan', 'Unhone bataya ki Prithvi apni dhuri par ghoomti hai, isliye tare aasmaan me chalte dikhte hain. Surya aur Chandra grahan ko unhone Prithvi aur Chandrama ki parchhai se samjhaya, Rahu se nahi. Unhone pi ki bahut achhi value 3.1416 bhi di.'),
          s('Virasat', 'Bharat ka pehla satellite Aryabhata (19 April 1975 ko launch) unhi ke naam par hai.')
        ] },
        src: [W('Aryabhata'), W('Aryabhatiya')]
      },
      {
        id: 'varahamihira', name: 'Varahamihira', years: '505–587',
        en: { role: 'Astronomer and encyclopaedist of Ujjain', s: [
          s('Who', 'Varahamihira lived in the 6th century CE and worked in Ujjain, then a famous centre of astronomy.'),
          s('Contribution', 'His Pancha-siddhantika summarises five older astronomical schools, including the Surya Siddhanta, so it preserves knowledge that might otherwise be lost. His Brihat Samhita is a huge encyclopaedia covering the sky, weather, architecture and more.'),
          s('Legacy', 'His writings are a key source for historians of ancient Indian astronomy.')
        ] },
        hi: { role: 'Ujjain ke khagolshastri aur vishwakosh-lekhak', s: [
          s('Kaun the', 'Varahamihira 6th century CE me hue aur Ujjain me kaam kiya, jo us samay khagol ka mashhoor kendra tha.'),
          s('Yogdaan', 'Unki Pancha-siddhantika paanch purane khagol siddhanton ka saar hai, jisme Surya Siddhanta bhi shaamil hai, isliye wo gyaan surakshit raha. Unki Brihat Samhita ek vishaal vishwakosh hai jisme aasmaan, mausam, vastu aur bahut kuch hai.'),
          s('Virasat', 'Unke granth prachin Bharatiya khagol ke itihaaskaron ke liye bahut zaroori srot hain.')
        ] },
        src: [W('Varahamihira')]
      },
      {
        id: 'brahmagupta', name: 'Brahmagupta', years: '598–c.668',
        en: { role: 'Mathematician-astronomer, author of the Brahmasphutasiddhanta', s: [
          s('Who', 'Brahmagupta was born in 598 CE and worked in Bhillamala (Bhinmal) in Rajasthan; he is also linked with the Ujjain school of astronomy.'),
          s('Contribution', 'In 628 CE he wrote the Brahmasphutasiddhanta, which treats zero as a number with rules for using it, and gives rules for negative numbers. It also has methods for planetary positions and eclipses.'),
          s('Legacy', 'His rules for zero and negative numbers are among the earliest clear ones in the world.')
        ] },
        hi: { role: 'Ganitagya-khagolshastri, Brahmasphutasiddhanta ke lekhak', s: [
          s('Kaun the', 'Brahmagupta ka janm 598 CE me hua. Unhone Rajasthan ke Bhillamala (Bhinmal) me kaam kiya aur unhe Ujjain ki khagol parampara se bhi joda jaata hai.'),
          s('Yogdaan', '628 CE me unhone Brahmasphutasiddhanta likhi, jisme shunya ko ek sankhya maankar uske niyam diye gaye hain, aur negative sankhyaon ke niyam bhi hain. Isme grahon ki sthiti aur grahan nikalne ke tareeke bhi hain.'),
          s('Virasat', 'Shunya aur negative sankhyaon ke unke niyam duniya ke sabse pehle saaf niyamon me se hain.')
        ] },
        src: [W('Brahmagupta')]
      },
      {
        id: 'bhaskara2', name: 'Bhaskara II (Bhaskaracharya)', years: '1114–c.1185',
        en: { role: 'Mathematician-astronomer, author of the Siddhanta Shiromani', s: [
          s('Who', 'Bhaskara II was born in 1114 CE in the Deccan, near present-day Vijayapura in Karnataka, and later led the astronomical school at Ujjain.'),
          s('Contribution', 'His Siddhanta Shiromani (1150) has four parts, including Lilavati on arithmetic, Bijaganita on algebra, and Grahaganita and Goladhyaya on the planets and the celestial sphere. He gave the length of the year as about 365.2588 days.'),
          s('Legacy', 'Modern value of the sidereal year is 365.2564 days, so his figure was remarkably close. Lilavati is still a well-loved classic of Indian mathematics.')
        ] },
        hi: { role: 'Ganitagya-khagolshastri, Siddhanta Shiromani ke lekhak', s: [
          s('Kaun the', 'Bhaskara II ka janm 1114 CE me Deccan me hua, aaj ke Karnataka ke Vijayapura ke paas, aur baad me unhone Ujjain ki khagol shala sambhali.'),
          s('Yogdaan', 'Unki Siddhanta Shiromani (1150) ke chaar hisse hain: Lilavati (ankganit), Bijaganita (beejganit), aur Grahaganita tatha Goladhyaya (grah aur khagol gola). Unhone saal ki lambai lagbhag 365.2588 din batayi.'),
          s('Virasat', 'Sidereal saal ki aadhunik value 365.2564 din hai, yaani unka aankda bahut kareeb tha. Lilavati aaj bhi Bharatiya ganit ki pyaari classic hai.')
        ] },
        src: [W('Bhaskara_II')]
      },
      {
        id: 'madhava', name: 'Madhava of Sangamagrama', years: 'c.1340–c.1425',
        en: { role: 'Founder of the Kerala school of astronomy and mathematics', s: [
          s('Who', 'Madhava lived in Kerala around the 14th–15th century and started what is called the Kerala school, which went on for generations.'),
          s('Contribution', 'He found infinite series for sine, cosine and arctangent, centuries before they were rediscovered in Europe, and used them to compute pi to many decimal places. He also made tables for the Moon’s position.'),
          s('Legacy', 'Later Kerala astronomers such as Nilakantha Somayaji (who wrote the Tantrasamgraha in 1500) improved planetary models; Nilakantha’s model had the planets circling the Sun, which itself circled the Earth.')
        ] },
        hi: { role: 'Kerala khagol-ganit school ke sansthapak', s: [
          s('Kaun the', 'Madhava 14vi–15vi shatabdi ke aaspaas Kerala me rehte the aur unhone wo shuruat ki jise Kerala school kehte hain, jo kai peedhiyon tak chali.'),
          s('Yogdaan', 'Unhone sine, cosine aur arctangent ke anant shreni (infinite series) khoje, jo Europe me kai sadiyon baad dobara khoje gaye, aur inse pi ko kai decimal tak nikaala. Unhone Chandrama ki sthiti ke tables bhi banaye.'),
          s('Virasat', 'Baad ke Kerala khagolshastriyon, jaise Nilakantha Somayaji (jinhone 1500 me Tantrasamgraha likhi), ne grah-model sudhaare; Nilakantha ke model me grah Surya ke chakkar lagate the aur Surya Prithvi ke.')
        ] },
        src: [W('Madhava_of_Sangamagrama'), W('Kerala_school_of_astronomy_and_mathematics')]
      },
      {
        id: 'jaisingh', name: 'Sawai Jai Singh II', years: '1688–1743',
        en: { role: 'Maharaja of Amber, founder of Jaipur and builder of the Jantar Mantars', s: [
          s('Who', 'Jai Singh II was the ruler of Amber, founded the city of Jaipur in 1727, and was a keen astronomer.'),
          s('Contribution', 'He built five observatories called Jantar Mantar, at Delhi (1724), Jaipur, Ujjain, Varanasi and Mathura, using large stone and brick instruments. He also had astronomical tables prepared, the Zij-i Muhammad Shahi.'),
          s('Legacy', 'The Samrat Yantra in Jaipur, a giant sundial about 27 metres tall, is the world’s largest stone sundial. The Jantar Mantar of Jaipur is a UNESCO World Heritage Site (2010).')
        ] },
        hi: { role: 'Amber ke Maharaja, Jaipur ke sansthapak aur Jantar Mantar ke nirmata', s: [
          s('Kaun the', 'Jai Singh II Amber ke shasak the, unhone 1727 me Jaipur shehar basaya aur ve ek shaukeen khagolshastri bhi the.'),
          s('Yogdaan', 'Unhone Jantar Mantar naam ki paanch vedh-shalayein banayi: Delhi (1724), Jaipur, Ujjain, Varanasi aur Mathura, jisme bade patthar aur eent ke yantra the. Unhone Zij-i Muhammad Shahi naam ke khagol tables bhi taiyaar karwaye.'),
          s('Virasat', 'Jaipur ka Samrat Yantra, lagbhag 27 meter ooncha vishaal sundial, duniya ka sabse bada patthar ka sundial hai. Jaipur ka Jantar Mantar UNESCO World Heritage Site hai (2010).')
        ] },
        src: [W('Jai_Singh_II'), W('Jantar_Mantar')]
      },
      {
        id: 'saha', name: 'Meghnad Saha', years: '1893–1956',
        en: { role: 'Astrophysicist who explained how stars differ', s: [
          s('Who', 'Meghnad Saha was born on 6 October 1893 in a village near Dhaka (now in Bangladesh) and became one of India’s great physicists.'),
          s('Contribution', 'In 1920 he published the Saha ionisation equation, which links a star’s temperature to how ionised its gas is. It explained why stars show different spectral types and became a foundation of modern astrophysics.'),
          s('Legacy', 'He led the Calendar Reform Committee, which prepared India’s national calendar, adopted on 22 March 1957. He also founded the Saha Institute of Nuclear Physics in Kolkata.')
        ] },
        hi: { role: 'Astrophysicist jinhone bataya ki tare alag kyun hote hain', s: [
          s('Kaun the', 'Meghnad Saha ka janm 6 October 1893 ko Dhaka ke paas ek gaon me hua (aaj ka Bangladesh) aur ve Bharat ke bade bhautik-vigyaniyon me gine jaate hain.'),
          s('Yogdaan', '1920 me unhone Saha ionisation equation di, jo tare ke taapman ko uski gas ke ionisation se jodti hai. Isne samjhaya ki taron ke spectral type alag kyun hote hain aur ye aadhunik astrophysics ki neev bani.'),
          s('Virasat', 'Unhone Calendar Reform Committee ka netritva kiya, jisne Bharat ka rashtriya calendar banaya, jo 22 March 1957 ko apnaya gaya. Unhone Kolkata me Saha Institute of Nuclear Physics bhi banaya.')
        ] },
        src: [W('Meghnad_Saha')]
      },
      {
        id: 'chandrasekhar', name: 'Subrahmanyan Chandrasekhar', years: '1910–1995',
        en: { role: 'Astrophysicist, Nobel Prize in Physics 1983', s: [
          s('Who', 'Chandrasekhar was born on 19 October 1910 in Lahore (then British India) and later worked at the University of Chicago for most of his career.'),
          s('Contribution', 'He showed that a white dwarf star cannot be heavier than about 1.4 times the Sun’s mass; this is called the Chandrasekhar limit. Above it a star ends as a neutron star or black hole instead.'),
          s('Legacy', 'He shared the 1983 Nobel Prize in Physics with William Fowler. NASA’s Chandra X-ray Observatory, launched in 1999, is named after him.')
        ] },
        hi: { role: 'Astrophysicist, 1983 Physics Nobel Prize', s: [
          s('Kaun the', 'Chandrasekhar ka janm 19 October 1910 ko Lahore (tab British India) me hua aur baad me unhone zyadatar University of Chicago me kaam kiya.'),
          s('Yogdaan', 'Unhone dikhaya ki white dwarf tara Surya ke dravyaman ke lagbhag 1.4 guna se zyada bhaari nahi ho sakta; ise Chandrasekhar limit kehte hain. Isse upar tara neutron star ya black hole ban jaata hai.'),
          s('Virasat', 'Unhe William Fowler ke saath 1983 ka Physics Nobel Prize mila. NASA ki Chandra X-ray Observatory (1999 me launch) unhi ke naam par hai.')
        ] },
        src: [W('Subrahmanyan_Chandrasekhar'), W('Chandrasekhar_limit')]
      },
      {
        id: 'bappu', name: 'Vainu Bappu', years: '1927–1982',
        en: { role: 'Observational astronomer, father of modern Indian astrophysics', s: [
          s('Who', 'Manali Kalappa Vainu Bappu was born on 10 August 1927 in Chennai and led the Kodaikanal Observatory and later the Indian Institute of Astrophysics.'),
          s('Contribution', 'In 1949 he took part in discovering a comet, now called Bappu–Bok–Newkirk. With Olin Wilson he found the Wilson–Bappu effect, a link between the width of a calcium line in a star’s light and its true brightness.'),
          s('Legacy', 'He was elected President of the International Astronomical Union but died in 1982 before taking office. The Vainu Bappu Observatory at Kavalur in Tamil Nadu is named after him.')
        ] },
        hi: { role: 'Observational khagolshastri, aadhunik Bharatiya astrophysics ke pitamah', s: [
          s('Kaun the', 'Manali Kalappa Vainu Bappu ka janm 10 August 1927 ko Chennai me hua. Unhone Kodaikanal Observatory aur baad me Indian Institute of Astrophysics ka netritva kiya.'),
          s('Yogdaan', '1949 me ve ek dumdaar tare (comet) ki khoj me shaamil the, jo ab Bappu–Bok–Newkirk kehlaata hai. Olin Wilson ke saath unhone Wilson–Bappu effect khoja, jo tare ki roshni me calcium line ki chaudai ko uski asli chamak se jodta hai.'),
          s('Virasat', 'Ve International Astronomical Union ke President chune gaye the, par 1982 me padbhaar sambhalne se pehle unka nidhan ho gaya. Tamil Nadu ke Kavalur ki Vainu Bappu Observatory unhi ke naam par hai.')
        ] },
        src: [W('Vainu_Bappu')]
      },
      {
        id: 'sarabhai', name: 'Vikram Sarabhai', years: '1919–1971',
        en: { role: 'Physicist, founder of India’s space programme', s: [
          s('Who', 'Vikram Sarabhai was born on 12 August 1919 in Ahmedabad. He founded the Physical Research Laboratory (PRL) in Ahmedabad in 1947.'),
          s('Contribution', 'He led the creation of India’s space effort: the first rocket from the Thumba launching station near Thiruvananthapuram flew on 21 November 1963, and ISRO was formed on 15 August 1969.'),
          s('Legacy', 'He died on 30 December 1971. Today ISRO’s Vikram lander on Chandrayaan-2 and Chandrayaan-3 carries his name.')
        ] },
        hi: { role: 'Bhautik-vigyani, Bharat ke antariksh karyakram ke sansthapak', s: [
          s('Kaun the', 'Vikram Sarabhai ka janm 12 August 1919 ko Ahmedabad me hua. Unhone 1947 me Ahmedabad me Physical Research Laboratory (PRL) ki sthapna ki.'),
          s('Yogdaan', 'Unhone Bharat ke antariksh prayas ki neev rakhi: Thiruvananthapuram ke paas Thumba launching station se pehla rocket 21 November 1963 ko udaa, aur ISRO 15 August 1969 ko bana.'),
          s('Virasat', 'Unka nidhan 30 December 1971 ko hua. Aaj Chandrayaan-2 aur Chandrayaan-3 ke Vikram lander unke naam ko liye hue hain.')
        ] },
        src: [W('Vikram_Sarabhai'), W('Thumba_Equatorial_Rocket_Launching_Station')]
      },
      {
        id: 'dhawan', name: 'Satish Dhawan', years: '1920–2002',
        en: { role: 'Rocket scientist, ISRO chairman 1972–1984', s: [
          s('Who', 'Satish Dhawan was born on 25 September 1920 in Srinagar. He was a leading aerospace engineer and also headed the Indian Institute of Science in Bengaluru.'),
          s('Contribution', 'As chairman of ISRO (1972–1984) he guided the early satellite launch vehicles and the growth of the space programme after Vikram Sarabhai’s death.'),
          s('Legacy', 'India’s main launch site at Sriharikota is named the Satish Dhawan Space Centre in his honour.')
        ] },
        hi: { role: 'Rocket vigyani, ISRO ke chairman 1972–1984', s: [
          s('Kaun the', 'Satish Dhawan ka janm 25 September 1920 ko Srinagar me hua. Ve ek agrani aerospace engineer the aur Bengaluru ke Indian Institute of Science ke head bhi rahe.'),
          s('Yogdaan', 'ISRO ke chairman (1972–1984) ke roop me unhone shuruaati satellite launch vehicles aur Vikram Sarabhai ke baad antariksh karyakram ke vikas ko dishaa di.'),
          s('Virasat', 'Bharat ka mukhya launch site Sriharikota unke sammaan me Satish Dhawan Space Centre kehlaata hai.')
        ] },
        src: [W('Satish_Dhawan')]
      },
      {
        id: 'narlikar', name: 'Jayant Narlikar', years: '1938–2025',
        en: { role: 'Astrophysicist, cosmologist and science writer', s: [
          s('Who', 'Jayant Vishnu Narlikar was born on 19 July 1938 in Kolhapur and studied at Banaras Hindu University and Cambridge.'),
          s('Contribution', 'With Fred Hoyle he developed the Hoyle–Narlikar theory of gravity, an alternative way of thinking about cosmology. In 1988 he founded IUCAA, the Inter-University Centre for Astronomy and Astrophysics in Pune.'),
          s('Legacy', 'He wrote many books and talks that brought astronomy to ordinary readers in English and Marathi, and received the Padma Bhushan (1965) and Padma Vibhushan (2004).')
        ] },
        hi: { role: 'Astrophysicist, cosmologist aur vigyan lekhak', s: [
          s('Kaun the', 'Jayant Vishnu Narlikar ka janm 19 July 1938 ko Kolhapur me hua. Unhone Banaras Hindu University aur Cambridge me padhai ki.'),
          s('Yogdaan', 'Fred Hoyle ke saath unhone gravity ka Hoyle–Narlikar theory banaya, jo cosmology ko dekhne ka ek alag tareeka hai. 1988 me unhone Pune me IUCAA (Inter-University Centre for Astronomy and Astrophysics) ki sthapna ki.'),
          s('Virasat', 'Unhone angrezi aur Marathi me kai kitabein aur vyakhyan diye jinse khagol aam paathkon tak pahuncha. Unhe Padma Bhushan (1965) aur Padma Vibhushan (2004) mile.')
        ] },
        src: [W('Jayant_Narlikar')]
      }
    ],

    concepts: [
      {
        id: 'panchang',
        en: { h: 'Panchang — the five limbs of a day', t: 'A Panchang is an Indian almanac. Its name means “five limbs”: tithi (lunar day), vaara (weekday), nakshatra (the Moon’s star-group), yoga (a measure based on the combined motion of the Sun and Moon) and karana (half a tithi). Almanacs like this were used for festivals, farming and fixing the calendar, and each is calculated from real positions of the Sun and Moon.' },
        hi: { h: 'Panchang — din ke paanch ang', t: 'Panchang ek Bharatiya almanac hai. Iska naam “paanch ang” ka matlab hai: tithi (chandra din), vaara (hafte ka din), nakshatra (Chandrama ka tara-samooh), yoga (Surya aur Chandra ki milli gati par aadharit maap) aur karana (aadhi tithi). Aise almanac tyohaaron, kheti aur calendar tay karne me kaam aate the, aur har ang Surya-Chandra ki asli sthiti se nikaala jaata hai.' },
        src: [W('Panchangam')]
      },
      {
        id: 'tithi',
        en: { h: 'Tithi, Shukla and Krishna paksha', t: 'A tithi is the time the Moon takes to move 12° ahead of the Sun in the sky. There are 30 tithis in a lunar month, 15 in each half. The bright half, Shukla paksha, runs from Amavasya (new Moon) to Purnima (full Moon), and the dark half, Krishna paksha, runs from Purnima back to Amavasya. Because the Moon’s speed changes, a tithi lasts roughly 19 to 26 hours, which is why it does not line up neatly with the clock day.' },
        hi: { h: 'Tithi, Shukla aur Krishna paksha', t: 'Tithi wo samay hai jisme Chandrama aasmaan me Surya se 12° aage badhta hai. Ek chandra maas me 30 tithi hoti hain, har pakhwade me 15. Ujjwal pakhwada, Shukla paksha, Amavasya se Purnima tak chalta hai, aur andhera pakhwada, Krishna paksha, Purnima se wapas Amavasya tak. Chandrama ki gati badalti rehti hai, isliye ek tithi lagbhag 19 se 26 ghante ki hoti hai, aur ghadi ke din se saaf-saaf mel nahi khaati.' },
        src: [W('Tithi')]
      },
      {
        id: 'navagraha',
        en: { h: 'Navagraha and the weekdays', t: 'Navagraha means “nine grahas”: Surya (Sun), Chandra (Moon), Mangala (Mars), Budha (Mercury), Brihaspati (Jupiter), Shukra (Venus), Shani (Saturn), and the shadow points Rahu and Ketu. Rahu and Ketu are the two spots where the Moon’s orbit crosses the Sun’s path in the sky (the lunar nodes); eclipses happen when the Sun and Moon are near them, which is why they are linked with eclipses in tradition. Uranus and Neptune were discovered only in 1781 and 1846, so they are not in the old list. The seven weekdays are named after the Sun, Moon and five bright planets, for example Ravivaar, Somvaar and Shanivaar.' },
        hi: { h: 'Navagraha aur hafte ke din', t: 'Navagraha ka matlab “nau graha”: Surya, Chandra, Mangala, Budha, Brihaspati, Shukra, Shani, aur chhaya-bindu Rahu aur Ketu. Rahu aur Ketu wo do jagah hain jahan Chandrama ki kaksha Surya ke maarg ko kaatti hai (lunar nodes); grahan tab hote hain jab Surya aur Chandrama inke paas hote hain, isliye parampara me inhe grahan se joda jaata hai. Uranus aur Neptune ki khoj 1781 aur 1846 me hui, isliye ve puraani suchi me nahi hain. Hafte ke saat din Surya, Chandrama aur paanch chamakdaar grahon ke naam par hain, jaise Ravivaar, Somvaar aur Shanivaar.' },
        src: [W('Navagraha')]
      },
      {
        id: 'suryasiddhanta',
        en: { h: 'Surya Siddhanta', t: 'The Surya Siddhanta is an ancient Sanskrit astronomy text. The version that survives is usually dated to around the 4th–5th century CE and was revised later. It gives rules to work out the positions of the Sun, Moon and planets and to predict eclipses, and its sidereal year of about 365.2587 days is close to the modern 365.2564 days. It was one of the five schools summarised by Varahamihira.' },
        hi: { h: 'Surya Siddhanta', t: 'Surya Siddhanta ek prachin Sanskrit khagol granth hai. Jo sanskaran bacha hai use aam taur par 4thi–5vi shatabdi CE ke aaspaas ka maana jaata hai aur baad me ise sudhaara gaya. Isme Surya, Chandrama aur grahon ki sthiti nikaalne aur grahan batane ke niyam hain, aur iska lagbhag 365.2587 din ka sidereal saal aadhunik 365.2564 din ke kareeb hai. Ye un paanch schools me se ek tha jinka saar Varahamihira ne likha.' },
        src: [W('Surya_Siddhanta')]
      },
      {
        id: 'jantarmantar',
        en: { h: 'Jantar Mantar observatories', t: 'In the early 1700s Sawai Jai Singh II built five Jantar Mantar observatories, at Delhi (1724), Jaipur, Ujjain, Varanasi and Mathura (the Mathura one no longer exists). They use big masonry instruments you can walk around, such as the Samrat Yantra (a giant sundial), the Ram Yantra and the Jai Prakash Yantra, to measure the time, the Sun’s position and the stars without any telescope. The Jaipur Jantar Mantar was made a UNESCO World Heritage Site in 2010.' },
        hi: { h: 'Jantar Mantar vedh-shalayein', t: '1700 ke shuruaati dashkon me Sawai Jai Singh II ne paanch Jantar Mantar banwaye: Delhi (1724), Jaipur, Ujjain, Varanasi aur Mathura (Mathura wala ab maujood nahi hai). Inme bade patthar-eent ke yantra hain jinke aaspaas chala ja sakta hai, jaise Samrat Yantra (vishaal sundial), Ram Yantra aur Jai Prakash Yantra, jinse bina telescope ke samay, Surya ki sthiti aur taron ko naapa jaata tha. Jaipur ka Jantar Mantar 2010 me UNESCO World Heritage Site bana.' },
        src: [W('Jantar_Mantar'), W('Jantar_Mantar,_Jaipur')]
      },
      {
        id: 'ayanamsha',
        en: { h: 'Makar Sankranti, solstice and ayanamsha', t: 'Sankranti is the moment the Sun enters a new sign of the sidereal zodiac, the zodiac fixed against the stars. Makar Sankranti, around 14–15 January, marks the Sun entering Makara (Capricorn). The Earth’s axis slowly wobbles, which is called precession and takes roughly 26,000 years to go round, so the seasons drift against the stars. The gap between the seasonal (tropical) zodiac and the star-fixed (sidereal) zodiac is called the ayanamsha and is now about 24°. That is why Makar Sankranti falls about three weeks after the actual winter solstice, around 21–22 December.' },
        hi: { h: 'Makar Sankranti, solstice aur ayanamsha', t: 'Sankranti wo pal hai jab Surya sidereal rashi chakra (taron par tika hua) ki nayi rashi me pravesh karta hai. Makar Sankranti, lagbhag 14–15 January ko, Surya ke Makara (Capricorn) me pravesh ko darshaati hai. Prithvi ki dhuri dheere-dheere dagmagati hai, ise precession kehte hain aur ek chakkar me lagbhag 26,000 saal lagte hain, isliye mausam taron ke mukable khiskte rehte hain. Mausam par aadharit (tropical) aur taron par aadharit (sidereal) rashi chakra ke beech ke antar ko ayanamsha kehte hain aur ye ab lagbhag 24° hai. Isliye Makar Sankranti asli winter solstice (lagbhag 21–22 December) se kareeb teen hafte baad aati hai.' },
        src: [W('Makar_Sankranti'), W('Axial_precession')]
      },
      {
        id: 'saptarishi',
        en: { h: 'Saptarishi and Dhruva (the Pole Star)', t: 'In Indian tradition the seven bright stars of the Big Dipper, in Ursa Major, are the Saptarishi, the seven sages. The names in the lists differ between texts. Mizar, the middle star of the handle, is traditionally Vasistha, with its small companion Alcor as his wife Arundhati. Dhruva, the “fixed one”, is Polaris, the Pole Star, which sits less than 1° from the north celestial pole, so it hardly moves while the sky turns around it. Two stars of the Big Dipper’s bowl, Dubhe and Merak, point towards it. The Pole Star changes over thousands of years because of precession.' },
        hi: { h: 'Saptarishi aur Dhruva (Dhruv tara)', t: 'Bharatiya parampara me Ursa Major ke Big Dipper ke saat chamakdaar tare Saptarishi, yaani saat rishi, hain. Alag-alag granthon me naamon ki suchi alag hai. Mutthe ke beech ka tara Mizar parampara se Vasistha hai, aur uska chhota saathi Alcor unki patni Arundhati. Dhruva, “achal”, Polaris, yaani Dhruv tara hai, jo uttari khagoliya dhruv se 1° se bhi kam door hai, isliye aasmaan ghoomta hai par ye lagbhag nahi hilta. Big Dipper ke katore ke do tare, Dubhe aur Merak, uski taraf ishara karte hain. Precession ki wajah se hazaaron saalon me Dhruv tara badalta rehta hai.' },
        src: [W('Saptarishi'), W('Polaris')]
      },
      {
        id: 'eras',
        en: { h: 'Calendar eras: Vikram and Shaka', t: 'India uses several year-counts. The Vikram Samvat starts in 57 BCE, so the Vikram year is roughly the Gregorian year plus 57 (the exact change-over varies by region). The Shaka era starts in 78 CE, so the Shaka year is the Gregorian year minus 78 after the new year. India’s national civil calendar, based on the Shaka era, was adopted on 22 March 1957 after the Calendar Reform Committee led by Meghnad Saha. It is used alongside the Gregorian calendar for official purposes.' },
        hi: { h: 'Calendar samvat: Vikram aur Shaka', t: 'Bharat me saal ginne ke kai tareeke hain. Vikram Samvat 57 BCE se shuru hota hai, isliye Vikram saal lagbhag Gregorian saal + 57 hota hai (nayi saal ki tareekh alag-alag kshetron me alag hai). Shaka samvat 78 CE se shuru hota hai, isliye naye saal ke baad Shaka saal Gregorian saal − 78 hota hai. Bharat ka rashtriya civil calendar, jo Shaka samvat par aadharit hai, 22 March 1957 ko Meghnad Saha ki Calendar Reform Committee ke baad apnaya gaya. Ise sarkari kaamon me Gregorian calendar ke saath istemaal kiya jaata hai.' },
        src: [W('Vikram_Samvat'), W('Indian_national_calendar')]
      },
      {
        id: 'adhik',
        en: { h: 'Lunisolar calendar and Adhik Maas', t: 'Many Indian calendars follow both the Moon and the Sun. Twelve lunar months last about 354 days, roughly 11 days shorter than the solar year of about 365 days. To keep festivals in their seasons, an extra month, called Adhik Maas, is added about once every three years.' },
        hi: { h: 'Chandra-saur calendar aur Adhik Maas', t: 'Kai Bharatiya calendar Chandrama aur Surya dono ko follow karte hain. Barah chandra maas lagbhag 354 din ke hote hain, jo lagbhag 365 din ke saur varsh se karib 11 din chhote hain. Tyohaaron ko apne mausam me rakhne ke liye lagbhag har teen saal me ek atirikt mahina joda jaata hai, jise Adhik Maas kehte hain.' },
        src: [W('Adhik_maas')]
      },
      {
        id: 'nakshatra',
        en: { h: 'The nakshatras — the Moon’s 27 stations', t: 'The Moon goes around the sky in about 27.3 days, so Indian astronomers divided the Moon’s path into 27 equal parts of 13°20′, each named after a star or group of stars, called a nakshatra. Some traditions add a 28th, Abhijit, linked with Vega. The star identifications below are the commonly given ones and can vary slightly between texts and modern studies.' },
        hi: { h: 'Nakshatra — Chandrama ke 27 padav', t: 'Chandrama lagbhag 27.3 din me aasmaan ka ek chakkar lagata hai, isliye Bharatiya khagolshastriyon ne Chandrama ke raaste ko 13°20′ ke 27 barabar hisson me baanta, jinme se har ek ka naam kisi tare ya tara-samooh par hai, ise nakshatra kehte hain. Kuch paramparayein 28vi nakshatra Abhijit bhi jodti hain, jo Vega se juda hai. Neeche di gayi taron ki pehchaan aam taur par batayi jaane wali hain aur granthon tatha aadhunik adhyayanon me thodi alag ho sakti hain.' },
        src: [W('Nakshatra')]
      }
    ],

    nakshatras: [
      { n: 'Ashwini', star: { en: 'Commonly identified with β and γ Arietis', hi: 'Aam taur par β aur γ Arietis se joda jaata hai' } },
      { n: 'Bharani', star: { en: 'Commonly identified with 35, 39 and 41 Arietis', hi: 'Aam taur par 35, 39 aur 41 Arietis se joda jaata hai' } },
      { n: 'Krittika', star: { en: 'The Pleiades star cluster, in Taurus', hi: 'Pleiades tara-samooh, Taurus me' } },
      { n: 'Rohini', star: { en: 'Aldebaran (α Tauri)', hi: 'Aldebaran (α Tauri)' } },
      { n: 'Mrigashira', star: { en: 'Commonly identified with λ Orionis and the stars φ1, φ2 Orionis, the head of Orion', hi: 'Aam taur par λ Orionis aur φ1, φ2 Orionis, yaani Orion ke sir se joda jaata hai' } },
      { n: 'Ardra', star: { en: 'Betelgeuse (α Orionis)', hi: 'Betelgeuse (α Orionis)' } },
      { n: 'Punarvasu', star: { en: 'Castor and Pollux (α and β Geminorum)', hi: 'Castor aur Pollux (α aur β Geminorum)' } },
      { n: 'Pushya', star: { en: 'Commonly identified with γ, δ and θ Cancri', hi: 'Aam taur par γ, δ aur θ Cancri se joda jaata hai' } },
      { n: 'Ashlesha', star: { en: 'Commonly identified with stars of Hydra (δ, ε, η, ρ, σ Hydrae)', hi: 'Aam taur par Hydra ke taron (δ, ε, η, ρ, σ Hydrae) se joda jaata hai' } },
      { n: 'Magha', star: { en: 'Regulus (α Leonis)', hi: 'Regulus (α Leonis)' } },
      { n: 'Purva Phalguni', star: { en: 'Commonly identified with δ and θ Leonis', hi: 'Aam taur par δ aur θ Leonis se joda jaata hai' } },
      { n: 'Uttara Phalguni', star: { en: 'Denebola (β Leonis) and nearby stars', hi: 'Denebola (β Leonis) aur aaspaas ke tare' } },
      { n: 'Hasta', star: { en: 'Commonly identified with stars of Corvus', hi: 'Aam taur par Corvus ke taron se joda jaata hai' } },
      { n: 'Chitra', star: { en: 'Spica (α Virginis)', hi: 'Spica (α Virginis)' } },
      { n: 'Swati', star: { en: 'Arcturus (α Boötis)', hi: 'Arcturus (α Boötis)' } },
      { n: 'Vishakha', star: { en: 'Commonly identified with α, β, γ and ι Librae', hi: 'Aam taur par α, β, γ aur ι Librae se joda jaata hai' } },
      { n: 'Anuradha', star: { en: 'Commonly identified with β, δ and π Scorpii', hi: 'Aam taur par β, δ aur π Scorpii se joda jaata hai' } },
      { n: 'Jyeshtha', star: { en: 'Antares (α Scorpii) and its neighbours', hi: 'Antares (α Scorpii) aur uske paas ke tare' } },
      { n: 'Mula', star: { en: 'Shaula (λ Scorpii) and other stars in the tail of Scorpius', hi: 'Shaula (λ Scorpii) aur Scorpius ki poonch ke doosre tare' } },
      { n: 'Purva Ashadha', star: { en: 'Commonly identified with δ and ε Sagittarii', hi: 'Aam taur par δ aur ε Sagittarii se joda jaata hai' } },
      { n: 'Uttara Ashadha', star: { en: 'Commonly identified with ζ and σ Sagittarii', hi: 'Aam taur par ζ aur σ Sagittarii se joda jaata hai' } },
      { n: 'Shravana', star: { en: 'Altair (α Aquilae) with β and γ Aquilae', hi: 'Altair (α Aquilae), β aur γ Aquilae ke saath' } },
      { n: 'Dhanishta', star: { en: 'Commonly identified with stars of Delphinus', hi: 'Aam taur par Delphinus ke taron se joda jaata hai' } },
      { n: 'Shatabhisha', star: { en: 'Commonly identified with γ Aquarii', hi: 'Aam taur par γ Aquarii se joda jaata hai' } },
      { n: 'Purva Bhadrapada', star: { en: 'Markab and Scheat (α and β Pegasi)', hi: 'Markab aur Scheat (α aur β Pegasi)' } },
      { n: 'Uttara Bhadrapada', star: { en: 'Commonly identified with γ Pegasi (Algenib) and α Andromedae', hi: 'Aam taur par γ Pegasi (Algenib) aur α Andromedae se joda jaata hai' } },
      { n: 'Revati', star: { en: 'Commonly identified with ζ Piscium', hi: 'Aam taur par ζ Piscium se joda jaata hai' } }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
