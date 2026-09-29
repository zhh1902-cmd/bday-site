"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { EmotionalMessage } from "@/data/messages";

type EmotionalMessageStepProps = {
  message: EmotionalMessage;
  step: number;
  total: number;
  continueLabel: string;
  onContinue: () => void;
};

export function EmotionalMessageStep({ message, step, total, continueLabel, onContinue }: EmotionalMessageStepProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(14px)", y: shouldReduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)", y: shouldReduceMotion ? 0 : -14 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: "easeOut" }}
      className="flex min-h-[32rem] flex-col items-center justify-center text-center"
    >
      <p className={`max-w-4xl font-display leading-[1.08] ${message.emphasis ? "text-5xl text-[#d4af6a] sm:text-7xl" : "text-4xl text-[#f5e6d3] sm:text-6xl"}`}>
        {message.text}
      </p>
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="text-[0.6rem] uppercase tracking-[0.34em] text-[#f5e6d3]/35">{String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
        <button type="button" onClick={onContinue} className="min-h-12 border border-[#d4af6a]/45 px-7 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/80 transition hover:border-[#d4af6a] hover:bg-[#4a1020]/45 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">
          {continueLabel}
        </button>
      </div>
    </motion.div>
  );
}