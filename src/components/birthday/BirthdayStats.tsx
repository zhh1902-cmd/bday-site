"use client";

import { motion } from "framer-motion";

import { birthdayConfig } from "@/data/birthday";

export function BirthdayStats() {
  return (
    <div className="mt-16 grid border-y border-white/10 sm:grid-cols-3">
      {birthdayConfig.stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
          className="border-b border-white/10 px-6 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
        >
          <div className="font-display text-5xl text-[#d4af6a] sm:text-6xl">{stat.value}</div>
          <div className="mt-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}