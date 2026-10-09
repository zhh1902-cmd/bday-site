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
  eyebrow: "Mana Journey ❤️",
  title: "MANA LOVE STORY",
  subtitle: "Konni stories years tho measure chestharu... mana story matram moments tho measure chestham. ❤️",
  intro: "Mana iddaram “us” avvakamundu, okariki okaram entha important avtham ani manake teliyadu. Ala start ayina mana journey ippudu ikkadi varaku vachindi. ❤️",
  todayLabel: "TODAY",
  todayTitle: "Mana Story Inka Continue Avuthundi",
  todayDescription: "Ippativaraku enno moments daatukoni vacham... kani mana story ikkade aipoledu. Inka chala moments, inka chala memories mana kosam wait chesthunnayi. ❤️",
} as const;

export const journeyEntries: JourneyEntry[] = [
  {
    id: "first-meeting",
    date: "31-10-2023",
    title: "First Meeting",
    description: "Mana story ikkade start ayyindi. ❤️",
    image: "/images/journey/first-meet.jpg",
    imageAlt: "Memory from our first meeting",
    category: "FIRST MEETING",
  },
  {
    id: "first-conversation",
    date: "31-10-2023",
    title: "First Conversation",
    description: "Aa first conversation appudu just oka conversation anipinchindi... kani ade mana story lo oka important part ayyindi. ❤️",
    image: "/images/journey/first-meet1.jpg",
    imageAlt: "Memory from the beginning of our story",
    category: "BEGINNING",
  },
  {
    id: "first-date",
    date: "20-03-2025",
    title: "First Date",
    description: "Mana first date... mana iddaram kalisi oka beautiful memory create cheskunna roju. ❤️",
    image: "/images/journey/first-date.jpg",
    imageAlt: "Memory from our first date",
    category: "FIRST DATE",
  },
  {
    id: "beginning-of-us",
    date: "31-03-2025",
    title: "The Beginning of Us",
    description: "Aa roju mana relationship officially start ayyindi... mana iddari story lo oka kottha chapter start ayyindi. ❤️",
    image: "/images/journey/beginning.jpg",
    imageAlt: "A memory from the beginning of our relationship",
    category: "LOVE",
  },
  {
    id: "indirect-proposal-confession",
    date: "",
    title: "Indirect Proposal — Confession",
    description: "Direct ga cheppalekapoyina feelings ni aa roju naa words lo indirect ga cheppesa. Adi naa way lo neeku naa love cheppina moment. ❤️",
    image: "/images/journey/indirect-proposal.jpg",
    imageAlt:"A memory from our confession",
    category: "CONFESSION",
  },
  {
    id: "first-regret-moment",
    date: "",
    title: "Akshi's First Regret Moment",
    description: "Adi naaku oka regret moment matrame kaadu... chala alochinchina, chala nerchukunna moment. Naa actions valla nenu preminche person entha hurt avvagalado aa moment naaku ardham ayyela chesindi. ❤️",
    image: "/images/journey/regret.jpg",
    imageAlt:"The best moment and worst to end",
    category: "MEMORY",
  },
  {
    id: "first-birthday-of-us",
    date: "",
    title: "First Birthday of Us",
    description: "Aa roju inka konni beautiful memories mana story lo add ayyayi. ❤️",
    image: "/images/journey/first-bday.jpg",
    imageAlt: "Memory from our first birthday together",
    category: "BIRTHDAY",
  },
  {
    id: "funny-moments",
    date: "",
    title: "Mana Funny Moments",
    description: "Oka particular funny moment ani cheppalemu... mana iddaram kalisi unte almost prathi moment edo oka way lo funny aipothundi. 😂❤️",
    image: "/images/journey/funny-moment.jpg",
    imageAlt: "One of our funny moments",
    category: "MEMORY",
  },
  {
    id: "special-places",
    date: "",
    title: "Mana Special Places",
    description: "Oka place special avvadaniki aa place kanna, pakkana unna person important. Mana kosam special ayina places ante... Akshi lap and Temple. ❤️",
    image: "/images/journey/special-place.jpg",
    imageAlt: "A memory from one of our special places",
    category: "SPECIAL",
  },
];