"use client";

import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { MemoryAlbum, MemoryPhoto } from "@/data/albums";

type AlbumGalleryProps = {
  album: MemoryAlbum;
  onClose: () => void;
  onSelectPhoto: (photo: MemoryPhoto, index: number) => void;
};

export function AlbumGallery({ album, onClose, onSelectPhoto }: AlbumGalleryProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-y-auto bg-[#050505]/95 px-5 py-6 backdrop-blur-xl sm:px-10 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="album-gallery-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <button type="button" onClick={onClose} className="mb-8 flex min-h-11 items-center gap-3 text-[0.62rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60 transition hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]">
              <ArrowLeft size={16} aria-hidden="true" /> Back to memories
            </button>
            <div className="text-[0.65rem] uppercase tracking-[0.38em] text-[#d4af6a]">Private collection</div>
            <h2 id="album-gallery-title" className="mt-4 font-display text-5xl text-[#f5e6d3] sm:text-7xl">{album.name}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#f5e6d3]/60">{album.description}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#f5e6d3]/20 text-[#f5e6d3] transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]" aria-label="Close album">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {album.photos.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center border-y border-[#d4af6a]/20 text-center">
            <p className="font-display text-4xl text-[#f5e6d3]/75">Memories coming soon.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
            <AnimatePresence initial={false}>
              {album.photos.map((photo, index) => (
                (() => {
                  const hasVisibleDate = typeof photo.date === "string" && photo.date.trim().length > 0 && !photo.date.startsWith("[");

                  return (
                <motion.button
                  type="button"
                  key={photo.id}
                  layoutId={`photo-${photo.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  onClick={() => onSelectPhoto(photo, index)}
                  className={`group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a] ${index % 3 === 0 ? "sm:row-span-2" : ""}`}
                  aria-label={`Open photo ${photo.title || `number ${index + 1}`}`}
                >
                  <div className={`relative overflow-hidden border border-[#f5e6d3]/15 bg-[#160b12] ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    {photo.type === "video" ? (
                      <div className="relative h-full w-full">
                        <Image src={photo.poster || photo.src} alt={photo.alt || photo.title || `${album.name} memory ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 48vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/20">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f5e6d3]/60 bg-[#050505]/55 text-[#f5e6d3]">
                            <span className="ml-1 text-xl">▶</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image src={photo.src} alt={photo.alt || photo.title || `${album.name} memory ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 48vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-[#050505]/10 transition duration-700 group-hover:bg-[#050505]/30" />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      {photo.title && <h3 className="font-display text-3xl text-[#f5e6d3]">{photo.title}</h3>}
                      {photo.caption && <p className="mt-2 text-sm leading-6 text-[#f5e6d3]/55">{photo.caption}</p>}
                    </div>
                    {hasVisibleDate && <span className="pt-1 text-[0.6rem] uppercase tracking-[0.25em] text-[#d4af6a]">{photo.date}</span>}
                  </div>
                </motion.button>
                  );
                })()
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}