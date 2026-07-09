export type ShowCategory =
  | "drama"
  | "thriller"
  | "musical"
  | "music"
  | "comedy"
  | "dance"
  | "family";

export interface Show {
  id: string;
  title: string;
  dates: string;
  startIso: string;
  endIso: string;
  category: ShowCategory;
  genre: string;
  status: "Now Playing" | "Coming Soon";
  description: string;
  image: string;
  /** Featured shows appear in the home page reel */
  featured?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1200&auto=format&fit=crop`;

/** The 2026 season, sourced from the theatre's current What's On listing */
export const shows: Show[] = [
  /* ----------------------------- July ----------------------------- */
  {
    id: "our-man-in-havana",
    title: "Our Man In Havana",
    dates: "Wed 1 to Sat 11 Jul",
    startIso: "2026-07-01",
    endIso: "2026-07-11",
    category: "drama",
    genre: "Comedy Thriller",
    status: "Now Playing",
    description:
      "Graham Greene's classic tale of an accidental spy, adapted for the stage with a starry cast from Call the Midwife and Holby City. Espionage has never been this entertaining.",
    image: img("1507924538820-ede94a04019d"),
    featured: true,
  },
  {
    id: "hidden-dangers-of-camping",
    title: "The Hidden Dangers of Camping",
    dates: "Fri 17 to Sat 25 Jul",
    startIso: "2026-07-17",
    endIso: "2026-07-25",
    category: "drama",
    genre: "New Drama",
    status: "Coming Soon",
    description:
      "Past and present collide under canvas in this funny, honest and quietly heartbreaking new play. A tender look at the ties that bind, and fray.",
    image: img("1470229722913-7c0e2dbbafd3"),
    featured: true,
  },

  /* ---------------------------- August ---------------------------- */
  {
    id: "k-pop-icons",
    title: "K-Pop Icons",
    dates: "Sun 2 Aug",
    startIso: "2026-08-02",
    endIso: "2026-08-02",
    category: "music",
    genre: "Concert",
    status: "Coming Soon",
    description:
      "The ultimate concert experience celebrating the global music phenomenon of K-Pop, live on the Windsor stage for one night only.",
    image: img("1501386761578-eac5c94b800a"),
  },
  {
    id: "we-will-rock-you",
    title: "We Will Rock You",
    dates: "Wed 19 to Sat 22 Aug",
    startIso: "2026-08-19",
    endIso: "2026-08-22",
    category: "musical",
    genre: "Community Musical",
    status: "Coming Soon",
    description:
      "The smash-hit musical built on the iconic music of Queen with a story by Ben Elton, performed by our sensational community company. Expect anthems, spectacle and a standing ovation.",
    image: img("1516450360452-9312f5e86fc7"),
    featured: true,
  },
  {
    id: "heathers-the-musical",
    title: "Heathers The Musical",
    dates: "Wed 26 to Sat 29 Aug",
    startIso: "2026-08-26",
    endIso: "2026-08-29",
    category: "musical",
    genre: "Musical",
    status: "Coming Soon",
    description:
      "The international hit returns direct from New York. Dark, funny and fabulously catchy, as Westerberg High's most dangerous clique hits Windsor.",
    image: img("1514525253161-7a46d19cd819"),
    featured: true,
  },

  /* --------------------------- September -------------------------- */
  {
    id: "twelve-angry-men",
    title: "Twelve Angry Men",
    dates: "Thu 3 to Sat 12 Sep",
    startIso: "2026-09-03",
    endIso: "2026-09-12",
    category: "drama",
    genre: "Classic Drama",
    status: "Coming Soon",
    description:
      "One boy's life. Twelve men's verdict. The gripping courtroom classic behind the legendary 1957 film, fresh from a record-breaking West End revival.",
    image: img("1489599849927-2ee91cede3ba"),
    featured: true,
  },
  {
    id: "jane-eyre",
    title: "Jane Eyre",
    dates: "Tue 15 to Sat 19 Sep",
    startIso: "2026-09-15",
    endIso: "2026-09-19",
    category: "drama",
    genre: "Gothic Romance",
    status: "Coming Soon",
    description:
      "Charlotte Brontë's beloved gothic romance comes to the stage in a passionate new adaptation. Reader, you'll be swept away.",
    image: img("1519682577862-22b62b24e493"),
  },
  {
    id: "magic-of-the-beatles",
    title: "The Magic Of The Beatles",
    dates: "Sun 20 Sep",
    startIso: "2026-09-20",
    endIso: "2026-09-20",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "A note-perfect celebration of the Fab Four, from Love Me Do to Let It Be, complete with costumes from every era.",
    image: img("1459749411175-04bf5292ceea"),
  },
  {
    id: "music-of-luther-vandross",
    title: "The Music of Luther Vandross",
    dates: "Sun 27 Sep",
    startIso: "2026-09-27",
    endIso: "2026-09-27",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "A soulful candlelit evening celebrating the velvet voice of the R&B legend, performed by a stunning live band.",
    image: img("1429962714451-bb934ecdc4ec"),
  },
  {
    id: "the-anastasia-file",
    title: "The Anastasia File",
    dates: "Wed 30 Sep to Sat 3 Oct",
    startIso: "2026-09-30",
    endIso: "2026-10-03",
    category: "thriller",
    genre: "Thriller",
    status: "Coming Soon",
    description:
      "Jenny Seagrove stars in this gripping touring thriller about the woman who claimed to be the lost Romanov duchess.",
    image: img("1507003211169-0a1dd7228f2d"),
  },

  /* ---------------------------- October --------------------------- */
  {
    id: "wilko",
    title: "Wilko: Love and Death 'N' Rock and Roll",
    dates: "Tue 6 to Sat 10 Oct",
    startIso: "2026-10-06",
    endIso: "2026-10-10",
    category: "drama",
    genre: "Play with Live Music",
    status: "Coming Soon",
    description:
      "The electrifying story of Dr Feelgood guitarist Wilko Johnson, direct from the West End and driven by a blistering live soundtrack.",
    image: img("1508700115892-45ecd05ae2ad"),
  },
  {
    id: "susan-calman-tall-tales",
    title: "Susan Calman: Tall Tales",
    dates: "Sun 11 Oct",
    startIso: "2026-10-11",
    endIso: "2026-10-11",
    category: "comedy",
    genre: "Comedy",
    status: "Coming Soon",
    description:
      "Susan Calman returns with Tall Tales, her first stand-up tour in ten years. Expect joy, mischief and very tall stories.",
    image: img("1585699324551-f6c309eedeca"),
  },
  {
    id: "the-mousetrap",
    title: "The Mousetrap",
    dates: "Mon 12 to Sat 17 Oct",
    startIso: "2026-10-12",
    endIso: "2026-10-17",
    category: "thriller",
    genre: "Classic Mystery",
    status: "Coming Soon",
    description:
      "Agatha Christie's legendary whodunnit, keeping audiences guessing since 1952. Can you work it out before the final twist?",
    image: img("1503095396549-807759245b35"),
    featured: true,
  },
  {
    id: "magic-of-motown",
    title: "The Magic Of Motown",
    dates: "Sun 18 Oct",
    startIso: "2026-10-18",
    endIso: "2026-10-18",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "Celebrating the sound of Motown Records with forty back-to-back hits, dazzling costumes and slick choreography.",
    image: img("1470229722913-7c0e2dbbafd3"),
  },
  {
    id: "turn-of-the-screw",
    title: "The Turn Of The Screw",
    dates: "Tue 20 to Sat 24 Oct",
    startIso: "2026-10-20",
    endIso: "2026-10-24",
    category: "thriller",
    genre: "Ghost Story",
    status: "Coming Soon",
    description:
      "Henry James's chilling ghost story in a spine-tingling stage adaptation. Perfect viewing for the week before Halloween.",
    image: img("1519682577862-22b62b24e493"),
  },
  {
    id: "fastlove",
    title: "Fastlove",
    dates: "Sun 25 Oct",
    startIso: "2026-10-25",
    endIso: "2026-10-25",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "The West End's George Michael celebration, packed with hits from Wham! through Faith to Older.",
    image: img("1516450360452-9312f5e86fc7"),
  },
  {
    id: "the-snow-queen",
    title: "The Snow Queen",
    dates: "Tue 27 to Sat 31 Oct",
    startIso: "2026-10-27",
    endIso: "2026-10-31",
    category: "dance",
    genre: "Ballet",
    status: "Coming Soon",
    description:
      "Hans Christian Andersen's fairytale transformed into a shimmering ballet of ice palaces, sleigh rides and courage.",
    image: img("1518834107812-67b0b7c58434"),
  },

  /* ---------------------------- November -------------------------- */
  {
    id: "in-the-air-tonight",
    title: "In The Air Tonight",
    dates: "Sun 1 Nov",
    startIso: "2026-11-01",
    endIso: "2026-11-01",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "A powerhouse celebration of Phil Collins and Genesis, from In The Air Tonight to Easy Lover.",
    image: img("1470229722913-7c0e2dbbafd3"),
  },
  {
    id: "mr-blue-sky",
    title: "Mr. Blue Sky",
    dates: "Mon 2 Nov",
    startIso: "2026-11-02",
    endIso: "2026-11-02",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "The Electric Light Orchestra songbook performed live: Mr. Blue Sky, Livin' Thing, Telephone Line and more.",
    image: img("1459749411175-04bf5292ceea"),
  },
  {
    id: "man-in-the-mirror",
    title: "Man In The Mirror",
    dates: "Tue 3 Nov",
    startIso: "2026-11-03",
    endIso: "2026-11-03",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "A moonwalking, show-stopping tribute to the King of Pop and three decades of Michael Jackson hits.",
    image: img("1429962714451-bb934ecdc4ec"),
  },
  {
    id: "radio-gaga",
    title: "Radio GaGa",
    dates: "Wed 4 Nov",
    startIso: "2026-11-04",
    endIso: "2026-11-04",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "A thunderous celebration of Queen, from Bohemian Rhapsody to We Are The Champions. Guaranteed to rock you.",
    image: img("1501386761578-eac5c94b800a"),
  },
  {
    id: "emerald-storm",
    title: "Emerald Storm",
    dates: "Thu 5 Nov",
    startIso: "2026-11-05",
    endIso: "2026-11-05",
    category: "dance",
    genre: "Dance Spectacular",
    status: "Coming Soon",
    description:
      "West End star Adam Garcia leads a whirlwind of Irish dance, live music and storytelling straight from the West End.",
    image: img("1518834107812-67b0b7c58434"),
  },
  {
    id: "women-in-rock",
    title: "Women In Rock",
    dates: "Fri 6 Nov",
    startIso: "2026-11-06",
    endIso: "2026-11-06",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "An international touring celebration of rock's greatest women, from Janis Joplin and Tina Turner to Blondie and Pink.",
    image: img("1508700115892-45ecd05ae2ad"),
  },
  {
    id: "west-end-does-windsor",
    title: "West End Does: Windsor",
    dates: "Sat 7 Nov",
    startIso: "2026-11-07",
    endIso: "2026-11-07",
    category: "music",
    genre: "Concert Special",
    status: "Coming Soon",
    description:
      "West End stars bring a sparkling Christmas concert special to Windsor, with showtunes and festive favourites.",
    image: img("1516450360452-9312f5e86fc7"),
  },
  {
    id: "thank-you-for-the-music",
    title: "Thank You For The Music",
    dates: "Sun 8 Nov",
    startIso: "2026-11-08",
    endIso: "2026-11-08",
    category: "music",
    genre: "Tribute Concert",
    status: "Coming Soon",
    description:
      "All of ABBA's number one hits in one joyous evening. Dust off the flares and sing your heart out.",
    image: img("1514525253161-7a46d19cd819"),
  },
  {
    id: "a-man-for-all-seasons",
    title: "A Man For All Seasons",
    dates: "Tue 10 to Sat 14 Nov",
    startIso: "2026-11-10",
    endIso: "2026-11-14",
    category: "drama",
    genre: "Historical Drama",
    status: "Coming Soon",
    description:
      "Robert Bolt's masterpiece of conscience and power: Sir Thomas More against the will of King Henry VIII.",
    image: img("1415201364774-f6f0bb35f28f"),
  },
  {
    id: "jack-and-the-beanstalk",
    title: "Jack and the Beanstalk",
    dates: "Fri 20 Nov to Sun 10 Jan",
    startIso: "2026-11-20",
    endIso: "2027-01-10",
    category: "family",
    genre: "Family Pantomime",
    status: "Coming Soon",
    description:
      "Windsor's legendary panto returns with magic, mischief and massive fun! Expect dazzling sets, a dastardly giant and gags for all ages, starring Steven Blakeley as the Dame. Oh yes it is!",
    image: img("1461784121038-f088ca1e7714"),
    featured: true,
  },
];

export const featuredShows = shows.filter((s) => s.featured);

export const categoryLabels: Record<ShowCategory, string> = {
  drama: "Drama",
  thriller: "Thrillers",
  musical: "Musicals",
  music: "Music",
  comedy: "Comedy",
  dance: "Dance",
  family: "Children & Families",
};
