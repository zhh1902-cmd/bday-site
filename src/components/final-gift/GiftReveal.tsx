"use client";

import { motion, useReducedMotion } from "framer-motion";

type GiftRevealProps = {
  visible: boolean;
};

export function GiftReveal({ visible }: GiftRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div initial={{ opacity: 0, scale: 0.82, y: 24 }} animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.82, y: 24 }} transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: "easeOut" }} className="relative mx-auto h-56 w-64 sm:h-64 sm:w-72" aria-label="A glowing gift waiting to be delivered" role="img">
      <div className="absolute inset-8 rounded-[45%] bg-[#4a1020]/60 blur-3xl" />
      {[...Array(8)].map((_, index) => (
        <span key={index} className="absolute h-1 w-1 rounded-full bg-[#d4af6a] shadow-[0_0_14px_3px_rgba(212,175,106,0.7)]" style={{ left: `${12 + ((index * 29) % 76)}%`, top: `${12 + ((index * 41) % 70)}%`, opacity: visible ? 0.55 : 0 }} aria-hidden="true" />
      ))}
      <div className="absolute bottom-8 left-1/2 h-32 w-44 -translate-x-1/2 border border-[#d4af6a]/70 bg-[#160b12]/90 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:h-36 sm:w-52">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#d4af6a]/75" />
        <div className="absolute -top-4 left-1/2 h-7 w-[calc(100%+12px)] -translate-x-1/2 border border-[#d4af6a]/70 bg-[#2a0e1a]" />
        <div className="absolute -top-4 left-1/2 h-7 w-10 -translate-x-1/2 border-x border-[#d4af6a]/80 bg-[#4a1020]/70" />
        <div className="absolute left-1/2 top-1/2 h-20 w-px -translate-x-1/2 -translate-y-1/2 bg-[#d4af6a] shadow-[0_0_14px_rgba(212,175,106,0.8)]" />
      </div>
    </motion.div>
  );
}