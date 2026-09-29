"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import type { MemoryPhoto } from "@/data/albums";

type MemoryLightboxProps = {
  photos: MemoryPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function MemoryLightbox({ photos, index, onClose, onChange }: MemoryLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const touchStart = useRef<number | null>(null);
  const photo = photos[index];
  const canNavigate = photos.length > 1;

  const move = (direction: number) => {
    if (!canNavigate) return;
    onChange((index + direction + photos.length) % photos.length);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/[.98] p-5 backdrop-blur-2xl sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label="Memory photo viewer"
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = event.changedTouches[0]?.clientX - touchStart.current;
        if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-[#f5e6d3]/25 text-[#f5e6d3] transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:right-10 sm:top-8" aria-label="Close photo viewer">
        <X size={22} aria-hidden="true" />
      </button>

      {canNavigate && (
        <>
          <button type="button" onClick={() => move(-1)} className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#f5e6d3]/20 text-[#f5e6d3] transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:left-8" aria-label="Previous photo">
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[#f5e6d3]/20 text-[#f5e6d3] transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:right-8" aria-label="Next photo">
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </>
      )}

      <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center pb-14 pt-12">
        <div className="relative min-h-0 w-full flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={photo.id} initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.35 }} className="absolute inset-0">
              {photo.type === "video" ? (
                <video className="h-full w-full object-contain bg-[#050505]" controls playsInline muted preload="metadata" poster={photo.poster || photo.src} aria-label={photo.title || "Memory video"}>
                  <source src={photo.src} type="video/mp4" />
                </video>
              ) : (
                <Image src={photo.src} alt={photo.alt || photo.title || "Memory photograph"} fill sizes="100vw" className="object-contain" priority={index === 0} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex w-full max-w-3xl items-end justify-between gap-5 border-t border-[#f5e6d3]/15 pt-4">
          <div>
            {photo.title && <h2 className="font-display text-3xl text-[#f5e6d3]">{photo.title}</h2>}
            {photo.caption && <p className="mt-1 text-sm text-[#f5e6d3]/60">{photo.caption}</p>}
          </div>
          <div className="shrink-0 text-right text-[0.65rem] uppercase tracking-[0.26em] text-[#d4af6a]">
            {photo.date && <div className="mb-2">{photo.date}</div>}
            <div>{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}