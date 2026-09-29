"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import type { JourneyEntry } from "@/data/journey";

type JourneyItemProps = {
  entry: JourneyEntry;
  index: number;
};

export function JourneyItem({ entry, index }: JourneyItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const isReversed = index % 2 === 1;
  const hasValidDate = typeof entry.date === "string" && entry.date.trim().length > 0 && !entry.date.startsWith("[");
  const hasValidLocation = typeof entry.location === "string" && entry.location.trim().length > 0 && !entry.location.startsWith("[");
  const shouldRenderImage = typeof entry.image === "string" && entry.image.trim().length > 0;

  const content = (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: "easeOut" }}
      className={`relative min-w-0 py-1 pl-12 md:pl-0 ${isReversed ? "md:text-right" : "md:text-left"}`}
    >
      {hasValidDate && <div className="mb-4 text-[0.68rem] uppercase tracking-[0.32em] text-[#d4af6a]">{entry.date}</div>}
      <h3 className="font-display text-4xl leading-none text-[#f5e6d3] sm:text-5xl">{entry.title}</h3>
      <p className={`mt-5 max-w-md text-sm leading-7 text-[#f5e6d3]/60 sm:text-base ${isReversed ? "md:ml-auto" : ""}`}>
        {entry.description}
      </p>
      {(entry.category || hasValidLocation) && (
        <div className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.62rem] uppercase tracking-[0.24em] text-[#f5e6d3]/40 ${isReversed ? "md:justify-end" : ""}`}>
          {entry.category && <span>{entry.category}</span>}
          {hasValidLocation && entry.location && <span>{entry.location}</span>}
        </div>
      )}
    </motion.div>
  );

  const image = shouldRenderImage ? (
    <motion.figure
      initial={{ opacity: 0, x: isReversed ? 28 : -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, delay: shouldReduceMotion ? 0 : 0.12, ease: "easeOut" }}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#d4af6a]/20 bg-[#160b12] shadow-[0_22px_70px_rgba(0,0,0,0.32)]"
    >
      <Image
        src={entry.image || ""}
        alt={entry.imageAlt || `${entry.title} memory`}
        fill
        sizes={entry.id === "first-birthday-of-us" ? "(max-width: 640px) 100vw, 46.5vw" : "(max-width: 640px) 100vw, 42vw"}
        className="object-contain transition duration-1000 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,5,5,0.08),rgba(5,5,5,0.56))]" />
      <figcaption className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.26em] text-[#f5e6d3]/70">
        {entry.category || "A moment"}
      </figcaption>
    </motion.figure>
  ) : null;

  return (
    <li className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-6 pb-14 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:gap-x-6 md:gap-y-0 md:pb-20">
      <motion.span
        initial={{ scale: 0.7, opacity: 0.45 }}
        whileInView={{ scale: [0.7, 1.35, 1], opacity: [0.45, 1, 1] }}
        viewport={{ once: true, amount: 0.32 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: "easeOut" }}
        className="absolute left-0 top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#d4af6a]/70 bg-[#050505] text-[#b76e79] shadow-[0_0_0_5px_rgba(212,175,106,0.08),0_0_22px_rgba(212,175,106,0.8)] md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      ><Heart size={10} className="fill-current" /></motion.span>
      {shouldRenderImage ? (
        <>
          <div className={`col-start-2 row-start-1 min-w-0 md:row-start-1 ${isReversed ? "md:col-start-3" : "md:col-start-1"}`}>
            {image}
          </div>
          <div className={`col-start-2 min-w-0 md:row-start-1 md:self-center ${isReversed ? "md:col-start-1" : "md:col-start-3"}`}>
            {content}
          </div>
        </>
      ) : (
        <div className={`col-start-2 row-start-1 min-w-0 md:row-start-1 md:self-center ${isReversed ? "md:col-start-1" : "md:col-start-3"}`}>
          {content}
        </div>
      )}
    </li>
  );
}