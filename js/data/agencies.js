/* Cosmica — space agencies of the world. English + Hinglish (key "hi").
   Agency and mission URLs were checked against official-domain search results on 2026-10-28 (see `checked`).
   A mission url of null means no exact official page was confirmed, so no link is shown. */
(function (root) {
  var X = root.Cosmica = root.Cosmica || {};
  var m = function (name, year, en, hi, url) { return { name: name, year: year, note: { en: en, hi: hi }, url: url || null }; };
  var ag = function (name, full, url, en, hi, missions) { return { name: name, full: full, url: url, about: { en: en, hi: hi }, missions: missions }; };

  X.agencies = { checked: '2026-10-28', countries: [

    { id: 'us', country: { en: 'United States', hi: 'Amrika (United States)' }, flag: '🇺🇸',
      agencies: [
        ag('NASA', 'National Aeronautics and Space Administration', 'https://www.nasa.gov/',
          'The US civil space agency, founded in 1958. It runs crewed spaceflight, robotic planetary probes, space telescopes and Earth-observing satellites.',
          'Amrika ki civil space agency, jo 1958 me bani. Yeh insaanon ki antariksh yatra, planets ke robotic probes, space telescopes aur Prithvi ko dekhne wale satellites chalati hai.',
          [
            m('Apollo 11', '1969', 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon.',
              'Neil Armstrong aur Buzz Aldrin Chand par chalne wale pehle insaan bane.', 'https://www.nasa.gov/mission/apollo-11/'),
            m('Voyager 1 & 2', '1977', 'Twin probes that toured the outer planets; both are now travelling in interstellar space.',
              'Do jodi probes jinhone bahari planets ki sair ki; ab dono interstellar space me chal rahi hain.', 'https://science.nasa.gov/mission/voyager/mission-overview/'),
            m('Hubble Space Telescope', '1990', 'A space telescope that has been imaging the cosmos from orbit for over three decades.',
              'Ek space telescope jo teen dashak se zyada samay se orbit se brahmand ki tasveerein le raha hai.', 'https://science.nasa.gov/mission/hubble/'),
            m('Perseverance rover', '2020', 'Launched in 2020, it landed in Jezero Crater on Mars in 2021 to search for signs of ancient life.',
              '2020 me launch hua, 2021 me Mangal ke Jezero Crater me utra, purane jeevan ke nishaan dhoondhne ke liye.', 'https://science.nasa.gov/mission/mars-2020-perseverance/'),
            m('James Webb Space Telescope', '2021', 'The largest space telescope, built with ESA and CSA, observing the Universe in infrared light.',
              'Sabse bada space telescope, ESA aur CSA ke saath bana, jo brahmand ko infrared roshni me dekhta hai.', 'https://science.nasa.gov/mission/webb/about-overview/')
          ])
      ] },

    { id: 'cn', country: { en: 'China', hi: 'Cheen (China)' }, flag: '🇨🇳',
      agencies: [
        ag('CNSA', 'China National Space Administration', 'https://www.cnsa.gov.cn/english/',
          'China\'s government space agency, established in 1993. It leads China\'s lunar and planetary exploration.',
          'Cheen ki sarkari space agency, jo 1993 me bani. Yeh Cheen ke Chand aur doosre grahon ke abhiyaanon ko lead karti hai.',
          [
            m('Chang\'e-4', '2019', 'The first spacecraft to make a soft landing on the far side of the Moon.',
              'Chand ke door wale hisse (far side) par soft landing karne wala pehla yaan.', 'https://www.cnsa.gov.cn/english/n6465652/n6465653/c6805049/content.html'),
            m('Chang\'e-5', '2020', 'Brought lunar soil samples back to Earth, the first Moon samples returned since the 1970s.',
              'Chand ki mitti ke namune Prithvi par laya, 1970 ke dashak ke baad pehli baar.', null),
            m('Tianwen-1', '2020', 'Launched in 2020; its orbiter and Zhurong rover reached Mars in 2021, a first Chinese Mars landing.',
              '2020 me launch hua; iska orbiter aur Zhurong rover 2021 me Mangal par pahunche, Cheen ki pehli Mangal landing.', 'https://www.cnsa.gov.cn/english/n6465652/n6465653/c6812005/content.html'),
            m('Chang\'e-6', '2024', 'Collected and returned the first samples ever taken from the far side of the Moon.',
              'Chand ke far side se pehli baar namune lekar Prithvi par laya.', 'https://www.cnsa.gov.cn/english/n6465652/n6465653/c10541840/content.html')
          ]),
        ag('CMSA', 'China Manned Space Agency', 'https://en.cmse.gov.cn/',
          'The body that runs China\'s crewed spaceflight programme, from the Shenzhou missions to the Tiangong space station.',
          'Woh sanstha jo Cheen ka crewed spaceflight programme chalati hai, Shenzhou missions se lekar Tiangong space station tak.',
          [
            m('Shenzhou-5', '2003', 'China\'s first crewed spaceflight; Yang Liwei became the first Chinese astronaut in orbit.',
              'Cheen ki pehli crewed antariksh udaan; Yang Liwei orbit me jane wale pehle Chinese astronaut bane.', 'https://en.cmse.gov.cn/missions/shenzhouv/'),
            m('Tiangong-2', '2016', 'A space laboratory used to test technologies for a permanent space station.',
              'Ek space laboratory jisme sthaayi space station ke liye technology parkhi gayi.', 'https://en.cmse.gov.cn/missions/TG2SL/'),
            m('Tianhe core module', '2021', 'The first module of the Tiangong space station, launched in 2021.',
              'Tiangong space station ka pehla module, jo 2021 me launch hua.', 'https://en.cmse.gov.cn/missions/CMTH/')
          ])
      ] },

    { id: 'ru', country: { en: 'Russia', hi: 'Russ (Russia)' }, flag: '🇷🇺',
      agencies: [
        ag('Roscosmos', 'State Space Corporation Roscosmos', 'https://en.roscosmos.ru/',
          'Russia\'s state space corporation, successor to the Soviet space programme that launched the first satellite and the first human into space.',
          'Russ ki sarkari space corporation, us Soviet space programme ki uttaradhikari jisne pehla satellite aur pehla insaan antariksh me bheja.',
          [
            m('Sputnik 1', '1957', 'The first artificial satellite, launched by the Soviet Union on 4 October 1957.',
              'Pehla kritrim (artificial) satellite, jo Soviet Union ne 4 October 1957 ko launch kiya.', null),
            m('Vostok 1', '1961', 'Yuri Gagarin became the first human in space and orbited Earth once.',
              'Yuri Gagarin antariksh me jane wale pehle insaan bane aur Prithvi ka ek chakkar lagaya.', null),
            m('Salyut 1', '1971', 'The world\'s first space station.',
              'Duniya ka pehla space station.', null),
            m('Mir', '1986', 'A modular Soviet/Russian space station that was occupied for years and hosted long-duration missions.',
              'Ek modular Soviet/Russi space station, jisme kai saal tak log rahe aur lambe mission hue.', null),
            m('Luna-25', '2023', 'Russia\'s first Moon mission in decades; it crashed on the Moon in August 2023.',
              'Kai dashak baad Russ ka pehla Chand mission; August 2023 me yeh Chand par crash ho gaya.', null)
          ])
      ] },

    { id: 'in', country: { en: 'India', hi: 'Bharat (India)' }, flag: '🇮🇳',
      agencies: [
        ag('ISRO', 'Indian Space Research Organisation', 'https://www.isro.gov.in/',
          'India\'s national space agency, founded in 1969 and headquartered in Bengaluru. It builds satellites and launch vehicles and runs the Moon, Mars and Sun missions.',
          'Bharat ki rashtriya space agency, jo 1969 me bani aur Bengaluru me hai. Yeh satellites aur rockets banati hai aur Chand, Mangal aur Surya ke mission chalati hai.',
          [
            m('Aryabhata', '1975', 'India\'s first satellite, launched in April 1975 on a Soviet rocket and named after the mathematician.',
              'Bharat ka pehla satellite, April 1975 me ek Soviet rocket se launch hua aur ganitagya Aryabhata ke naam par.', 'https://www.isro.gov.in/aryabhata_1.html'),
            m('Chandrayaan-1', '2008', 'India\'s first Moon mission; its instruments helped confirm water molecules on the lunar surface.',
              'Bharat ka pehla Chand mission; iske upkarnon ne Chand ki sataha par paani ke molecules ki pushti me madad ki.', 'https://www.isro.gov.in/Chandrayaan_1.html'),
            m('Mangalyaan (Mars Orbiter Mission)', '2013', 'Launched in 2013 and entered Mars orbit in 2014 on its first attempt.',
              '2013 me launch hua aur 2014 me pehli hi koshish me Mangal ki orbit me pahunch gaya.', 'https://www.isro.gov.in/ISRO_EN/MarsOrbiterMissionSpacecraft.html'),
            m('Chandrayaan-3', '2023', 'The lander and rover touched down near the Moon\'s south pole region in August 2023.',
              'Lander aur rover August 2023 me Chand ke dakshini dhruv ke paas utre.', 'https://www.isro.gov.in/Chandrayaan3_Details.html'),
            m('Aditya-L1', '2023', 'India\'s first space-based solar observatory, studying the Sun from near the Sun-Earth L1 point.',
              'Bharat ki pehli space-based solar observatory, jo Sun-Earth L1 point ke paas se Surya ka adhyayan karti hai.', 'https://www.isro.gov.in/Aditya_L1.html'),
            m('Gaganyaan', 'Planned', 'India\'s planned human spaceflight programme, meant to send an Indian crew to low Earth orbit and bring them back.',
              'Bharat ka planned manav antariksh yatra programme, jiska maqsad Bharatiya crew ko low Earth orbit me bhejkar surakshit wapas laana hai.', 'https://www.isro.gov.in/Gaganyaan.html')
          ])
      ] },

    { id: 'jp', country: { en: 'Japan', hi: 'Japan' }, flag: '🇯🇵',
      agencies: [
        ag('JAXA', 'Japan Aerospace Exploration Agency', 'https://global.jaxa.jp/about/',
          'Japan\'s aerospace agency, formed in 2003 by merging three earlier organisations. Known for asteroid sample-return missions and the Kibo module on the ISS.',
          'Japan ki aerospace agency, jo 2003 me teen purani sansthaon ko milakar bani. Asteroid sample-return missions aur ISS ke Kibo module ke liye jaani jaati hai.',
          [
            m('Hayabusa', '2003', 'Launched in 2003; in 2010 it returned the first samples ever collected from an asteroid (Itokawa).',
              '2003 me launch hua; 2010 me yeh asteroid (Itokawa) ke pehle namune Prithvi par laya.', 'https://www.isas.jaxa.jp/en/missions/spacecraft/past/hayabusa.html'),
            m('Akatsuki', '2010', 'A Venus climate orbiter launched in 2010; it entered Venus orbit in 2015 after a first attempt failed.',
              '2010 me launch hua Venus climate orbiter; pehli koshish fail hone ke baad 2015 me Shukra ki orbit me pahunchा.', 'https://global.jaxa.jp/projects/sas/planet_c/'),
            m('Hayabusa2', '2014', 'Launched in 2014; it brought samples from the asteroid Ryugu back to Earth in 2020.',
              '2014 me launch hua; 2020 me asteroid Ryugu ke namune Prithvi par laya.', 'https://www.isas.jaxa.jp/en/missions/spacecraft/current/hayabusa2.html'),
            m('Kibo module (ISS)', '2008', 'Japan\'s laboratory on the International Space Station, assembled in orbit from 2008.',
              'International Space Station par Japan ki laboratory, jo 2008 se orbit me jodi gayi.', 'https://global.jaxa.jp/projects/iss_human/kibo/'),
            m('SLIM', '2023', 'A Moon lander launched in 2023 to demonstrate pinpoint landing; it touched down in January 2024.',
              '2023 me launch hua Chand lander jo pinpoint landing dikhane ke liye bana tha; January 2024 me Chand par utra.', 'https://global.jaxa.jp/projects/sas/slim/')
          ])
      ] },

    { id: 'fr', country: { en: 'France', hi: 'France' }, flag: '🇫🇷',
      agencies: [
        ag('CNES', 'Centre national d\'études spatiales', 'https://cnes.fr/en',
          'The French space agency, created in 1961. It operates the Guiana Space Centre in Kourou and was the lead agency behind the early Ariane rockets.',
          'France ki space agency, jo 1961 me bani. Yeh Kourou ka Guiana Space Centre chalati hai aur shuruaati Ariane rockets ke peeche lead agency thi.',
          [
            m('Astérix', '1965', 'France\'s first satellite, launched on the French Diamant rocket, making France the third country to orbit its own satellite.',
              'France ka pehla satellite, French Diamant rocket se launch hua; France apna satellite orbit me bhejne wala teesra desh bana.', 'https://cnes.fr/actualites/y-50-ans-diamant-lancait-asterix-premier-satellite-francais'),
            m('Ariane 1', '1979', 'First launch of the Ariane rocket family from Kourou, in December 1979.',
              'Ariane rocket parivar ki pehli udaan Kourou se, December 1979 me.', 'https://cnes.fr/en/projects/ariane'),
            m('SPOT-1', '1986', 'The first satellite of the SPOT Earth-observation series, which went on to supply millions of images.',
              'SPOT Earth-observation series ka pehla satellite, jisne aage chalkar lakhon tasveerein dien.', 'https://cnes.fr/projets/spot/en-details'),
            m('CoRoT', '2006', 'A space telescope built to find exoplanets and study stars; it found the first known rocky exoplanet.',
              'Exoplanets dhoondhne aur taaron ko padhne ke liye bana space telescope; isne pehla gyaat rocky exoplanet dhoondha.', null),
            m('SWOT', '2022', 'A satellite built with NASA to map ocean height and the water of lakes and rivers.',
              'NASA ke saath bana satellite jo samundar ki oonchai aur jheelon-nadiyon ke paani ko map karta hai.', 'https://cnes.fr/en/projects/swot')
          ])
      ] },

    { id: 'it', country: { en: 'Italy', hi: 'Italy' }, flag: '🇮🇹',
      agencies: [
        ag('ASI', 'Agenzia Spaziale Italiana', 'https://www.asi.it/en/',
          'The Italian Space Agency, founded in 1988. It is a major contributor to ESA and runs national Earth-observation and science missions.',
          'Italy ki space agency, jo 1988 me bani. Yeh ESA me bada yogdaan deti hai aur apne Earth-observation aur science missions chalati hai.',
          [
            m('BeppoSAX', '1996', 'An Italian-Dutch X-ray satellite that pinned down the afterglows of gamma-ray bursts.',
              'Italy-Netherlands ka X-ray satellite jisne gamma-ray bursts ki afterglow ko pakda.', null),
            m('COSMO-SkyMed', '2007', 'A constellation of Earth-observing radar satellites, the first launched in 2007.',
              'Earth ko dekhne wale radar satellites ka samooh, jiska pehla satellite 2007 me launch hua.', 'https://www.asi.it/en/earth-science/cosmo-skymed/'),
            m('LARES', '2012', 'A laser-ranged satellite launched in 2012 to test predictions of general relativity.',
              '2012 me launch hua laser-ranged satellite jo general relativity ki bhavishyavaniyon ko parakhta hai.', 'https://www.asi.it/en/earth-science/lares/'),
            m('LICIACube', '2022', 'A small Italian satellite that photographed the result of NASA\'s DART asteroid impact.',
              'Ek chhota Italian satellite jisne NASA ke DART asteroid takraav ke nateeje ki tasveerein li.', 'https://www.asi.it/en/2022/09/liciacube-here-come-the-first-images-captured-by-an-italian-satellite-in-the-deep-space/')
          ])
      ] },

    { id: 'de', country: { en: 'Germany', hi: 'Germany (Jarmani)' }, flag: '🇩🇪',
      agencies: [
        ag('DLR', 'Deutsches Zentrum für Luft- und Raumfahrt (German Aerospace Center)', 'https://www.dlr.de/en/dlr',
          'Germany\'s national research centre for aeronautics and space. The German Space Agency is part of DLR and manages Germany\'s role in ESA.',
          'Germany ka rashtriya aeronautics aur space research centre. German Space Agency DLR ka hissa hai aur ESA me Germany ki bhumika sambhalti hai.',
          [
            m('Mars Express HRSC camera', '2003', 'The High Resolution Stereo Camera on ESA\'s Mars Express, led by DLR, has mapped Mars in 3D since 2004.',
              'ESA ke Mars Express par DLR ka High Resolution Stereo Camera, jo 2004 se Mangal ka 3D naksha bana raha hai.', 'https://www.dlr.de/en/research-and-transfer/projects-and-missions/mars-express/hrsc-high-resolution-stereo-camera'),
            m('TerraSAR-X', '2007', 'A German radar Earth-observation satellite launched in 2007.',
              '2007 me launch hua German radar Earth-observation satellite.', null),
            m('Philae lander', '2014', 'DLR led the lander that made the first soft landing on a comet, in November 2014.',
              'DLR ne us lander ko lead kiya jisne November 2014 me kisi comet par pehli soft landing ki.', 'https://www.dlr.de/en/blog/archive/2024/ten-years-ago-philae-becomes-first-probe-to-land-on-a-comet'),
            m('MASCOT', '2018', 'A small lander built with France that hopped on asteroid Ryugu after riding on Japan\'s Hayabusa2.',
              'France ke saath bana chhota lander jo Japan ke Hayabusa2 par sawar hokar asteroid Ryugu par pahunchा aur uchhal-uchhal kar chala.', 'https://www.dlr.de/en/research-and-transfer/projects-and-missions/hayabusa2'),
            m('EnMAP', '2022', 'A German hyperspectral satellite launched in 2022 to monitor Earth\'s environment.',
              '2022 me launch hua German hyperspectral satellite jo Prithvi ke paryavaran par nazar rakhta hai.', null)
          ])
      ] },

    { id: 'gb', country: { en: 'United Kingdom', hi: 'United Kingdom (Britain)' }, flag: '🇬🇧',
      agencies: [
        ag('UK Space Agency', 'UK Space Agency', 'https://www.gov.uk/government/organisations/uk-space-agency',
          'The UK government\'s space agency, set up in 2010. It funds space science, regulates UK launches and supports the British space industry.',
          'UK sarkar ki space agency, jo 2010 me bani. Yeh space science ko fund karti hai, UK ke launches ko regulate karti hai aur British space industry ko support karti hai.',
          [
            m('Prospero', '1971', 'Heritage: Britain\'s only satellite launched on a British rocket (Black Arrow), long before the agency existed.',
              'Virasat: Britain ka akela satellite jo British rocket (Black Arrow) se launch hua, agency ke banne se bahut pehle.', null),
            m('Beagle 2', '2003', 'Heritage: a British-led Mars lander; contact was lost, and it was later found on the surface.',
              'Virasat: British-led Mangal lander; sampark toot gaya aur baad me yeh sataha par mila.', null),
            m('TechDemoSat-1', '2014', 'A UK satellite launched in 2014 to test new technologies in orbit.',
              '2014 me launch hua UK ka satellite jo orbit me nayi technologies parakhne ke liye tha.', null),
            m('Principia (Tim Peake)', '2015', 'British ESA astronaut Tim Peake spent about six months on the ISS from late 2015.',
              'British ESA astronaut Tim Peake 2015 ke ant se lagbhag chhe mahine ISS par rahe.', 'https://www.gov.uk/government/people/tim-peake'),
            m('NovaSAR-1', '2018', 'A small British radar satellite launched in 2018 for Earth observation.',
              '2018 me launch hua chhota British radar satellite jo Earth observation ke liye hai.', null)
          ])
      ] },

    { id: 'kr', country: { en: 'South Korea', hi: 'South Korea (Dakshin Korea)' }, flag: '🇰🇷',
      agencies: [
        ag('KASA', 'Korea AeroSpace Administration', 'https://www.kasa.go.kr/eng/index.do',
          'South Korea\'s space agency, established in 2024. It builds on the earlier work of KARI and runs the Nuri rocket and lunar programmes.',
          'South Korea ki space agency, jo 2024 me bani. Yeh KARI ke pehle ke kaam par aage badhti hai aur Nuri rocket tatha Chand ke programmes chalati hai.',
          [
            m('Naro-1 (KSLV-I)', '2013', 'South Korea\'s first successful rocket launch from its own soil, in January 2013 (before KASA, by KARI).',
              'South Korea ki apni zameen se pehli safal rocket udaan, January 2013 me (KASA se pehle, KARI dwara).', null),
            m('Danuri (KPLO)', '2022', 'South Korea\'s first Moon mission, launched in 2022 (developed by KARI, before KASA).',
              'South Korea ka pehla Chand mission, 2022 me launch hua (KARI ne banaya, KASA se pehle).', null),
            m('Nuri (KSLV-II)', '2022', 'South Korea\'s homegrown launch vehicle, which reached orbit successfully in 2022.',
              'South Korea ka swadeshi launch vehicle, jo 2022 me safaltapoorvak orbit me pahunchा.', null),
            m('Nuri\'s fourth launch', '2025', 'The fourth Nuri launch on 27 November 2025, the first one run under KASA.',
              'Nuri ki chauthi udaan 27 November 2025 ko, jo KASA ke tahat pehli thi.', 'https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000041/view.do?bbsId=BBSMSTR_000000000041&nttId=B000000002451Qi6kR4')
          ])
      ] }

  ],
  multinational: [
    ag('ESA', 'European Space Agency', 'https://www.esa.int/',
      'Europe\'s gateway to space, an intergovernmental organisation founded in 1975 with headquarters in Paris. Member states pool their resources for science, launchers and Earth observation.',
      'Europe ka antariksh ka dwaar, ek antar-sarkari sangathan jo 1975 me bana aur jiska headquarters Paris me hai. Sadasya desh vigyan, launchers aur Earth observation ke liye milkar sansadhan lagate hain.',
      [
        m('Giotto', '1985', 'Launched in 1985; it flew close to Halley\'s Comet in 1986 and sent back the first close-up images of a comet nucleus.',
          '1985 me launch hua; 1986 me Halley ke comet ke bahut paas se guzra aur comet ke nucleus ki pehli kareeb se tasveerein bheji.', 'https://www.esa.int/Science_Exploration/Space_Science/Giotto_overview'),
        m('Huygens', '2005', 'ESA\'s probe landed on Saturn\'s moon Titan on 14 January 2005, the farthest landing from Earth at that time.',
          'ESA ki probe 14 January 2005 ko Shani ke chand Titan par utri, jo us waqt Prithvi se sabse door ki landing thi.', null),
        m('Rosetta', '2004', 'Launched in 2004; it orbited comet 67P and delivered the Philae lander in 2014.',
          '2004 me launch hua; comet 67P ki orbit me gaya aur 2014 me Philae lander ko utara.', 'https://www.esa.int/Science_Exploration/Space_Science/Cometary_missions'),
        m('Gaia', '2013', 'A space observatory launched in 2013 to map the positions and motions of billions of stars in the Milky Way.',
          '2013 me launch hua space observatory jo Milky Way ke arabon taaron ki sthiti aur gati ka naksha banata hai.', null),
        m('Juice', '2023', 'Launched in 2023 to study Jupiter and its icy moons Ganymede, Callisto and Europa.',
          '2023 me launch hua, Brihaspati aur uske barfeele chandon Ganymede, Callisto tatha Europa ka adhyayan karne ke liye.', null)
      ])
  ] };
})(typeof window !== 'undefined' ? window : globalThis);
