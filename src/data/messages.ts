export interface EmotionalMessage {
  id: string;
  text: string;
  emphasis?: boolean;
  pauseAfter?: number;
}

export const emotionalContent = {
  eyebrow: "Nee Kosame idi",
  title: "Entha cheppina thakkuva anipinche matalu",
  intro: "ippudu cheptha vinu.",
  continueLabel: "Inka undhi...",
  secretTransition: "Inka okati...",
  secretIntro: "Neekosam daachi pettina oka vishayam undi",
} as const;

export const emotionalMessages: EmotionalMessage[] = [
  { id: "transition-1", text: "Anukokunda naa jeevitham loki vachi, aa anukoni parichayame naa jeevitham avuthundani assalu anukoledu. ❤️", pauseAfter: 800 },
  { id: "transition-2", text: "Mana first meeting 31 Oct 2023 nundi ippudaka enno addakulu daatukoni vacham.", pauseAfter: 800 },
  { id: "message-1", text: "Prathi moment perfect ga em ledu. Konni moments manaki chala nerpinchayi, konni moments manalni navvinchayi, inkonni moments okarini okaram inka better ga understand cheskune la chesayi." },
  { id: "message-2", text: "Enni situations vachina, enni moments daatina, nee presence naaku eppudu oka home la anipisthundi." },
  { id: "message-3", text: "Adi na life lo oka regret moment, alochinchina moment, chala nerchukunna moment. Aa moment tarvatha naa actions ni nenu chuse vidhanam marindi, nenu preminche person ni naa actions entha deep ga hurt cheyagalavo kuda ardham ayyindi. ❤️", emphasis: true },
  { id: "final-lead", text: "Happy Birthday naa Chinni ❤️", emphasis: true },
  { id: "final-reveal", text: "Ee chinna world mana story lo konni konni beautiful moments ni kalipi create chesindi. Kani mana story ikkade aipoledu, inka chala rayalsi undi, inka chala memories create cheskovali. ❤️", emphasis: true, pauseAfter: 1000 },
];