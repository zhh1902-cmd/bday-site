"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

import type { MemoryAlbum } from "@/data/albums";

type AlbumCardProps = {
  album: MemoryAlbum;
  index: number;
  onOpen: (album: MemoryAlbum, button: HTMLButtonElement) => void;
};

export function AlbumCard({ album, index, onOpen }: AlbumCardProps) {
  const layoutClass = [
    "sm:col-span-7 sm:row-span-2",
    "sm:col-span-5 sm:row-span-1",
    "sm:col-span-5 sm:row-span-1",
    "sm:col-span-7 sm:row-span-2",
    "sm:col-span-5 sm:row-span-2",
    "sm:col-span-7 sm:row-span-1",
    "sm:col-span-7 sm:row-span-2",
    "sm:col-span-5 sm:row-span-2",
  ][index];

  const variantClass = [
    "sm:min-h-[30rem]",
    "sm:min-h-[22rem]",
    "sm:min-h-[23rem]",
    "sm:min-h-[30rem]",
    "sm:min-h-[28rem]",
    "sm:min-h-[22rem]",
    "sm:min-h-[26rem]",
    "sm:min-h-[28rem]",
  ][index];

  const details = [
    [
      { className: "left-7 top-7 text-[0.5rem] text-[#f5e6d3]/75", symbol: "♥" },
      { className: "right-10 top-12 text-[0.4rem] text-[#d4af6a]/80", symbol: "✦" },
      { className: "left-8 bottom-10 text-[0.5rem] text-[#d4af6a]/80", symbol: "✦" },
    ],
    [
      { className: "right-7 top-8 text-[0.55rem] text-[#d4af6a]", symbol: "♥" },
      { className: "left-6 bottom-10 text-[0.45rem] text-[#f5e6d3]/70", symbol: "✦" },
      { className: "right-8 bottom-12 text-[0.45rem] text-[#f4d0d4]/80", symbol: "✧" },
    ],
    [
      { className: "left-6 top-10 text-[0.45rem] text-[#f5e6d3]/75", symbol: "✦" },
      { className: "right-10 bottom-12 text-[0.5rem] text-[#d4af6a]/80", symbol: "♥" },
      { className: "left-10 bottom-8 text-[0.45rem] text-[#e7a8b5]/80", symbol: "✧" },
    ],
    [
      { className: "left-7 top-8 text-[0.5rem] text-[#d4af6a]/85", symbol: "✦" },
      { className: "right-8 top-12 text-[0.5rem] text-[#f5e6d3]/75", symbol: "✧" },
      { className: "left-10 bottom-9 text-[0.45rem] text-[#f5e6d3]/80", symbol: "♥" },
    ],
    [
      { className: "left-8 top-8 text-[0.5rem] text-[#f5e6d3]/75", symbol: "♥" },
      { className: "right-10 top-11 text-[0.45rem] text-[#d4af6a]/80", symbol: "✦" },
      { className: "left-8 bottom-12 text-[0.45rem] text-[#f4d0d4]/80", symbol: "✧" },
    ],
    [
      { className: "right-8 top-9 text-[0.5rem] text-[#d4af6a]/90", symbol: "♥" },
      { className: "left-6 bottom-10 text-[0.5rem] text-[#f5e6d3]/75", symbol: "✦" },
      { className: "right-9 bottom-12 text-[0.45rem] text-[#d4af6a]/80", symbol: "✧" },
    ],
    [
      { className: "left-8 top-9 text-[0.5rem] text-[#f5e6d3]/75", symbol: "✦" },
      { className: "right-9 top-12 text-[0.5rem] text-[#d4af6a]/80", symbol: "♥" },
      { className: "left-10 bottom-9 text-[0.45rem] text-[#f4d0d4]/85", symbol: "✧" },
    ],
    [
      { className: "left-7 top-8 text-[0.5rem] text-[#d4af6a]/80", symbol: "✦" },
      { className: "right-9 bottom-12 text-[0.5rem] text-[#f5e6d3]/80", symbol: "♥" },
      { className: "left-9 bottom-10 text-[0.45rem] text-[#f4d0d4]/85", symbol: "✧" },
    ],
  ][index];

  return (
    <motion.button
      type="button"
      layoutId={`album-${album.id}`}
      onClick={(event) => onOpen(album, event.currentTarget)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className={`group relative flex h-full min-h-[17rem] w-full overflow-hidden border border-[#f5e6d3]/15 bg-[#160b12] text-left shadow-[0_24px_70px_rgba(0,0,0,0.28)] outline-none transition duration-700 hover:border-[#d4af6a]/75 focus-visible:border-[#d4af6a] focus-visible:ring-2 focus-visible:ring-[#d4af6a]/70 ${layoutClass} ${variantClass}`}
      aria-label={`Open album ${album.name}`}
    >
      <Image
        src={album.cover}
        alt={`${album.name} album cover`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
        className="object-cover transition duration-1400 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,7,11,0.12)_14%,rgba(17,7,11,0.42)_48%,rgba(17,7,11,0.86)_100%)] transition duration-700 group-hover:bg-[linear-gradient(180deg,rgba(17,7,11,0.18)_10%,rgba(17,7,11,0.48)_42%,rgba(17,7,11,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(212,175,106,0.22),transparent_65%)]" />
        {details.map((detail, detailIndex) => (
          <span
            key={`${album.id}-${detailIndex}`}
            className={`absolute ${detail.className}`}
            aria-hidden="true"
          >
            {detail.symbol}
          </span>
        ))}
      </div>
      <div className="absolute left-5 top-5 z-10 flex items-center gap-3 text-[0.6rem] uppercase tracking-[0.34em] text-[#f2d7aa] sm:left-7 sm:top-7">
        <span className="h-px w-6 bg-[#d4af6a]/70" aria-hidden="true" />
        {String(index + 1).padStart(2, "0")}
      </div>
      <Heart size={15} className="absolute right-6 top-6 z-10 text-[#f5dfe5]/80 opacity-70 transition duration-500 group-hover:scale-110 group-hover:text-[#d4af6a] sm:right-8 sm:top-8" aria-hidden="true" />
      <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-7">
        <div className="max-w-[85%] transition duration-700 group-hover:-translate-y-1">
          <div className="mb-3 text-[0.58rem] uppercase tracking-[0.32em] text-[#d4af6a] sm:text-[0.64rem]">{index === 4 ? "Birthday memories" : index === 0 ? "Opening chapter" : "Private archive"}</div>
          <h3 className="font-display text-3xl leading-none text-[#f5e6d3] sm:text-4xl lg:text-[2.5rem]">{album.name}</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#f5e6d3]/70">{album.description}</p>
          <p className="mt-4 text-[0.56rem] uppercase tracking-[0.24em] text-[#f5e6d3]/50">{album.photos.length} {album.photos.length === 1 ? "memory" : "memories"}</p>
        </div>
        <ArrowUpRight size={22} className="mb-1 shrink-0 text-[#d4af6a] opacity-0 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" aria-hidden="true" />
      </div>
    </motion.button>
  );
}