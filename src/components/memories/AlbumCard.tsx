"use client";

/* eslint-disable @next/next/no-img-element -- Public album images need their intrinsic natural ratio. */
import { ArrowUpRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

import type { MemoryAlbum } from "@/data/albums";

type AlbumCardProps = {
  album: MemoryAlbum;
  index: number;
  onOpen: (album: MemoryAlbum, button: HTMLButtonElement) => void;
};

export function AlbumCard({ album, index, onOpen }: AlbumCardProps) {
  return (
    <motion.button
      type="button"
      layoutId={`album-${album.id}`}
      onClick={(event) => onOpen(album, event.currentTarget)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#d4af6a]/70"
      aria-label={`Open album ${album.name}`}
    >
      <img
        src={album.cover}
        alt={`${album.name} album cover`}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full border border-[#f5e6d3]/15 bg-[#160b12] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-700 group-hover:border-[#d4af6a]/75"
      />
      <div className="flex items-start justify-between gap-4 border-b border-[#f5e6d3]/15 py-5">
        <div>
          <div className="mb-2 text-[0.58rem] uppercase tracking-[0.32em] text-[#d4af6a]">{index === 4 ? "Birthday memories" : index === 0 ? "Opening chapter" : "Private archive"}</div>
          <h3 className="font-display text-3xl leading-none text-[#f5e6d3] transition-colors group-hover:text-[#f2d7aa]">{album.name}</h3>
          <p className="mt-3 text-sm leading-6 text-[#f5e6d3]/60">{album.description}</p>
          <p className="mt-4 text-[0.56rem] uppercase tracking-[0.24em] text-[#f5e6d3]/45">{album.photos.length} {album.photos.length === 1 ? "memory" : "memories"}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 pt-1">
          <Heart size={15} className="text-[#f5dfe5]/65 transition-colors group-hover:text-[#d4af6a]" aria-hidden="true" />
          <ArrowUpRight size={22} className="text-[#d4af6a] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </div>
      </div>
    </motion.button>
  );
}