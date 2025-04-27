
const words = [
  // Animals (your completed entries)
  {
    name: "sapa",
    image: require("../assets/app_emojis/giraffe.png"),
    audio: null,
    translation: "giraffe",
    english_sentence: "The giraffe has a long neck.",
    bisaya_sentence: "Ang sapa adunay taas nga liog.",
  }, // Giraffe
  {
    name: "iro",
    image: require("../assets/app_emojis/dog.png"),
    audio: null,
    translation: "dog",
    english_sentence: "The dog barks at the gate.",
    bisaya_sentence: "Ang iro nagtahol sa ganghaan.",
  }, // Dog
  {
    name: "iring",
    image: require("../assets/app_emojis/cat.png"),
    audio: null,
    translation: "cat",
    english_sentence: "The cat sleeps on the mat.",
    bisaya_sentence: "Ang iring natulog sa banig.",
  }, // Cat
  // Animals (remaining)
  {
    name: "sebra",
    image: require("../assets/app_emojis/zebra.png"),
    audio: null,
    translation: "zebra",
    english_sentence: "The zebra runs in the field.",
    bisaya_sentence: "Ang sebra nagdagan sa uma.",
  }, // Zebra
  {
    name: "bison",
    image: require("../assets/app_emojis/bison.png"),
    audio: null,
    translation: "bison",
    english_sentence: "The bison grazes on the grass.",
    bisaya_sentence: "Ang bison nagkaon og sagbot.",
  }, // Bison
  {
    name: "mamot",
    image: require("../assets/app_emojis/mammoth.png"),
    audio: null,
    translation: "mammoth",
    english_sentence: "The mammoth has big tusks.",
    bisaya_sentence: "Ang mamot adunay dagkong sungay.",
  }, // Mammoth
  {
    name: "rinoceronte",
    image: require("../assets/app_emojis/rhinoceros.png"),
    audio: null,
    translation: "rhinoceros",
    english_sentence: "The rhinoceros has a strong horn.",
    bisaya_sentence: "Ang rinoceronte adunay lig-on nga sungay.",
  }, // Rhinoceros
  {
    name: "hipopotamo",
    image: require("../assets/app_emojis/hippopotamus.png"),
    audio: null,
    translation: "hippopotamus",
    english_sentence: "The hippopotamus swims in the river.",
    bisaya_sentence: "Ang hipopotamo naglangoy sa suba.",
  }, // Hippopotamus
  {
    name: "kangaroo",
    image: require("../assets/app_emojis/kangaroo.png"),
    audio: null,
    translation: "kangaroo",
    english_sentence: "The kangaroo jumps very high.",
    bisaya_sentence: "Ang kangaroo nagtumpo og taas kaayo.",
  }, // Kangaroo
  {
    name: "llama",
    image: require("../assets/app_emojis/llama.png"),
    audio: null,
    translation: "llama",
    english_sentence: "The llama walks in the mountains.",
    bisaya_sentence: "Ang llama naglakaw sa kabukiran.",
  }, // Llama
  {
    name: "paboreal",
    image: require("../assets/app_emojis/peacock.png"),
    audio: null,
    translation: "peacock",
    english_sentence: "The peacock shows its colorful feathers.",
    bisaya_sentence: "Ang paboreal nagpakita sa iyang kolor nga balhibo.",
  }, // Peacock
  {
    name: "loro",
    image: require("../assets/app_emojis/parrot.png"),
    audio: null,
    translation: "parrot",
    english_sentence: "The parrot talks in the tree.",
    bisaya_sentence: "Ang loro nagsulti sa kahoy.",
  }, // Parrot
  {
    name: "elepante",
    image: require("../assets/app_emojis/elephant.png"),
    audio: null,
    translation: "elephant",
    english_sentence: "The elephant sprays water with its trunk.",
    bisaya_sentence: "Ang elepante nag-spray og tubig gamit ang iyang nguso.",
  }, // Elephant
  {
    name: "ilaga",
    image: require("../assets/app_emojis/mouse.png"),
    audio: null,
    translation: "mouse",
    english_sentence: "The mouse eats a small piece of cheese.",
    bisaya_sentence: "Ang ilaga nagkaon og gamay nga keso.",
  }, // Mouse
  {
    name: "hamster",
    image: require("../assets/app_emojis/hamster.png"),
    audio: null,
    translation: "hamster",
    english_sentence: "The hamster runs in its wheel.",
    bisaya_sentence: "Ang hamster nagdagan sa iyang ligid.",
  }, // Hamster
  {
    name: "koneho",
    image: require("../assets/app_emojis/rabbit.png"),
    audio: null,
    translation: "rabbit",
    english_sentence: "The rabbit hops in the garden.",
    bisaya_sentence: "Ang koneho nagtumpo sa tanaman.",
  }, // Rabbit
  {
    name: "oso",
    image: require("../assets/app_emojis/bear.png"),
    audio: null,
    translation: "bear",
    english_sentence: "The bear sleeps in a cave.",
    bisaya_sentence: "Ang oso natulog sa langub.",
  }, // Bear
  {
    name: "lobo",
    image: require("../assets/app_emojis/wolf.png"),
    audio: null,
    translation: "wolf",
    english_sentence: "The wolf howls at the moon.",
    bisaya_sentence: "Ang lobo nag-uwol sa bulan.",
  }, // Wolf
  {
    name: "sora",
    image: require("../assets/app_emojis/fox.png"),
    audio: null,
    translation: "fox",
    english_sentence: "The fox hides in the forest.",
    bisaya_sentence: "Ang sora nagtago sa lasang.",
  }, // Fox
  {
    name: "leon",
    image: require("../assets/app_emojis/lion.png"),
    audio: null,
    translation: "lion",
    english_sentence: "The lion roars in the jungle.",
    bisaya_sentence: "Ang leon nagngulob sa lasang.",
  }, // Lion
  // Plants/Food (your completed entries)
  {
    name: "abukado",
    image: require("../assets/app_emojis/avocado.png"),
    audio: null,
    translation: "avocado",
    english_sentence: "Paul likes to eat avocado.",
    bisaya_sentence: "Si Paul ganahan mokaon og abukado.",
  }, // Avocado
  {
    name: "rosas",
    image: require("../assets/app_emojis/rose.png"),
    audio: null,
    translation: "rose",
    english_sentence: "Maria picks a red rose.",
    bisaya_sentence: "Si Maria nagpili og pula nga rosas.",
  }, // Rose
  // Plants/Food (remaining)
  {
    name: "karot",
    image: require("../assets/app_emojis/carrot.png"),
    audio: null,
    translation: "carrot",
    english_sentence: "Maria eats a crunchy carrot.",
    bisaya_sentence: "Si Maria nagkaon og crispy nga karot.",
  }, // Carrot
  {
    name: "patatas",
    image: require("../assets/app_emojis/potato.png"),
    audio: null,
    translation: "potato",
    english_sentence: "Paul cooks a potato for dinner.",
    bisaya_sentence: "Si Paul nagluto og patatas para sa panihapon.",
  }, // Potato
  {
    name: "mais",
    image: require("../assets/app_emojis/corn.png"),
    audio: null,
    translation: "corn",
    english_sentence: "The corn grows in the field.",
    bisaya_sentence: "Ang mais mitubo sa uma.",
  }, // Corn
  {
    name: "binhi",
    image: require("../assets/app_emojis/seedling.png"),
    audio: null,
    translation: "seedling",
    english_sentence: "Maria plants a seedling in the garden.",
    bisaya_sentence: "Si Maria nagtanom og binhi sa tanaman.",
  }, // Seedling
  {
    name: "saha",
    image: require("../assets/app_emojis/herb.png"),
    audio: null,
    translation: "herb",
    english_sentence: "Paul uses an herb to cook soup.",
    bisaya_sentence: "Si Paul naggamit og saha para magluto og sabaw.",
  }, // Herb
  {
    name: "klabera",
    image: require("../assets/app_emojis/four_leaf_clover.png"),
    audio: null,
    translation: "four-leaf clover",
    english_sentence: "Maria finds a four-leaf clover.",
    bisaya_sentence: "Si Maria nakakita og klabera.",
  }, // Four-leaf clover
  {
    name: "dahon_maple",
    image: require("../assets/app_emojis/maple_leaf.png"),
    audio: null,
    translation: "maple leaf",
    english_sentence: "The maple leaf falls from the tree.",
    bisaya_sentence: "Ang dahon_maple nahulog gikan sa kahoy.",
  }, // Maple leaf
  {
    name: "nahulog_dahon",
    image: require("../assets/app_emojis/fallen_leaf.png"),
    audio: null,
    translation: "fallen leaf",
    english_sentence: "Paul sees a fallen leaf on the ground.",
    bisaya_sentence: "Si Paul nakakita og nahulog nga dahon sa yuta.",
  }, // Fallen leaf
  {
    name: "mga_dahon",
    image: require("../assets/app_emojis/leaves.png"),
    audio: null,
    translation: "leaves",
    english_sentence: "The leaves blow in the wind.",
    bisaya_sentence: "Ang mga dahon gihuyop sa hang477in.",
  }, // Leaves
  {
    name: "kabute",
    image: require("../assets/app_emojis/mushroom.png"),
    audio: null,
    translation: "mushroom",
    english_sentence: "Maria finds a mushroom in the forest.",
    bisaya_sentence: "Si Maria nakakita og kabute sa lasang.",
  }, // Mushroom
  {
    name: "humay",
    image: require("../assets/app_emojis/sheaf_of_rice.png"),
    audio: null,
    translation: "rice plant",
    english_sentence: "The rice plant grows in the field.",
    bisaya_sentence: "Ang humay mitubo sa uma.",
  }, // Sheaf of rice
  {
    name: "bukay",
    image: require("../assets/app_emojis/bouquet.png"),
    audio: null,
    translation: "bouquet",
    english_sentence: "Paul gives Maria a bouquet of flowers.",
    bisaya_sentence: "Si Paul naghatag kang Maria og bukay sa mga bulak.",
  }, // Bouquet
  {
    name: "tulipan",
    image: require("../assets/app_emojis/tulip.png"),
    audio: null,
    translation: "tulip",
    english_sentence: "Maria plants a tulip in the garden.",
    bisaya_sentence: "Si Maria nagtanom og tulipan sa tanaman.",
  }, // Tulip
  {
    name: "laylay_bulak",
    image: require("../assets/app_emojis/wilted_flower.png"),
    audio: null,
    translation: "wilted flower",
    english_sentence: "The wilted flower needs water.",
    bisaya_sentence: "Ang laylay nga bulak nagkinahanglan og tubig.",
  }, // Wilted flower
  {
    name: "mirasol",
    image: require("../assets/app_emojis/sunflower.png"),
    audio: null,
    translation: "sunflower",
    english_sentence: "The sunflower faces the sun.",
    bisaya_sentence: "Ang mirasol nag-atubang sa adlaw.",
  }, // Sunflower
  {
    name: "bulak",
    image: require("../assets/app_emojis/blossom.png"),
    audio: null,
    translation: "blossom",
    english_sentence: "The blossom blooms in spring.",
    bisaya_sentence: "Ang bulak namulak sa tingpamulak.",
  }, // Blossom
  {
    name: "sakura",
    image: require("../assets/app_emojis/cherry_blossom.png"),
    audio: null,
    translation: "cherry blossom",
    english_sentence: "The cherry blossom is pink and pretty.",
    bisaya_sentence: "Ang sakura pink ug nindot.",
  }, // Cherry blossom
  {
    name: "hibiskus",
    image: require("../assets/app_emojis/hibiscus.png"),
    audio: null,
    translation: "hibiscus",
    english_sentence: "Maria sees a hibiscus in the garden.",
    bisaya_sentence: "Si Maria nakakita og hibiskus sa tanaman.",
  }, // Hibiscus
  {
    name: "ubas",
    image: require("../assets/app_emojis/grapes.png"),
    audio: null,
    translation: "grapes",
    english_sentence: "Paul eats sweet grapes.",
    bisaya_sentence: "Si Paul nagkaon og tam-is nga ubas.",
  }, // Grapes
  {
    name: "pula_mansanas",
    image: require("../assets/app_emojis/red_apple.png"),
    audio: null,
    translation: "red apple",
    english_sentence: "Maria picks a red apple from the tree.",
    bisaya_sentence: "Si Maria nagpili og pula nga mansanas gikan sa kahoy.",
  }, // Red apple
  {
    name: "berde_mansanas",
    image: require("../assets/app_emojis/green_apple.png"),
    audio: null,
    translation: "green apple",
    english_sentence: "Paul likes a green apple.",
    bisaya_sentence: "Si Paul ganahan og berde nga mansanas.",
  }, // Green apple
  {
    name: "melokoton",
    image: require("../assets/app_emojis/peach.png"),
    audio: null,
    translation: "peach",
    english_sentence: "Maria eats a juicy peach.",
    bisaya_sentence: "Si Maria nagkaon og juicy nga melokoton.",
  }, // Peach
  {
    name: "seresa",
    image: require("../assets/app_emojis/cherries.png"),
    audio: null,
    translation: "cherries",
    english_sentence: "Paul buys cherries at the market.",
    bisaya_sentence: "Si Paul nagpalit og seresa sa merkado.",
  }, // Cherries
  {
    name: "strawberi",
    image: require("../assets/app_emojis/strawberry.png"),
    audio: null,
    translation: "strawberry",
    english_sentence: "Maria loves to eat strawberries.",
    bisaya_sentence: "Si Maria ganahan mokaon og strawberi.",
  }, // Strawberry
  {
    name: "blueberi",
    image: require("../assets/app_emojis/blueberries.png"),
    audio: null,
    translation: "blueberries",
    english_sentence: "Paul picks blueberries in the garden.",
    bisaya_sentence: "Si Paul nagpili og blueberi sa tanaman.",
  }, // Blueberries
  {
    name: "pinya",
    image: require("../assets/app_emojis/pineapple.png"),
    audio: null,
    translation: "pineapple",
    english_sentence: "Maria cuts a pineapple for a snack.",
    bisaya_sentence: "Si Maria nagputol og pinya para sa merienda.",
  }, // Pineapple
  {
    name: "mangga",
    image: require("../assets/app_emojis/mango.png"),
    audio: null,
    translation: "mango",
    english_sentence: "Paul eats a sweet mango.",
    bisaya_sentence: "Si Paul nagkaon og tam-is nga mangga.",
  }, // Mango
  {
    name: "dalanghita",
    image: require("../assets/app_emojis/tangerine.png"),
    audio: null,
    translation: "tangerine",
    english_sentence: "Maria peels a tangerine to eat.",
    bisaya_sentence: "Si Maria nagpanit og dalanghita aron mokaon.",
  }, // Tangerine
  {
    name: "lemon",
    image: require("../assets/app_emojis/lemon.png"),
    audio: null,
    translation: "lemon",
    english_sentence: "Paul makes lemon juice.",
    bisaya_sentence: "Si Paul naghimo og lemon juice.",
  }, // Lemon
  {
    name: "pakwan",
    image: require("../assets/app_emojis/watermelon.png"),
    audio: null,
    translation: "watermelon",
    english_sentence: "Maria eats a slice of watermelon.",
    bisaya_sentence: "Si Maria nagkaon og usa ka slice sa pakwan.",
  }, // Watermelon
  {
    name: "kiwi",
    image: require("../assets/app_emojis/kiwi.png"),
    audio: null,
    translation: "kiwi",
    english_sentence: "Paul tries a kiwi fruit.",
    bisaya_sentence: "Si Paul misulay og kiwi nga prutas.",
  }, // Kiwi
  {
    name: "kamatis",
    image: require("../assets/app_emojis/tomato.png"),
    audio: null,
    translation: "tomato",
    english_sentence: "Maria uses a tomato for salad.",
    bisaya_sentence: "Si Maria naggamit og kamatis para sa salad.",
  }, // Tomato
  {
    name: "niyog",
    image: require("../assets/app_emojis/coconut.png"),
    audio: null,
    translation: "coconut",
    english_sentence: "Paul drinks coconut water.",
    bisaya_sentence: "Si Paul nag-inom og tubig sa niyog.",
  }, // Coconut
  {
    name: "brokoli",
    image: require("../assets/app_emojis/broccoli.png"),
    audio: null,
    translation: "broccoli",
    english_sentence: "Maria eats broccoli for dinner.",
    bisaya_sentence: "Si Maria nagkaon og brokoli para sa panihapon.",
  }, // Broccoli
  {
    name: "berde_dahon",
    image: require("../assets/app_emojis/leafy_green.png"),
    audio: null,
    translation: "leafy green",
    english_sentence: "Paul puts leafy greens in soup.",
    bisaya_sentence: "Si Paul nagbutang og berde nga dahon sa sabaw.",
  }, // Leafy green
  {
    name: "pepino",
    image: require("../assets/app_emojis/cucumber.png"),
    audio: null,
    translation: "cucumber",
    english_sentence: "Maria slices a cucumber for salad.",
    bisaya_sentence: "Si Maria naghiwa og pepino para sa salad.",
  }, // Cucumber
  {
    name: "sili",
    image: require("../assets/app_emojis/hot_pepper.png"),
    audio: null,
    translation: "hot pepper",
    english_sentence: "Paul adds a hot pepper to the dish.",
    bisaya_sentence: "Si Paul nagdugang og sili sa pagkaon.",
  }, // Hot pepper
  {
    name: "paminta",
    image: require("../assets/app_emojis/bell_pepper.png"),
    audio: null,
    translation: "bell pepper",
    english_sentence: "Maria chops a bell pepper for cooking.",
    bisaya_sentence: "Si Maria nagputol og paminta para sa pagluto.",
  }, // Bell pepper
  {
    name: "mani",
    image: require("../assets/app_emojis/peanuts.png"),
    audio: null,
    translation: "peanuts",
    english_sentence: "Paul eats peanuts as a snack.",
    bisaya_sentence: "Si Paul nagkaon og mani isip merienda.",
  }, // Peanuts
  {
    name: "kastanyas",
    image: require("../assets/app_emojis/chestnut.png"),
    audio: null,
    translation: "chestnut",
    english_sentence: "Maria finds a chestnut on the ground.",
    bisaya_sentence: "Si Maria nakakita og kastanyas sa yuta.",
  }, // Chestnut
  {
    name: "pan",
    image: require("../assets/app_emojis/bread.png"),
    audio: null,
    translation: "bread",
    english_sentence: "Paul eats bread for breakfast.",
    bisaya_sentence: "Si Paul nagkaon og pan para sa pamahaw.",
  }, // Bread
  {
    name: "kruwasan",
    image: require("../assets/app_emojis/croissant.png"),
    audio: null,
    translation: "croissant",
    english_sentence: "Maria buys a croissant at the bakery.",
    bisaya_sentence: "Si Maria nagpalit og kruwasan sa panaderya.",
  }, // Croissant
  // Places/Things (your completed entries)
  {
    name: "balay",
    image: require("../assets/app_emojis/house.png"),
    audio: null,
    translation: "house",
    english_sentence: "Our house is in the village.",
    bisaya_sentence: "Ang among balay naa sa barrio.",
  }, // House
  {
    name: "barko",
    image: require("../assets/app_emojis/passenger_ship.png"),
    audio: null,
    translation: "ship",
    english_sentence: "The ship sails on the sea.",
    bisaya_sentence: "Ang barko naglayag sa dagat.",
  }, // Ship
  // Places/Things (remaining)
  {
    name: "balay_tanaman",
    image: require("../assets/app_emojis/house_with_garden.png"),
    audio: null,
    translation: "house with garden",
    english_sentence: "Maria lives in a house with a garden.",
    bisaya_sentence: "Si Maria nagpuyo sa balay nga adunay tanaman.",
  }, // House with garden
  {
    name: "kastilyo",
    image: require("../assets/app_emojis/castle.png"),
    audio: null,
    translation: "castle",
    english_sentence: "The castle is on a hill.",
    bisaya_sentence: "Ang kastilyo naa sa ibabaw sa bukid.",
  }, // Castle
  {
    name: "simbahan",
    image: require("../assets/app_emojis/church.png"),
    audio: null,
    translation: "church",
    english_sentence: "Paul goes to the church on Sunday.",
    bisaya_sentence: "Si Paul moadto sa simbahan sa Dominggo.",
  }, // Church
  {
    name: "moske",
    image: require("../assets/app_emojis/mosque.png"),
    audio: null,
    translation: "mosque",
    english_sentence: "The mosque has a tall tower.",
    bisaya_sentence: "Ang moske adunay taas nga torre.",
  }, // Mosque
  {
    name: "sinagoga",
    image: require("../assets/app_emojis/synagogue.png"),
    audio: null,
    translation: "synagogue",
    english_sentence: "The synagogue is a place of prayer.",
    bisaya_sentence: "Ang sinagoga usa ka dapit sa pag-ampo.",
  }, // Synagogue
  {
    name: "estatwa_libertad",
    image: require("../assets/app_emojis/statue_of_liberty.png"),
    audio: null,
    translation: "Statue of Liberty",
    english_sentence: "The Statue of Liberty stands in New York.",
    bisaya_sentence: "Ang Estatwa sa Libertad nagbarog sa New York.",
  }, // Statue of Liberty
  {
    name: "tokyo_tor",
    image: require("../assets/app_emojis/tokyo_tower.png"),
    audio: null,
    translation: "Tokyo Tower",
    english_sentence: "Tokyo Tower is very tall.",
    bisaya_sentence: "Ang Tokyo Tower taas kaayo.",
  }, // Tokyo Tower
  {
    name: "hapones_kastilyo",
    image: require("../assets/app_emojis/japanese_castle.png"),
    audio: null,
    translation: "Japanese castle",
    english_sentence: "The Japanese castle is old and beautiful.",
    bisaya_sentence: "Ang Hapones nga kastilyo daan ug nindot.",
  }, // Japanese castle
  {
    name: "estadyum",
    image: require("../assets/app_emojis/stadium.png"),
    audio: null,
    translation: "stadium",
    english_sentence: "Paul watches a game in the stadium.",
    bisaya_sentence: "Si Paul nagtan-aw og dula sa estadyum.",
  }, // Stadium
  {
    name: "bukid_niyebe",
    image: require("../assets/app_emojis/snow_capped_mountain.png"),
    audio: null,
    translation: "snow-capped mountain",
    english_sentence: "The snow-capped mountain is cold.",
    bisaya_sentence: "Ang bukid nga adunay niyebe bugnaw.",
  }, // Snow-capped mountain
  {
    name: "parke_nasyonal",
    image: require("../assets/app_emojis/national_park.png"),
    audio: null,
    translation: "national park",
    english_sentence: "Maria visits a national park.",
    bisaya_sentence: "Si Maria mibisita sa parke nasyonal.",
  }, // National park
  {
    name: "pagsubang",
    image: require("../assets/app_emojis/sunrise.png"),
    audio: null,
    translation: "sunrise",
    english_sentence: "Paul watches the sunrise in the morning.",
    bisaya_sentence: "Si Paul nagtan-aw sa pagsubang sa buntag.",
  }, // Sunrise
  {
    name: "subang_bukid",
    image: require("../assets/app_emojis/sunrise_over_mountains.png"),
    audio: null,
    translation: "sunrise over mountains",
    english_sentence: "The sunrise over mountains is beautiful.",
    bisaya_sentence: "Ang pagsubang sa ibabaw sa kabukiran nindot.",
  }, // Sunrise over mountains
  {
    name: "bituon",
    image: require("../assets/app_emojis/shooting_star.png"),
    audio: null,
    translation: "shooting star",
    english_sentence: "Maria sees a shooting star at night.",
    bisaya_sentence: "Si Maria nakakita og bituon nga nahulog sa gabii.",
  }, // Shooting star
  {
    name: "kusilap",
    image: require("../assets/app_emojis/sparkler.png"),
    audio: null,
    translation: "sparkler",
    english_sentence: "Paul holds a sparkler during a party.",
    bisaya_sentence: "Si Paul nagkupot og kusilap atol sa pista.",
  }, // Sparkler
  {
    name: "paputok",
    image: require("../assets/app_emojis/fireworks.png"),
    audio: null,
    translation: "fireworks",
    english_sentence: "The fireworks light up the sky.",
    bisaya_sentence: "Ang paputok nagpasiga sa langit.",
  }, // Fireworks
  {
    name: "milky_way",
    image: require("../assets/app_emojis/milky_way.png"),
    audio: null,
    translation: "Milky Way",
    english_sentence: "Maria looks at the Milky Way at night.",
    bisaya_sentence: "Si Maria nagtan-aw sa Milky Way sa gabii.",
  }, // Milky Way
  {
    name: "balangaw",
    image: require("../assets/app_emojis/rainbow.png"),
    audio: null,
    translation: "rainbow",
    english_sentence: "Paul sees a rainbow after the rain.",
    bisaya_sentence: "Si Paul nakakita og balangaw human sa ulan.",
  }, // Rainbow
  {
    name: "desyerto_isla",
    image: require("../assets/app_emojis/desert_island.png"),
    audio: null,
    translation: "desert island",
    english_sentence: "The desert island has palm trees.",
    bisaya_sentence: "Ang desyerto nga isla adunay mga palma.",
  }, // Desert island
  {
    name: "bukid_fuji",
    image: require("../assets/app_emojis/mount_fuji.png"),
    audio: null,
    translation: "Mount Fuji",
    english_sentence: "Mount Fuji is a famous mountain.",
    bisaya_sentence: "Ang Bukid Fuji usa ka bantog nga bukid.",
  }, // Mount Fuji
  {
    name: "desyerto",
    image: require("../assets/app_emojis/desert.png"),
    audio: null,
    translation: "desert",
    english_sentence: "The desert is hot and sandy.",
    bisaya_sentence: "Ang desyerto init ug balason.",
  }, // Desert
  {
    name: "baybayon",
    image: require("../assets/app_emojis/beach_with_umbrella.png"),
    audio: null,
    translation: "beach",
    english_sentence: "Maria plays on the beach.",
    bisaya_sentence: "Si Maria nagdula sa baybayon.",
  }, // Beach
  {
    name: "taksi",
    image: require("../assets/app_emojis/taxi.png"),
    audio: null,
    translation: "taxi",
    english_sentence: "Paul rides a taxi to school.",
    bisaya_sentence: "Si Paul nagsakay og taksi padulong sa eskwelahan.",
  }, // Taxi
  {
    name: "suv",
    image: require("../assets/app_emojis/suv.png"),
    audio: null,
    translation: "SUV",
    english_sentence: "The SUV drives on the road.",
    bisaya_sentence: "Ang SUV nagmaneho sa dalan.",
  }, // SUV
  {
    name: "bus",
    image: require("../assets/app_emojis/bus.png"),
    audio: null,
    translation: "bus",
    english_sentence: "Maria takes the bus to the market.",
    bisaya_sentence: "Si Maria nagsakay og bus padulong sa merkado.",
  }, // Bus
  {
    name: "ambulansya",
    image: require("../assets/app_emojis/ambulance.png"),
    audio: null,
    translation: "ambulance",
    english_sentence: "The ambulance helps people.",
    bisaya_sentence: "Ang ambulansya nagtabang sa mga tawo.",
  }, // Ambulance
  {
    name: "bombero",
    image: require("../assets/app_emojis/fire_engine.png"),
    audio: null,
    translation: "fire engine",
    english_sentence: "The fire engine puts out fires.",
    bisaya_sentence: "Ang bombero nagpalong sa kalayo.",
  }, // Fire engine
  {
    name: "pulis_sakyanan",
    image: require("../assets/app_emojis/police_car.png"),
    audio: null,
    translation: "police car",
    english_sentence: "The police car drives fast.",
    bisaya_sentence: "Ang sakyanan sa pulis nagdagan og paspas.",
  }, // Police car
  {
    name: "trak",
    image: require("../assets/app_emojis/delivery_truck.png"),
    audio: null,
    translation: "delivery truck",
    english_sentence: "The delivery truck brings packages.",
    bisaya_sentence: "Ang trak nagdala og mga package.",
  }, // Delivery truck
  {
    name: "bisikleta",
    image: require("../assets/app_emojis/bicycle.png"),
    audio: null,
    translation: "bicycle",
    english_sentence: "Paul rides a bicycle in the park.",
    bisaya_sentence: "Si Paul nagsakay og bisikleta sa parke.",
  }, // Bicycle
  {
    name: "motosiklo",
    image: require("../assets/app_emojis/motor_scooter.png"),
    audio: null,
    translation: "motorcycle",
    english_sentence: "Maria sees a motorcycle on the road.",
    bisaya_sentence: "Si Maria nakakita og motosiklo sa dalan.",
  }, // Motorcycle
  {
    name: "skateboard",
    image: require("../assets/app_emojis/skateboard.png"),
    audio: null,
    translation: "skateboard",
    english_sentence: "Paul plays with a skateboard.",
    bisaya_sentence: "Si Paul nagdula og skateboard.",
  }, // Skateboard
  {
    name: "tren",
    image: require("../assets/app_emojis/high_speed_train.png"),
    audio: null,
    translation: "train",
    english_sentence: "The train travels fast.",
    bisaya_sentence: "Ang tren nagbiyahe og paspas.",
  }, // Train
  {
    name: "eroplano",
    image: require("../assets/app_emojis/airplane.png"),
    audio: null,
    translation: "airplane",
    english_sentence: "Maria sees an airplane in the sky.",
    bisaya_sentence: "Si Maria nakakita og eroplano sa langit.",
  }, // Airplane
  {
    name: "speedboat",
    image: require("../assets/app_emojis/speedboat.png"),
    audio: null,
    translation: "speedboat",
    english_sentence: "The speedboat moves on the water.",
    bisaya_sentence: "Ang speedboat nagdagan sa tubig.",
  }, // Speedboat
  {
    name: "layag",
    image: require("../assets/app_emojis/sailboat.png"),
    audio: null,
    translation: "sailboat",
    english_sentence: "Paul sails a sailboat on the sea.",
    bisaya_sentence: "Si Paul naglayag og layag sa dagat.",
  }, // Sailboat
  {
    name: "kano",
    image: require("../assets/app_emojis/canoe.png"),
    audio: null,
    translation: "canoe",
    english_sentence: "Maria paddles a canoe in the river.",
    bisaya_sentence: "Si Maria nagsagwan og kano sa suba.",
  }, // Canoe
  {
    name: "ufo",
    image: require("../assets/app_emojis/flying_saucer.png"),
    audio: null,
    translation: "UFO",
    english_sentence: "Paul imagines a UFO in the sky.",
    bisaya_sentence: "Si Paul naghanduraw og UFO sa langit.",
  }, // UFO
  {
    name: "helikopter",
    image: require("../assets/app_emojis/helicopter.png"),
    audio: null,
    translation: "helicopter",
    english_sentence: "The helicopter flies high.",
    bisaya_sentence: "Ang helikopter naglupad og taas.",
  }, // Helicopter
  {
    name: "satelayt",
    image: require("../assets/app_emojis/satellite.png"),
    audio: null,
    translation: "satellite",
    english_sentence: "The satellite orbits the Earth.",
    bisaya_sentence: "Ang satelayt naglibot sa Kalibutan.",
  }, // Satellite
  {
    name: "roket",
    image: require("../assets/app_emojis/rocket.png"),
    audio: null,
    translation: "rocket",
    english_sentence: "The rocket goes to space.",
    bisaya_sentence: "Ang roket moadto sa kawanangan.",
  }, // Rocket
  {
    name: "planeta",
    image: require("../assets/app_emojis/ringed_planet.png"),
    audio: null,
    translation: "planet",
    english_sentence: "Maria learns about a planet in school.",
    bisaya_sentence: "Si Maria nagtuon bahin sa planeta sa eskwelahan.",
  }, // Planet
  {
    name: "moai",
    image: require("../assets/app_emojis/moai.png"),
    audio: null,
    translation: "moai statue",
    english_sentence: "The moai statue stands on an island.",
    bisaya_sentence: "Ang moai nga estatwa nagbarog sa isla.",
  }, // Moai
  // Sports (your completed entry)
  {
    name: "putbol",
    image: require("../assets/app_emojis/soccer_ball.png"),
    audio: null,
    translation: "soccer",
    english_sentence: "Paul kicks the soccer ball.",
    bisaya_sentence: "Si Paul nagsipa sa bola sa putbol.",
  }, // Soccer
  // Sports (remaining)
  {
    name: "basketbol",
    image: require("../assets/app_emojis/basketball.png"),
    audio: null,
    translation: "basketball",
    english_sentence: "Maria plays basketball with friends.",
    bisaya_sentence: "Si Maria nagdula og basketbol uban sa mga higala.",
  }, // Basketball
  {
    name: "amerikano_putbol",
    image: require("../assets/app_emojis/american_football.png"),
    audio: null,
    translation: "American football",
    english_sentence: "Paul throws the American football.",
    bisaya_sentence: "Si Paul naglabog sa bola sa Amerikano nga putbol.",
  }, // American football
  {
    name: "baseball",
    image: require("../assets/app_emojis/baseball.png"),
    audio: null,
    translation: "baseball",
    english_sentence: "Maria hits the baseball with a bat.",
    bisaya_sentence: "Si Maria nag-igo sa baseball gamit ang bat.",
  }, // Baseball
  {
    name: "softball",
    image: require("../assets/app_emojis/softball.png"),
    audio: null,
    translation: "softball",
    english_sentence: "Paul plays softball in the park.",
    bisaya_sentence: "Si Paul nagdula og softball sa parke.",
  }, // Softball
  {
    name: "tenis",
    image: require("../assets/app_emojis/tennis.png"),
    audio: null,
    translation: "tennis",
    english_sentence: "Maria swings the tennis racket.",
    bisaya_sentence: "Si Maria nag-uyog sa raketa sa tenis.",
  }, // Tennis
  {
    name: "bolibol",
    image: require("../assets/app_emojis/volleyball.png"),
    audio: null,
    translation: "volleyball",
    english_sentence: "Paul hits the volleyball over the net.",
    bisaya_sentence: "Si Paul nag-igo sa bola sa bolibol ibabaw sa pukot.",
  }, // Volleyball
  {
    name: "pingpong",
    image: require("../assets/app_emojis/ping_pong.png"),
    audio: null,
    translation: "ping pong",
    english_sentence: "Maria plays ping pong with Paul.",
    bisaya_sentence: "Si Maria nagdula og pingpong uban kang Paul.",
  }, // Ping pong
  {
    name: "badminton",
    image: require("../assets/app_emojis/badminton.png"),
    audio: null,
    translation: "badminton",
    english_sentence: "Paul swings the badminton racket.",
    bisaya_sentence: "Si Paul nag-uyog sa raketa sa badminton.",
  }, // Badminton
  {
    name: "bowling",
    image: require("../assets/app_emojis/bowling.png"),
    audio: null,
    translation: "bowling",
    english_sentence: "Maria rolls the bowling ball.",
    bisaya_sentence: "Si Maria nagligid sa bola sa bowling.",
  }, // Bowling
  {
    name: "boksing",
    image: require("../assets/app_emojis/boxing_glove.png"),
    audio: null,
    translation: "boxing",
    english_sentence: "Paul wears a boxing glove for practice.",
    bisaya_sentence: "Si Paul nagsuot og guwantes sa boksing para sa praktis.",
  }, // Boxing
  {
    name: "golf",
    image: require("../assets/app_emojis/flag_in_hole.png"),
    audio: null,
    translation: "golf",
    english_sentence: "Maria plays golf on the course.",
    bisaya_sentence: "Si Maria nagdula og golf sa kurso.",
  }, // Golf
  {
    name: "pamingwit",
    image: require("../assets/app_emojis/fishing_pole.png"),
    audio: null,
    translation: "fishing",
    english_sentence: "Paul uses a fishing pole by the river.",
    bisaya_sentence: "Si Paul naggamit og pamingwit duol sa suba.",
  }, // Fishing
  {
    name: "paglangoy",
    image: require("../assets/app_emojis/person_swimming.png"),
    audio: null,
    translation: "swimming",
    english_sentence: "Maria enjoys swimming in the pool.",
    bisaya_sentence: "Si Maria nalipay sa paglangoy sa pool.",
  }, // Swimming
  {
    name: "pagsurp",
    image: require("../assets/app_emojis/person_surfing.png"),
    audio: null,
    translation: "surfing",
    english_sentence: "Paul tries surfing at the beach.",
    bisaya_sentence: "Si Paul misulay og pagsurp sa baybayon.",
  }, // Surfing
  // Instruments
  {
    name: "gitara",
    image: require("../assets/app_emojis/guitar.png"),
    audio: null,
    translation: "guitar",
    english_sentence: "Maria plays the guitar at school.",
    bisaya_sentence: "Si Maria nagdula og gitara sa eskwelahan.",
  }, // Guitar
  {
    name: "saksopon",
    image: require("../assets/app_emojis/saxophone.png"),
    audio: null,
    translation: "saxophone",
    english_sentence: "Paul plays the saxophone in a band.",
    bisaya_sentence: "Si Paul nagdula og saksopon sa banda.",
  }, // Saxophone
  {
    name: "trompeta",
    image: require("../assets/app_emojis/trumpet.png"),
    audio: null,
    translation: "trumpet",
    english_sentence: "Maria blows the trumpet loudly.",
    bisaya_sentence: "Si Maria naghuyop og trompeta nga kusog.",
  }, // Trumpet
  // Tools (your completed entries)
  {
    name: "plasyo",
    image: require("../assets/app_emojis/flashlight.png"),
    audio: null,
    translation: "flashlight",
    english_sentence: "Maria uses a flashlight at night.",
    bisaya_sentence: "Si Maria naggamit og plasyo sa gabii.",
  }, // Flashlight
  {
    name: "martilyo",
    image: require("../assets/app_emojis/hammer.png"),
    audio: null,
    translation: "hammer",
    english_sentence: "Paul uses a hammer to build.",
    bisaya_sentence: "Si Paul naggamit og martilyo aron magtukod.",
  }, // Hammer
  // Tools (remaining)
  {
    name: "wrench",
    image: require("../assets/app_emojis/wrench.png"),
    audio: null,
    translation: "wrench",
    english_sentence: "Paul fixes a bike with a wrench.",
    bisaya_sentence: "Si Paul nag-ayo og bisikleta gamit ang wrench.",
  }, // Wrench
  {
    name: "bolt",
    image: require("../assets/app_emojis/nut_and_bolt.png"),
    audio: null,
    translation: "nut and bolt",
    english_sentence: "Maria uses a nut and bolt to build.",
    bisaya_sentence: "Si Maria naggamit og bolt aron magtukod.",
  }, // Nut and bolt
  {
    name: "gear",
    image: require("../assets/app_emojis/gear.png"),
    audio: null,
    translation: "gear",
    english_sentence: "The gear turns in the machine.",
    bisaya_sentence: "Ang gear naglibot sa makina.",
  }, // Gear
  {
    name: "kampit",
    image: require("../assets/app_emojis/clamp.png"),
    audio: null,
    translation: "clamp",
    english_sentence: "Paul uses a clamp to hold wood.",
    bisaya_sentence: "Si Paul naggamit og kampit aron kuptan ang kahoy.",
  }, // Clamp
  {
    name: "timbangan",
    image: require("../assets/app_emojis/balance_scale.png"),
    audio: null,
    translation: "balance scale",
    english_sentence: "Maria weighs fruit with a balance scale.",
    bisaya_sentence: "Si Maria nagtimbang og prutas gamit ang timbangan.",
  }, // Balance scale
  {
    name: "martilyo_wrench",
    image: require("../assets/app_emojis/hammer_and_wrench.png"),
    audio: null,
    translation: "hammer and wrench",
    english_sentence: "Paul carries a hammer and wrench.",
    bisaya_sentence: "Si Paul nagdala og martilyo ug wrench.",
  }, // Hammer and wrench
  {
    name: "piko",
    image: require("../assets/app_emojis/pick.png"),
    audio: null,
    translation: "pickaxe",
    english_sentence: "Maria uses a pickaxe to dig.",
    bisaya_sentence: "Si Maria naggamit og piko aron magkalot.",
  }, // Pickaxe
  {
    name: "wasay",
    image: require("../assets/app_emojis/axe.png"),
    audio: null,
    translation: "axe",
    english_sentence: "Paul chops wood with an axe.",
    bisaya_sentence: "Si Paul nagputol og kahoy gamit ang wasay.",
  }, // Axe
  {
    name: "lagari",
    image: require("../assets/app_emojis/carpentry_saw.png"),
    audio: null,
    translation: "saw",
    english_sentence: "Maria cuts wood with a saw.",
    bisaya_sentence: "Si Maria nagputol og kahoy gamit ang lagari.",
  }, // Saw
  {
    name: "hagdan",
    image: require("../assets/app_emojis/ladder.png"),
    audio: null,
    translation: "ladder",
    english_sentence: "Paul climbs a ladder to the roof.",
    bisaya_sentence: "Si Paul nagsaka og hagdan padulong sa atop.",
  }, // Ladder
  {
    name: "kahon_gamit",
    image: require("../assets/app_emojis/toolbox.png"),
    audio: null,
    translation: "toolbox",
    english_sentence: "Maria keeps tools in a toolbox.",
    bisaya_sentence: "Si Maria nagtipig og mga gamit sa kahon_gamit.",
  }, // Toolbox
  {
    name: "ladrilyo",
    image: require("../assets/app_emojis/brick.png"),
    audio: null,
    translation: "brick",
    english_sentence: "Paul builds a wall with a brick.",
    bisaya_sentence: "Si Paul nagtukod og dingding gamit ang ladrilyo.",
  }, // Brick
  {
    name: "bato",
    image: require("../assets/app_emojis/rock.png"),
    audio: null,
    translation: "rock",
    english_sentence: "Maria finds a shiny rock.",
    bisaya_sentence: "Si Maria nakakita og sinaw nga bato.",
  }, // Rock
  {
    name: "kahoy",
    image: require("../assets/app_emojis/wood.png"),
    audio: null,
    translation: "wood",
    english_sentence: "Paul collects wood for a fire.",
    bisaya_sentence: "Si Paul nagkolekta og kahoy para sa kalayo.",
  }, // Wood
  {
    name: "magnet",
    image: require("../assets/app_emojis/magnet.png"),
    audio: null,
    translation: "magnet",
    english_sentence: "Maria plays with a magnet and metal.",
    bisaya_sentence: "Si Maria nagdula og magnet ug metal.",
  }, // Magnet
  {
    name: "tubig_gan",
    image: require("../assets/app_emojis/water_gun.png"),
    audio: null,
    translation: "water gun",
    english_sentence: "Paul plays with a water gun in the yard.",
    bisaya_sentence: "Si Paul nagdula og tubig_gan sa natad.",
  }, // Water gun
  {
    name: "tapayan",
    image: require("../assets/app_emojis/amphora.png"),
    audio: null,
    translation: "clay pot",
    english_sentence: "Maria stores water in a clay pot.",
    bisaya_sentence: "Si Maria nagtipig og tubig sa tapayan.",
  }, // Clay pot
  {
    name: "kristal",
    image: require("../assets/app_emojis/crystal_ball.png"),
    audio: null,
    translation: "crystal ball",
    english_sentence: "Paul looks at a shiny crystal ball.",
    bisaya_sentence: "Si Paul nagtan-aw sa sinaw nga kristal.",
  }, // Crystal ball
  {
    name: "rosaryo",
    image: require("../assets/app_emojis/prayer_beads.png"),
    audio: null,
    translation: "rosary",
    english_sentence: "Maria holds a rosary during prayer.",
    bisaya_sentence: "Si Maria nagkupot og rosaryo atol sa pag-ampo.",
  }, // Rosary
  {
    name: "anting",
    image: require("../assets/app_emojis/nazar_amulet.png"),
    audio: null,
    translation: "amulet",
    english_sentence: "Paul wears an amulet for luck.",
    bisaya_sentence: "Si Paul nagsuot og anting para sa suwerte.",
  }, // Amulet
  // Moon Phases
  {
    name: "kalibutan_amerika",
    image: require("../assets/app_emojis/globe_americas.png"),
    audio: null,
    translation: "globe Americas",
    english_sentence: "Maria studies the globe Americas in school.",
    bisaya_sentence: "Si Maria nagtuon sa globo sa Amerika sa eskwelahan.",
  }, // Globe Americas
  {
    name: "kalibutan_europa",
    image: require("../assets/app_emojis/globe_europe_africa.png"),
    audio: null,
    translation: "globe Europe/Africa",
    english_sentence: "Paul looks at the globe Europe and Africa.",
    bisaya_sentence: "Si Paul nagtan-aw sa globo sa Europa ug Aprika.",
  }, // Globe Europe/Africa
  {
    name: "kalibutan_asya",
    image: require("../assets/app_emojis/globe_asia_australia.png"),
    audio: null,
    translation: "globe Asia/Australia",
    english_sentence: "Maria learns about the globe Asia and Australia.",
    bisaya_sentence: "Si Maria nagtuon bahin sa globo sa Asya ug Australia.",
  }, // Globe Asia/Australia
  {
    name: "pulan_bulan",
    image: require("../assets/app_emojis/full_moon.png"),
    audio: null,
    translation: "full moon",
    english_sentence: "The full moon shines at night.",
    bisaya_sentence: "Ang pulan nga bulan nagsiga sa gabii.",
  }, // Full moon
  {
    name: "nawala_bulan",
    image: require("../assets/app_emojis/waning_gibbous_moon.png"),
    audio: null,
    translation: "waning gibbous moon",
    english_sentence: "Paul sees the waning gibbous moon.",
    bisaya_sentence: "Si Paul nakakita sa nawala nga bulan.",
  }, // Waning gibbous moon
  {
    name: "katunga_bulan",
    image: require("../assets/app_emojis/last_quarter_moon.png"),
    audio: null,
    translation: "last quarter moon",
    english_sentence: "Maria watches the last quarter moon.",
    bisaya_sentence: "Si Maria nagtan-aw sa katunga nga bulan.",
  }, // Last quarter moon
  {
    name: "nipis_bulan",
    image: require("../assets/app_emojis/waning_crescent_moon.png"),
    audio: null,
    translation: "waning crescent moon",
    english_sentence: "The waning crescent moon is thin.",
    bisaya_sentence: "Ang nipis nga bulan manipis kaayo.",
  }, // Waning crescent moon
  {
    name: "bag_ong_bulan",
    image: require("../assets/app_emojis/new_moon.png"),
    audio: null,
    translation: "new moon",
    english_sentence: "Paul learns about the new moon.",
    bisaya_sentence: "Si Paul nagtuon bahin sa bag-ong bulan.",
  }, // New moon
  {
    name: "nagtubo_bulan",
    image: require("../assets/app_emojis/waxing_crescent_moon.png"),
    audio: null,
    translation: "waxing crescent moon",
    english_sentence: "Maria sees the waxing crescent moon.",
    bisaya_sentence: "Si Maria nakakita sa nagtubo nga bulan.",
  }, // Waxing crescent moon
  {
    name: "unang_katunga_bulan",
    image: require("../assets/app_emojis/first_quarter_moon.png"),
    audio: null,
    translation: "first quarter moon",
    english_sentence: "The first quarter moon is half bright.",
    bisaya_sentence: "Ang unang katunga nga bulan tunga ang sidlak.",
  }, // First quarter moon
  {
    name: "naglambo_bulan",
    image: require("../assets/app_emojis/waxing_gibbous_moon.png"),
    audio: null,
    translation: "waxing gibbous moon",
    english_sentence: "Paul watches the waxing gibbous moon.",
    bisaya_sentence: "Si Paul nagtan-aw sa naglambo nga bulan.",
  }, // Waxing gibbous moon
  {
    name: "bag_ong_bulan_nawong",
    image: require("../assets/app_emojis/new_moon_face.png"),
    audio: null,
    translation: "new moon with face",
    english_sentence: "Maria likes the new moon with a face.",
    bisaya_sentence: "Si Maria ganahan sa bag-ong bulan nga adunay nawong.",
  }, // New moon face
  {
    name: "katunga_bulan_nawong",
    image: require("../assets/app_emojis/last_quarter_moon_face.png"),
    audio: null,
    translation: "last quarter moon with face",
    english_sentence: "Paul sees the last quarter moon with a face.",
    bisaya_sentence: "Si Paul nakakita sa katunga nga bulan nga adunay nawong.",
  }, // Last quarter moon face
  {
    name: "sabit_bulan",
    image: require("../assets/app_emojis/crescent_moon.png"),
    audio: null,
    translation: "crescent moon",
    english_sentence: "The crescent moon looks like a smile.",
    bisaya_sentence: "Ang sabit nga bulan murag ngisi.",
  }, // Crescent moon
  {
    name: "unang_bulan_nawong",
    image: require("../assets/app_emojis/first_quarter_moon_face.png"),
    audio: null,
    translation: "first quarter moon with face",
    english_sentence: "Maria draws a first quarter moon with a face.",
    bisaya_sentence: "Si Maria nagdrowing og unang bulan nga adunay nawong.",
  }, // First quarter moon face
  {
    name: "pulan_bulan_nawong",
    image: require("../assets/app_emojis/full_moon_face.png"),
    audio: null,
    translation: "full moon with face",
    english_sentence: "Paul looks at the full moon with a face.",
    bisaya_sentence: "Si Paul nagtan-aw sa pulan nga bulan nga adunay nawong.",
  }, // Full moon face
];

export default words;
