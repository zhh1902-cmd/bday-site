export const cakeContent = {
  eyebrow: "A final little ritual",
  introTitle: "Before you continue, there's one more little birthday tradition.",
  title: "Make a Wish",
  revealLabel: "Reveal the cake",
  instruction: "Take a breath and blow toward your microphone.",
  microphoneButton: "Blow out the candles",
  microphoneExplanation: "Take a breath and blow toward your microphone.",
  listeningLabel: "Listening for your wish...",
  fallbackLabel: "Or tap the cake to blow out the candles.",
  fallbackTitle: "Microphone access isn't available here.",
  fallbackText: "That's okay — you can make the wish another way.",
  extinguishingLabel: "Wish made.",
  wishedTitle: "Wish made.",
  wishedText: "I hope it comes true.",
  continueLabel: "Continue to your gift",
  completedTitle: "Your wish is safe with me.",
  completedText: "The next chapter can wait for its own moment.",
  cakeAlt: "A candlelit birthday cake in a cinematic midnight setting",
} as const;

export const cakeConfig = {
  candleCount: 5,
  microphoneThreshold: 0.12,
  sustainedBlowMs: 450,
  extinguishDurationMs: 1200,
} as const;