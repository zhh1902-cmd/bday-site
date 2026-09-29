"use client";

import { motion, useReducedMotion } from "framer-motion";

import { journeyContent, journeyEntries } from "@/data/journey";
import { JourneyItem } from "@/components/journey/JourneyItem";

export function JourneyTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-24">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.02 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-y-0 left-[11px] z-0 w-px origin-top bg-gradient-to-b from-[#d4af6a]/25 via-[#d4af6a]/60 to-[#7b2038]/25 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />
      <ol className="relative space-y-0" aria-label="Relationship milestones">
        {journeyEntries.map((entry, index) => (
          <JourneyItem key={entry.id} entry={entry} index={index} />
        ))}
        <li className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-4 pb-8 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-6 md:pb-16">
          <motion.span
            initial={{ scale: 0.7, opacity: 0.45 }}
            whileInView={{ scale: [0.7, 1.35, 1], opacity: [0.45, 1, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: "easeOut" }}
            className="absolute left-[3px] top-1 z-10 h-4 w-4 rounded-full border-2 border-[#d4af6a] bg-[#050505] shadow-[0_0_0_5px_rgba(212,175,106,0.08),0_0_22px_rgba(212,175,106,0.8)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: "easeOut" }}
            className="col-start-2 min-w-0 pb-8 pt-1 md:col-span-3 md:col-start-1 md:row-start-1 md:text-center"
          >
            <div className="text-[0.68rem] uppercase tracking-[0.38em] text-[#d4af6a]">{journeyContent.todayLabel}</div>
            <h3 className="mt-4 font-display text-4xl text-[#f5e6d3] sm:text-6xl">{journeyContent.todayTitle}</h3>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#f5e6d3]/60">{journeyContent.todayDescription}</p>
          </motion.div>
        </li>
      </ol>
    </div>
  );
}