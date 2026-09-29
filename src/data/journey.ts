export interface JourneyEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  location?: string;
  category?: string;
}

export const journeyContent = {
  eyebrow: "Our journey",
  title: "OUR LOVE STORY",
  subtitle: "Some stories are measured in years. Ours is measured in moments.",
  intro: "Before there was an 'us', there were two people who didn't know how important they would become to each other.",
  todayLabel: "TODAY",
  todayTitle: "The story continues",
  todayDescription: "And somehow, after all these moments, we're still writing the story.",
} as const;

export const journeyEntries: JourneyEntry[] = [
  {
    id: "first-meeting",
    date: "31-10-2023",
    title: "First Meeting",
    description: "Our story began on this day.",
    image: "/images/journey/first-meet.jpg",
    imageAlt: "Memory from our first meeting",
    category: "FIRST MEETING",
  },
  {
    id: "first-conversation",
    date: "31-10-2023",
    title: "First Conversation",
    description: "The first conversation that became part of our story.",
    image: "/images/journey/first-meet1.jpg",
    imageAlt: "Memory from the beginning of our story",
    category: "BEGINNING",
  },
  {
    id: "first-date",
    date: "20-03-2025",
    title: "First Date",
    description: "The day we shared our first date.",
    image: "/images/journey/first-date.jpg",
    imageAlt: "Memory from our first date",
    category: "FIRST DATE",
  },
  {
    id: "beginning-of-us",
    date: "31-03-2025",
    title: "The Beginning of Us",
    description: "The day our relationship officially began.",
    image: "/images/journey/beginning.jpg",
    imageAlt: "A memory from the beginning of our relationship",
    category: "LOVE",
  },
  {
    id: "indirect-proposal-confession",
    date: "",
    title: "Indirect Proposal — Confession",
    description: "One night, without saying everything directly, I finally let my feelings slip through my words. It was my quiet way of telling her that I loved her.",
    image: "/images/journey/indirect-proposal.jpg",
    imageAlt:"A memory from our confession",
    category: "CONFESSION",
  },
  {
    id: "first-regret-moment",
    date: "",
    title: "Akshi's First Regret Moment",
    description: "This was a moment of regret, reflection, and understanding — a moment that changed how I looked at my actions and how deeply they could affect someone I loved.",
    image: "/images/journey/regret.jpg",
    imageAlt:"The best moment and worst to end",
    category: "MEMORY",
  },
  {
    id: "first-birthday-of-us",
    date: "",
    title: "First Birthday of Us",
    description: "More memories were created on that day.",
    image: "/images/journey/first-bday.jpg",
    imageAlt: "Memory from our first birthday together",
    category: "BIRTHDAY",
  },
  {
    id: "funny-moments",
    date: "",
    title: "Our Funny Moments",
    description: "There isn't one particular funny memory. Somehow, every moment with her becomes funny in its own way.",
    image: "/images/journey/funny-moment.jpg",
    imageAlt: "One of our funny moments",
    category: "MEMORY",
  },
  {
    id: "special-places",
    date: "",
    title: "Our Special Places",
    description: "Some places become special because of the person beside you. For us, those places include Akshi's lap and the temple.",
    image: "/images/journey/special-place.jpg",
    imageAlt: "A memory from one of our special places",
    category: "SPECIAL",
  },
];