"use client";

import { motion, useReducedMotion } from "framer-motion";

import { quizContent } from "@/data/quiz";

type QuizIntroProps = {
  onStart: () => void;
};

export function QuizIntro({ onStart }: QuizIntroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: "easeOut" }} className="mx-auto max-w-4xl text-center">
      <div className="mb-6 text-[0.68rem] uppercase tracking-[0.44em] text-[#d4af6a]">{quizContent.eyebrow}</div>
      <h2 className="font-display text-5xl leading-none text-[#f5e6d3] sm:text-8xl">{quizContent.title}</h2>
      <p className="mt-7 font-display text-3xl text-[#f5e6d3]/85 sm:text-5xl">{quizContent.subtitle}</p>
      <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#f5e6d3]/60 sm:text-lg">{quizContent.intro}</p>
      <button type="button" onClick={onStart} className="mt-10 min-h-12 border border-[#d4af6a]/60 bg-[#4a1020]/50 px-8 py-3 text-[0.68rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:border-[#d4af6a] hover:bg-[#7b2038]/60 focus-visible:outline-2 focus-visible:outline-[#d4af6a]">
        {quizContent.startLabel}
      </button>
    </motion.div>
  );
}