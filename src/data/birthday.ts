export const birthdayConfig = {
  partnerName: "Bhavani",
  nickname: "Chinni",
  birthday: {
    date: "10 October 2005",
    targetDateTime: "2026-10-10T00:00:00+05:30",
    age: "21",
  },
  countdown: {
    label: "A little something for the person who made so many ordinary moments special.",
    headingPrimary: "Something beautiful",
    headingSecondary: "is waiting for you...",
    subline: "Your birthday story begins soon.",
    lockedLabel: "Birthday experience locked",
    lockedDescription: "Come back when the countdown reaches zero.",
    footerLine: "Made with love, just for you",
  },
  hero: {
    image: "/images/hero/main.jpg",
    eyebrow: "For the girl who makes my world feel different",
    emotionalLine: "Today is about celebrating you, the memories we've created, and everything our story has become.",
  },
  intro: {
    title: "The person who makes my world a little more beautiful.",
    description: "Today is about celebrating you, the memories we've created, and everything our story has become.",
  },
  stats: [
    { value: "365+", label: "days worth celebrating" },
    { value: "∞", label: "reasons to smile" },
    { value: "1", label: "person who means everything" },
  ],
  specialDay: {
    quote: "Today isn't just another date on the calendar. It's the day the world got you — and the day I get to celebrate you.",
  },
  music: {
    enabled: false,
    source: "",
    volume: 0.7,
  },
  secret: {
    enabled: true,
    phrase: "Chinni",
  },
} as const;
