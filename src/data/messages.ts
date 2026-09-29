export interface EmotionalMessage {
  id: string;
  text: string;
  emphasis?: boolean;
  pauseAfter?: number;
}

export const emotionalContent = {
  eyebrow: "A quieter chapter",
  title: "THERE ARE SOME THINGS I NEVER SAY ENOUGH",
  intro: "So let me say them now.",
  continueLabel: "Continue →",
  secretTransition: "One more thing...",
  secretIntro: "There's something I kept hidden for you.",
} as const;

export const emotionalMessages: EmotionalMessage[] = [
  { id: "transition-1", text: "Some people enter your life quietly, and somehow become part of everything.", pauseAfter: 800 },
  { id: "transition-2", text: "From that first meeting on 31 October 2023 to everything that followed, our story slowly became something of its own.", pauseAfter: 800 },
  { id: "message-1", text: "Not every moment was perfect. Some moments taught us, some made us laugh, and some changed the way we understood each other." },
  { id: "message-2", text: "Through all of it, you became someone whose presence feels like home." },
  { id: "message-3", text: "This was a moment of regret, reflection, and understanding — a moment that changed how I looked at my actions and how deeply they could affect someone I loved.", emphasis: true },
  { id: "final-lead", text: "Happy Birthday, Chinni.", emphasis: true },
  { id: "final-reveal", text: "This little world is just a collection of pieces of our story — and there is still so much more to write.", emphasis: true, pauseAfter: 1000 },
];