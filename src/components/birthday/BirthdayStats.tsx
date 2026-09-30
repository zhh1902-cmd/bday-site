"use client";

import { motion, useReducedMotion } from "framer-motion";

import { birthdayConfig } from "@/data/birthday";

export function BirthdayStats() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-16 border-y border-[#d4af6a]/20">
      <p className="pt-6 text-center text-[0.6rem] uppercase tracking-[0.34em] text-[#d4af6a]/75">Another beautiful year</p>
      <div className="grid sm:grid-cols-3">
        {birthdayConfig.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, delay: shouldReduceMotion ? 0 : index * 0.12, ease: "easeOut" }}
            className="border-b border-[#d4af6a]/15 px-6 py-9 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
          >
            <div className="font-display text-5xl text-[#f2d7aa] sm:text-6xl">{stat.value}</div>
            <div className="mt-3 text-[0.62rem] uppercase tracking-[0.25em] text-[#f5e6d3]/55">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}