"use client";

import { motion } from "framer-motion";

import { journeyContent } from "@/data/journey";

export function JourneyIntro() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 text-[0.68rem] uppercase tracking-[0.45em] text-[#d4af6a]"
      >
        {journeyContent.eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-display text-5xl leading-none text-[#f5e6d3] sm:text-7xl"
      >
        {journeyContent.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}
        className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#f5e6d3]/65 sm:text-lg"
      >
        {journeyContent.subtitle}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mx-auto mt-20 max-w-2xl font-display text-3xl leading-tight text-[#f5e6d3] sm:text-5xl"
      >
        {journeyContent.intro}
      </motion.p>
    </div>
  );
}