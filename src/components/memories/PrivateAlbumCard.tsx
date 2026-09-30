"use client";

import { Heart, LockKeyhole } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { privateAlbumContent } from "@/data/privateAlbum";

type PrivateAlbumCardProps = {
  onOpen: (button: HTMLButtonElement) => void;
};

export function PrivateAlbumCard({ onOpen }: PrivateAlbumCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={(event) => onOpen(event.currentTarget)}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: "easeOut" }}
      className="group relative mx-auto mt-20 flex min-h-56 w-full max-w-4xl items-center justify-between gap-6 overflow-hidden border border-[#d4af6a]/35 bg-[#1b0b14] px-7 py-9 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-colors hover:border-[#d4af6a]/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:min-h-64 sm:px-12"
      aria-label={`Open private album ${privateAlbumContent.name}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_50%,rgba(104,24,53,0.35),transparent_52%),linear-gradient(115deg,rgba(27,11,20,0.2),rgba(70,19,42,0.2))]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 border-l border-[#d4af6a]/10 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,106,0.1),transparent_58%)]" />
      <div className="relative min-w-0">
        <div className="mb-5 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#d4af6a]">
          <span className="h-px w-7 bg-[#d4af6a]/70" aria-hidden="true" />
          A little secret
        </div>
        <h3 className="font-display text-4xl leading-none text-[#f5e6d3] sm:text-5xl">{privateAlbumContent.name}</h3>
        <p className="mt-3 text-sm tracking-[0.08em] text-[#f5e6d3]/65">{privateAlbumContent.subtitle}</p>
      </div>
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center border border-[#d4af6a]/30 text-[#e8c98e] transition duration-500 group-hover:border-[#d4af6a]/75 group-hover:bg-[#d4af6a]/[0.07] sm:h-20 sm:w-20">
        <LockKeyhole size={24} strokeWidth={1.4} aria-hidden="true" />
        <Heart size={10} className="absolute -right-1 -top-1 fill-[#1b0b14] text-[#d4af6a]" aria-hidden="true" />
      </div>
    </motion.button>
  );
}