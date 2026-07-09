export interface Show {
  id: string;
  title: string;
  dates: string;
  genre: string;
  status: "Now Playing" | "Coming Soon";
  description: string;
  image: string;
}

export const shows: Show[] = [
  {
    id: "our-man-in-havana",
    title: "Our Man In Havana",
    dates: "Wed 1 to Sat 11 Jul",
    genre: "Comedy Thriller",
    status: "Now Playing",
    description:
      "Graham Greene's classic tale of an accidental spy, adapted for the stage with a starry cast from Call the Midwife and Holby City. Espionage has never been this entertaining.",
    image:
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hidden-dangers-of-camping",
    title: "The Hidden Dangers of Camping",
    dates: "Fri 17 to Sat 25 Jul",
    genre: "New Drama",
    status: "Now Playing",
    description:
      "Past and present collide under canvas in this funny, honest and quietly heartbreaking new play. A tender look at the ties that bind, and fray.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "we-will-rock-you",
    title: "We Will Rock You",
    dates: "Wed 19 to Sat 22 Aug",
    genre: "Community Musical",
    status: "Coming Soon",
    description:
      "The smash-hit musical built on the iconic music of Queen, performed by our sensational community company. Expect anthems, spectacle and a standing ovation.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "heathers-the-musical",
    title: "Heathers The Musical",
    dates: "Wed 26 to Sat 29 Aug",
    genre: "Musical",
    status: "Coming Soon",
    description:
      "The international hit returns direct from New York. Dark, funny and fabulously catchy, as Westerberg High's most dangerous clique hits Windsor.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "twelve-angry-men",
    title: "Twelve Angry Men",
    dates: "Thu 3 to Sat 12 Sep",
    genre: "Classic Drama",
    status: "Coming Soon",
    description:
      "One boy's life. Twelve men's verdict. The gripping courtroom classic behind the legendary 1957 film, staged with knife-edge tension.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "jack-and-the-beanstalk",
    title: "Jack and the Beanstalk",
    dates: "Fri 20 Nov to Sun 10 Jan",
    genre: "Family Pantomime",
    status: "Coming Soon",
    description:
      "Windsor's legendary panto returns with magic, mischief and massive fun! Expect dazzling sets, a dastardly giant and gags for all ages, starring Steven Blakeley as the Dame. Oh yes it is!",
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1200&auto=format&fit=crop",
  },
];
