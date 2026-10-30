/* Cosmica — quiz levels 1–2 (English + Hinglish). */
(function (root) { var X = root.Cosmica = root.Cosmica || {}; X.quizLevels = X.quizLevels || [];

  X.quizLevels.push({ id: 1, count: 10, title: {en:'Stargazer', hi:'Stargazer'},
    blurb: {en:'The basics of the Moon, Sun, planets and watching the sky — with a few common myths to bust.', hi:'Chandrama, Surya, grahon aur aasmaan dekhne ki basics — kuch aam galatfehmiyon ke saath.'},
    questions: [
    { q:{en:'Why does the Moon seem to change shape during the month?', hi:'Mahine bhar Chandrama ka shape badalta kyon dikhta hai?'},
      o:{en:['Earth’s shadow covers different parts of it','The Moon itself grows and shrinks','We see more or less of its sunlit half','Clouds in space block its light'],
         hi:['Prithvi ki parchhai uske alag hisse dhakti hai','Chandrama khud bada-chhota hota hai','Hume uska roshan aadha hissa kam-zyada dikhta hai','Antariksh ke badal uski roshni rokte hain']},
      a:2, e:{en:'Half of the Moon is always lit by the Sun. As it orbits Earth, we see a changing amount of that lit half. Earth’s shadow causes only lunar eclipses.', hi:'Chandrama ka aadha hissa hamesha Surya se roshan rehta hai. Prithvi ki parikrama karte hue hume us roshan hisse ka alag-alag bhaag dikhta hai. Prithvi ki parchhai sirf Chandra grahan banati hai.'} },

    { q:{en:'What mainly causes the seasons on Earth?', hi:'Prithvi par mausam badalne ka mukhya karan kya hai?'},
      o:{en:['Earth moves closer to and farther from the Sun','The tilt of Earth’s axis (about 23.5°)','The Sun’s heat changes every few months','The Moon’s pull on the oceans'],
         hi:['Prithvi Surya ke kabhi paas, kabhi door jaati hai','Prithvi ki dhuri ka jhukaav (lagbhag 23.5°)','Surya ki garmi har kuch mahine me badalti hai','Samundar par Chandrama ka khinchaav']},
      a:1, e:{en:'The tilt changes how directly sunlight hits each half of Earth over the year. Earth is actually closest to the Sun in early January, in northern winter.', hi:'Jhukaav ki wajah se saal bhar Prithvi ke har gole par dhoop ka kon badalta hai. Asal me Prithvi January ki shuruaat me Surya ke sabse paas hoti hai, jab uttari gole me sardi hoti hai.'} },

    { q:{en:'What kind of object is the Sun?', hi:'Surya kis tarah ka pind hai?'},
      o:{en:['A medium-sized star','A small planet that glows','A giant rock on fire','A giant comet'],
         hi:['Ek madhyam aakaar ka tara','Ek chhota chamakta grah','Ek jalti hui vishaal chattan','Ek vishaal dumdaar tara (comet)']},
      a:0, e:{en:'The Sun is a star: a huge ball of hot gas, mostly hydrogen and helium, powered by nuclear fusion in its core. It does not burn like a fire.', hi:'Surya ek tara hai: garam gas (zyadatar hydrogen aur helium) ka vishaal gola, jiska core nuclear fusion se chalta hai. Ye aag ki tarah nahi jalta.'} },

    { q:{en:'Why do the Sun and stars seem to rise and set every day?', hi:'Surya aur tare roz ugte aur doobte kyon dikhte hain?'},
      o:{en:['The Sun travels around Earth once a day','The Sun switches off at night','Earth goes around the Sun once a day','Earth spins on its axis about once a day'],
         hi:['Surya roz Prithvi ka ek chakkar lagata hai','Surya raat ko band ho jaata hai','Prithvi roz Surya ka ek chakkar lagati hai','Prithvi apni dhuri par lagbhag ek din me ek baar ghoomti hai']},
      a:3, e:{en:'Earth’s spin carries us toward the Sun and then away from it. Going around the Sun takes a whole year, not a day.', hi:'Prithvi ke ghoomne se hum Surya ki taraf aate aur phir door jaate hain. Surya ka ek chakkar poora hone me ek saal lagta hai, ek din nahi.'} },

    { q:{en:'Which planet has the hottest surface in the Solar System?', hi:'Solar System me sabse garam surface kis grah ki hai?'},
      o:{en:['Mercury','Venus','Mars','Jupiter'],
         hi:['Budh (Mercury)','Shukra (Venus)','Mangal (Mars)','Brihaspati (Jupiter)']},
      a:1, e:{en:'Venus’s thick carbon-dioxide air traps heat, giving about 465 °C on the surface. That is hotter than Mercury, even though Mercury is closer to the Sun.', hi:'Venus ka mota carbon-dioxide vaayumandal garmi rok leta hai, isliye wahan surface par lagbhag 465 °C hota hai. Ye Mercury se bhi zyada hai, jabki Mercury Surya ke zyada paas hai.'} },

    { q:{en:'How long does sunlight take to reach Earth?', hi:'Surya ki roshni Prithvi tak pahunchne me kitna samay leti hai?'},
      o:{en:['It arrives instantly','About 8 seconds','About 8 minutes','About 8 hours'],
         hi:['Turant pahunchti hai','Lagbhag 8 second','Lagbhag 8 minute','Lagbhag 8 ghante']},
      a:2, e:{en:'Light is very fast but not instant: it takes about 8 minutes 20 seconds to cross roughly 150 million km. So we see the Sun as it was a little while ago.', hi:'Roshni bahut tez hai par turant nahi: lagbhag 15 crore km tay karne me use 8 minute 20 second lagte hain. Isliye hum Surya ko thodi der pehle ki halat me dekhte hain.'} },

    { q:{en:'Who was the first Indian to travel into space, in 1984?', hi:'1984 me antariksh jaane wale pehle Bharatiya kaun the?'},
      o:{en:['Rakesh Sharma','Kalpana Chawla','Sunita Williams','Vikram Sarabhai'],
         hi:['Rakesh Sharma','Kalpana Chawla','Sunita Williams','Vikram Sarabhai']},
      a:0, e:{en:'Rakesh Sharma flew in 1984 on a Soviet Soyuz spacecraft and worked aboard the Salyut 7 space station. Kalpana Chawla flew much later, as a NASA astronaut.', hi:'Rakesh Sharma 1984 me ek Soviet Soyuz yaan se gaye aur Salyut 7 space station par kaam kiya. Kalpana Chawla bahut baad me, NASA astronaut ke roop me gayi thi.'} },

    { q:{en:'What helps you see the most stars on a clear night?', hi:'Saaf raat me sabse zyada tare dekhne me kya madad karta hai?'},
      o:{en:['Standing under a bright street lamp','Choosing a full Moon night','Using your phone screen at full brightness','A dark place far from city lights'],
         hi:['Tez street lamp ke neeche khade hona','Poornima ki raat chunna','Phone screen full brightness par rakhna','Shehar ki roshni se door andhera sthaan']},
      a:3, e:{en:'Bright lights and a full Moon wash out faint stars. Go somewhere dark and give your eyes about 20 minutes to adjust.', hi:'Tez roshni aur poornima ka chand halke taron ko dabा deta hai. Andhere sthaan par jaiye aur aankhon ko lagbhag 20 minute adjust hone dijiye.'} },

    { q:{en:'How can you watch a solar eclipse safely?', hi:'Surya grahan ko surakshit tareeke se kaise dekhein?'},
      o:{en:['With ordinary dark sunglasses','With certified solar-eclipse glasses or filters','With bare eyes for a few seconds only','Through a telescope with no filter'],
         hi:['Aam kaale chashme se','Certified solar-eclipse glasses ya filter se','Sirf kuch second nangi aankhon se','Bina filter ke telescope se']},
      a:1, e:{en:'Only certified solar filters block the harmful rays. Ordinary sunglasses are not safe, and a telescope without a filter can cause permanent eye damage in moments.', hi:'Sirf certified solar filter hi nuksaandeh kirnon ko rokte hain. Aam chashme surakshit nahi hain, aur bina filter ka telescope kuch hi pal me aankhon ko hamesha ke liye kharab kar sakta hai.'} },

    { q:{en:'Why do we always see the same face of the Moon?', hi:'Hume Chandrama ka hamesha ek hi hissa kyon dikhta hai?'},
      o:{en:['The Moon does not spin at all','Its far side is always dark','It spins once for each orbit of Earth','Earth’s shadow hides the other side'],
         hi:['Chandrama bilkul nahi ghoomta','Uska doosra hissa hamesha andhera rehta hai','Wo Prithvi ke ek chakkar me ek baar ghoomta hai','Prithvi ki parchhai doosra hissa chhupa leti hai']},
      a:2, e:{en:'The Moon spins once in the same time it takes to orbit Earth once, so the same side faces us. The far side gets sunlight just like the near side.', hi:'Chandrama utne hi samay me ek baar ghoomta hai jitne me wo Prithvi ka ek chakkar lagata hai, isliye wahi hissa hamari taraf rehta hai. Doosre hisse par bhi near side ki tarah dhoop padti hai.'} }
  ] });

  X.quizLevels.push({ id: 2, count: 20, title: {en:'Sky Explorer', hi:'Sky Explorer'},
    blurb: {en:'Eclipses, light-years, constellations, planet features and famous space missions, including India’s own.', hi:'Grahan, light-year, nakshatra-mandal, grahon ki khaasiyat aur mashhoor antariksh missions, Bharat ke apne missions samet.'},
    questions: [
    { q:{en:'A lunar eclipse can happen only at which Moon phase?', hi:'Chandra grahan Chandrama ki kis phase me ho sakta hai?'},
      o:{en:['New Moon','Full Moon','First quarter','Last quarter'],
         hi:['Amavasya (New Moon)','Poornima (Full Moon)','Pehla quarter','Aakhiri quarter']},
      a:1, e:{en:'Earth must lie between the Sun and the Moon, so the Moon is on the far side of Earth: a full Moon. It does not happen every month because the Moon’s orbit is slightly tilted.', hi:'Prithvi ko Surya aur Chandrama ke beech aana padta hai, yaani Chandrama Prithvi ke doosri taraf hota hai: poornima. Ye har mahine nahi hota kyonki Chandrama ki kaksha thodi jhuki hui hai.'} },

    { q:{en:'What happens during a total solar eclipse?', hi:'Poorn Surya grahan me kya hota hai?'},
      o:{en:['Earth’s shadow covers the Moon','The Sun’s light briefly switches off','A cloud of space dust hides the Sun','The Moon passes between Earth and the Sun'],
         hi:['Prithvi ki parchhai Chandrama ko dhak leti hai','Surya ki roshni kuch der ke liye band ho jaati hai','Antariksh ki dhool ka badal Surya ko chhupa leta hai','Chandrama Prithvi aur Surya ke beech aa jaata hai']},
      a:3, e:{en:'The Moon blocks the Sun’s disc for people standing in a narrow path of its shadow. It can happen only at new Moon.', hi:'Chandrama ki parchhai ke ek patle raaste me khade logon ke liye wo Surya ki disc ko dhak leta hai. Ye sirf amavasya ko ho sakta hai.'} },

    { q:{en:'Why can the Moon look reddish during a total lunar eclipse?', hi:'Poorn Chandra grahan me Chandrama laal sa kyon dikhta hai?'},
      o:{en:['Earth’s air bends red sunlight onto the Moon','The Moon heats up and glows red','Red light from Mars falls on it','Moon dust catches fire in the shadow'],
         hi:['Prithvi ki hawa laal dhoop ko Chandrama par modti hai','Chandrama garam hokar laal chamakne lagta hai','Mangal ki laal roshni us par padti hai','Parchhai me Chandrama ki dhool jalne lagti hai']},
      a:0, e:{en:'Earth’s atmosphere scatters away blue light and bends the remaining red-orange light into the shadow. It is like every sunrise and sunset on Earth glowing on the Moon.', hi:'Prithvi ka vaayumandal neeli roshni ko bikher deta hai aur bachi laal-narangi roshni ko parchhai me modta hai. Ye waisa hai jaise Prithvi ke saare sunrise aur sunset Chandrama par chamak rahe hon.'} },

    { q:{en:'What is a light-year?', hi:'Light-year kya hai?'},
      o:{en:['A very long year on a bright star','The time light takes to reach the Sun','The distance light travels in one year','The speed of light per year'],
         hi:['Kisi chamakdaar tare ka bahut lamba saal','Roshni ko Surya tak pahunchne ka samay','Roshni ek saal me jitni doori tay kare','Ek saal me roshni ki raftaar']},
      a:2, e:{en:'A light-year is a unit of distance, about 9.46 trillion km. It measures how far, not how long.', hi:'Light-year doori ki ikai hai, lagbhag 9.46 kharab km. Ye batati hai kitni door, kitni der nahi.'} },

    { q:{en:'A star is 100 light-years away. What do we see when we look at it?', hi:'Ek tara 100 light-year door hai. Use dekhne par hume kya dikhta hai?'},
      o:{en:['The star as it was about 100 years ago','The star exactly as it is tonight','The star as it will be in 100 years','Nothing, its light never arrives'],
         hi:['Tara waisa jaisa wo lagbhag 100 saal pehle tha','Tara bilkul waisa jaisa wo aaj raat hai','Tara waisa jaisa wo 100 saal baad hoga','Kuch nahi, uski roshni kabhi nahi pahunchti']},
      a:0, e:{en:'Its light needed 100 years to reach us, so we see the star as it was back then. Looking far away means looking into the past.', hi:'Uski roshni ko hum tak pahunchne me 100 saal lage, isliye hum tara waisa dekhte hain jaisa wo tab tha. Door dekhna yaani beete samay ko dekhna.'} },

    { q:{en:'Which bright reddish star marks a shoulder of Orion?', hi:'Orion ke kandhe par kaun sa chamakdaar laal-sa tara hai?'},
      o:{en:['Sirius','Aldebaran','Rigel','Betelgeuse'],
         hi:['Sirius','Aldebaran','Rigel','Betelgeuse']},
      a:3, e:{en:'Betelgeuse is a red supergiant at Orion’s shoulder. Rigel, a blue-white star, marks Orion’s foot on the opposite side.', hi:'Betelgeuse Orion ke kandhe par ek laal supergiant tara hai. Rigel, ek neela-safed tara, Orion ke doosri taraf ke pair ko dikhata hai.'} },

    { q:{en:'How can Saptarishi (the Big Dipper) help you find Polaris?', hi:'Saptarishi (Big Dipper) se Polaris kaise dhoondhein?'},
      o:{en:['Follow the curve of its handle downwards','Extend a line through the two pointer stars of the bowl','Look for the brightest star near its handle','Draw a line from its first star to its last'],
         hi:['Uske handle ke mod ko neeche ki taraf follow karein','Katori ke do pointer taron se seedhi rekha aage badhayein','Handle ke paas ka sabse chamakdaar tara dekhein','Uske pehle tare se aakhiri tare tak rekha kheenchein']},
      a:1, e:{en:'Dubhe and Merak, the two stars at the outer edge of the bowl, point toward Polaris (Dhruva Tara) when you extend the line about five times their gap.', hi:'Katori ke bahari kinare ke do tare, Dubhe aur Merak, apni doori ka lagbhag paanch guna rekha badhane par Polaris (Dhruva Tara) ki taraf ishara karte hain.'} },

    { q:{en:'Why does Polaris hardly move in the northern sky?', hi:'Uttari aasmaan me Polaris lagbhag ek jagah kyon tikka rehta hai?'},
      o:{en:['It is the closest star to Earth','It is the brightest star in the sky','Earth’s north axis points almost right at it','It travels along with Earth around the Sun'],
         hi:['Ye Prithvi ka sabse paas wala tara hai','Ye aasmaan ka sabse chamakdaar tara hai','Prithvi ki uttari dhuri lagbhag seedhe ise dikhati hai','Ye Prithvi ke saath Surya ki parikrama karta hai']},
      a:2, e:{en:'Polaris sits almost exactly in the direction of Earth’s rotation axis, so as Earth spins, other stars circle around it while it stays put.', hi:'Polaris lagbhag theek Prithvi ki dhuri ki disha me hai, isliye Prithvi ghoomti hai to baaki tare uske charon taraf chakkar lagate dikhte hain aur wo apni jagah rehta hai.'} },

    { q:{en:'Which star looks brightest in the night sky?', hi:'Raat ke aasmaan me sabse chamakdaar dikhne wala tara kaun sa hai?'},
      o:{en:['Sirius','Polaris','Betelgeuse','Vega'],
         hi:['Sirius','Polaris','Betelgeuse','Vega']},
      a:0, e:{en:'Sirius, in Canis Major, is the brightest star we see after the Sun, partly because it is close, about 8.6 light-years away. Polaris is only moderately bright.', hi:'Canis Major ka Sirius Surya ke baad hume dikhne wala sabse chamakdaar tara hai, ek wajah ye ki wo paas hai, lagbhag 8.6 light-year door. Polaris sirf madhyam chamak ka hai.'} },

    { q:{en:'What are Saturn’s rings mostly made of?', hi:'Shani (Saturn) ke chhalle zyadatar kis cheez ke bane hain?'},
      o:{en:['Solid rock slabs','Frozen methane clouds','Hot glowing gas','Chunks of water ice'],
         hi:['Thos chattan ke tukde','Jami hui methane ke badal','Garam chamakti gas','Paani ki barf ke tukde']},
      a:3, e:{en:'The rings are made mostly of water ice, in pieces from tiny grains to big boulders, all orbiting Saturn.', hi:'Chhalle zyadatar paani ki barf ke bane hain, chhote daanon se lekar bade patthar jaise tukdon tak, jo sab Saturn ki parikrama karte hain.'} },

    { q:{en:'Which planet has Olympus Mons, the tallest known volcano in the Solar System?', hi:'Olympus Mons, Solar System ka gyaat sabse ooncha jwalamukhi, kis grah par hai?'},
      o:{en:['Venus','Mars','Mercury','Earth'],
         hi:['Shukra (Venus)','Mangal (Mars)','Budh (Mercury)','Prithvi']},
      a:1, e:{en:'Olympus Mons on Mars is about 22 km high, roughly two and a half times the height of Mount Everest above sea level.', hi:'Mars ka Olympus Mons lagbhag 22 km ooncha hai, yaani samudra tal se Mount Everest ki oonchai ka lagbhag dhai guna.'} },

    { q:{en:'Which planet takes longer to spin once than to orbit the Sun?', hi:'Kaun sa grah apni dhuri par ek chakkar me Surya ki parikrama se zyada samay leta hai?'},
      o:{en:['Mercury','Mars','Venus','Jupiter'],
         hi:['Budh (Mercury)','Mangal (Mars)','Shukra (Venus)','Brihaspati (Jupiter)']},
      a:2, e:{en:'Venus spins very slowly, and backwards, once in about 243 Earth days. Its trip around the Sun takes only about 225 days.', hi:'Venus bahut dheere aur ulti disha me ghoomta hai, ek chakkar me lagbhag 243 Prithvi-din. Surya ki parikrama me use sirf lagbhag 225 din lagte hain.'} },

    { q:{en:'Who was the first human in space, on 12 April 1961?', hi:'12 April 1961 ko antariksh me jaane wale pehle insaan kaun the?'},
      o:{en:['Yuri Gagarin','Neil Armstrong','Alan Shepard','Valentina Tereshkova'],
         hi:['Yuri Gagarin','Neil Armstrong','Alan Shepard','Valentina Tereshkova']},
      a:0, e:{en:'Yuri Gagarin of the Soviet Union orbited Earth once aboard Vostok 1, in about 108 minutes. Tereshkova was the first woman in space, in 1963.', hi:'Soviet Union ke Yuri Gagarin ne Vostok 1 me Prithvi ka ek chakkar lagaya, lagbhag 108 minute me. Tereshkova 1963 me antariksh jaane wali pehli mahila thi.'} },

    { q:{en:'Apollo 11 landed on the Moon on 20 July 1969. Who first stepped onto the surface?', hi:'Apollo 11 20 July 1969 ko Chandrama par utra. Sabse pehle surface par kaun utre?'},
      o:{en:['Buzz Aldrin','Neil Armstrong','Michael Collins','Yuri Gagarin'],
         hi:['Buzz Aldrin','Neil Armstrong','Michael Collins','Yuri Gagarin']},
      a:1, e:{en:'Neil Armstrong stepped out first, followed by Buzz Aldrin. Michael Collins stayed in lunar orbit in the command module.', hi:'Neil Armstrong sabse pehle utre, unke baad Buzz Aldrin. Michael Collins command module me Chandrama ki kaksha me hi rahe.'} },

    { q:{en:'The James Webb Space Telescope mainly observes which kind of light?', hi:'James Webb Space Telescope mukhya roop se kis tarah ki roshni dekhta hai?'},
      o:{en:['X-rays','Ultraviolet','Infrared','Gamma rays'],
         hi:['X-rays','Ultraviolet','Infrared','Gamma rays']},
      a:2, e:{en:'Webb is an infrared telescope. Infrared light passes through dust and lets it see very distant, early galaxies.', hi:'Webb ek infrared telescope hai. Infrared roshni dhool ke aar-paar nikal jaati hai aur isse wo bahut door ki, shuruaati galaxies dekh paata hai.'} },

    { q:{en:'Chandrayaan-1 (2008), India’s first Moon mission, helped find signs of what?', hi:'Chandrayaan-1 (2008), Bharat ka pehla Moon mission, kis cheez ke sanket dhoondhne me madadgar raha?'},
      o:{en:['Active volcanoes on the surface','A thick atmosphere like Earth’s','Rivers of liquid water','Water molecules in the lunar soil'],
         hi:['Surface par sakriya jwalamukhi','Prithvi jaisa mota vaayumandal','Behte paani ki nadiyan','Chandrama ki mitti me paani ke molecules']},
      a:3, e:{en:'Instruments on Chandrayaan-1, including NASA’s Moon Mineralogy Mapper, found signs of water molecules in the lunar surface soil.', hi:'Chandrayaan-1 ke upkaranon, jisme NASA ka Moon Mineralogy Mapper bhi tha, ne Chandrama ki sateh ki mitti me paani ke molecules ke sanket paaye.'} },

    { q:{en:'With Chandrayaan-3’s soft landing on 23 Aug 2023, India became which country to do so?', hi:'23 Aug 2023 ko Chandrayaan-3 ki soft landing ke saath Bharat Chandrama par soft-landing karne wala kaun sa desh bana?'},
      o:{en:['Fourth','Third','Second','First'],
         hi:['Chautha','Teesra','Doosra','Pehla']},
      a:0, e:{en:'India followed the USSR, the USA and China. Chandrayaan-3’s lander Vikram touched down near the Moon’s south pole region and released the rover Pragyan.', hi:'Bharat Soviet Union, USA aur China ke baad aaya. Chandrayaan-3 ka lander Vikram Chandrama ke south pole ke ilaake ke paas utra aur usne rover Pragyan ko chhoda.'} },

    { q:{en:'What was special about Mangalyaan (MOM) entering Mars orbit on 24 Sep 2014?', hi:'24 Sep 2014 ko Mangalyaan (MOM) ke Mars ki kaksha me pahunchne ki kya khaas baat thi?'},
      o:{en:['It carried astronauts to Mars','India reached Mars orbit on its very first attempt','It landed a rover on Mars','It was the first mission ever sent to Mars'],
         hi:['Wo Mars tak astronauts le gaya','Bharat apni pehli hi koshish me Mars ki kaksha me pahuncha','Usne Mars par rover utaara','Wo Mars bheja gaya sabse pehla mission tha']},
      a:1, e:{en:'India became the first country to enter Mars orbit on its first try. Mangalyaan was an orbiter, so it did not land.', hi:'Bharat apni pehli koshish me hi Mars ki kaksha me pahunchne wala pehla desh bana. Mangalyaan ek orbiter tha, isliye wo utra nahi.'} },

    { q:{en:'Aditya-L1 (launched 2 Sep 2023) studies the Sun from near the L1 point. About how far from Earth is that?', hi:'Aditya-L1 (2 Sep 2023 ko launch) L1 bindu ke paas se Surya ko padhta hai. Wo Prithvi se lagbhag kitni door hai?'},
      o:{en:['About 15,000 km','About 150,000 km','About 1.5 million km','About 150 million km'],
         hi:['Lagbhag 15,000 km','Lagbhag 1,50,000 km','Lagbhag 15 lakh km','Lagbhag 15 crore km']},
      a:2, e:{en:'L1 is about 1.5 million km from Earth toward the Sun, only around 1% of the way there. The Sun itself is about 150 million km away.', hi:'L1 Prithvi se Surya ki taraf lagbhag 15 lakh km door hai, yaani raaste ka sirf 1% ke aaspaas. Surya khud lagbhag 15 crore km door hai.'} },

    { q:{en:'What was Aryabhata, launched on 19 April 1975?', hi:'19 April 1975 ko launch hua Aryabhata kya tha?'},
      o:{en:['India’s first Moon orbiter','India’s first Mars probe','India’s first space telescope','India’s first satellite'],
         hi:['Bharat ka pehla Moon orbiter','Bharat ka pehla Mars probe','Bharat ka pehla space telescope','Bharat ka pehla satellite']},
      a:3, e:{en:'Aryabhata was India’s first satellite, named after the ancient Indian astronomer-mathematician. It was launched from the Soviet Union on a Soviet rocket.', hi:'Aryabhata Bharat ka pehla satellite tha, jiska naam prachin Bharatiya khagolshastri-ganitagya ke naam par rakha gaya. Ise Soviet Union se Soviet rocket par launch kiya gaya.'} }
  ] });

})(typeof window !== 'undefined' ? window : globalThis);
