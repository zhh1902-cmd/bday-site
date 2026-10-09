"use client";

import { motion, useReducedMotion } from "framer-motion";

import { finalGiftContent } from "@/data/finalGift";

export function FinalMessage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: "easeOut" }} className="relative z-10 mx-auto flex min-h-[70vh] flex-col items-center justify-center text-center">
      <div className="final-message-bloom pointer-events-none absolute inset-x-[-15%] top-1/2 h-72 -translate-y-1/2" aria-hidden="true" />
      <p className="text-[0.68rem] uppercase tracking-[0.36em] text-[#d4af6a]">{finalGiftContent.finalEyebrow}</p>
      <h2 className="heartbeat-glow mt-7 font-display text-6xl leading-none text-[#f5e6d3] sm:text-9xl">{finalGiftContent.birthdayHeading}</h2>
      <p className="mt-7 font-display text-5xl text-[#d4af6a] sm:text-7xl">{finalGiftContent.partnerName}</p>
      <p className="mt-8 text-lg tracking-wide text-[#f5e6d3]/70">{finalGiftContent.dedicationLine}</p>
      <p className="mt-4 font-display text-3xl text-[#f5e6d3]/85 sm:text-4xl">{finalGiftContent.signature}</p>
    </motion.div>
  );
}