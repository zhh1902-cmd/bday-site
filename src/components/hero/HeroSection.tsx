"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { birthdayConfig } from "@/data/birthday";

export function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-[#050505] px-6 pb-16 pt-28 sm:px-10 sm:pb-20">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={birthdayConfig.hero.image}
          alt={`Portrait of ${birthdayConfig.partnerName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.16),rgba(5,5,5,0.48)_42%,#050505_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(212,175,106,0.14),transparent_30%)]" />
      <RomanticAtmosphere balloons />
      <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
        {[...Array(18)].map((_, index) => (
          <span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-[#f5e6d3] shadow-[0_0_16px_4px_rgba(212,175,106,0.6)]"
            style={{ left: `${(index * 19) % 100}%`, top: `${(index * 29) % 90}%`, animation: `float ${7 + (index % 5)}s ease-in-out infinite`, animationDelay: `${index * 0.3}s` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        <p className="mb-5 text-[0.68rem] uppercase tracking-[0.45em] text-[#d4af6a]">{birthdayConfig.hero.eyebrow}</p>
        <h1 className="font-display text-6xl leading-[0.9] text-[#f5e6d3] sm:text-8xl md:text-9xl">Happy Birthday</h1>
        <p className="mt-6 font-display text-4xl text-[#f5e6d3]/90 sm:text-6xl">{birthdayConfig.partnerName}</p>
        <p className="mt-7 max-w-md text-base tracking-wide text-[#f5e6d3]/70 sm:text-lg">{birthdayConfig.hero.emotionalLine}</p>
      </motion.div>

      <a href="#birthday-information" className="absolute bottom-7 right-6 z-10 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.3em] text-[#f5e6d3]/65 transition hover:text-[#d4af6a] sm:right-10" aria-label="Scroll to birthday information">
        <span>Scroll to begin</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}