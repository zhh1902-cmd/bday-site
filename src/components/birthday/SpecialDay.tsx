"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { birthdayConfig } from "@/data/birthday";

export function SpecialDay() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [36, -36]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[78vh] items-center overflow-hidden bg-[#050505] px-6 py-28 sm:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(123,32,56,0.3),transparent_48%),linear-gradient(120deg,#050505,#160b12_52%,#050505)]" />
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        {[...Array(14)].map((_, index) => (
          <span
            key={index}
            className="absolute h-px w-px rounded-full bg-[#d4af6a] shadow-[0_0_14px_3px_rgba(212,175,106,0.7)]"
            style={{ left: `${(index * 23) % 100}%`, top: `${(index * 31) % 100}%` }}
          />
        ))}
      </div>
      <RomanticAtmosphere hearts sparkles balloons />
      <motion.div style={{ y }} className="relative mx-auto max-w-5xl text-center">
        <p className="mb-7 text-[0.62rem] uppercase tracking-[0.36em] text-[#d4af6a]">{birthdayConfig.specialDay.eyebrow}</p>
        <motion.p
          initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: "easeOut" }}
          className="font-display text-4xl leading-[1.1] text-[#f5e6d3] sm:text-6xl md:text-7xl"
        >
          {birthdayConfig.specialDay.quote}
        </motion.p>
      </motion.div>
    </section>
  );
}