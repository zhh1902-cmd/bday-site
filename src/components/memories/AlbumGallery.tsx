"use client";

/* eslint-disable @next/next/no-img-element -- Public album images need their intrinsic natural ratio. */
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { memoryContent, type MemoryAlbum, type MemoryPhoto } from "@/data/albums";

type AlbumGalleryProps = {
  album: MemoryAlbum;
  onClose: () => void;
  onSelectPhoto: (photo: MemoryPhoto, index: number) => void;
  reduceMotion?: boolean;
};

export function AlbumGallery({ album, onClose, onSelectPhoto, reduceMotion = false }: AlbumGalleryProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-y-auto bg-[#050505]/95 px-5 py-6 backdrop-blur-xl sm:px-10 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.45 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="album-gallery-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <button type="button" onClick={onClose} className="mb-8 flex min-h-11 items-center gap-3 text-[0.62rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60 transition hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]">
              {memoryContent.galleryBackLabel}
            </button>
            <div className="text-[0.65rem] uppercase tracking-[0.38em] text-[#d4af6a]">{memoryContent.albumPrivateLabel}</div>
            <h2 id="album-gallery-title" className="mt-4 font-display text-5xl text-[#f5e6d3] sm:text-7xl">{album.name}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#f5e6d3]/60">{album.description}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#f5e6d3]/20 text-[#f5e6d3] transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]" aria-label="Close album">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {album.photos.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center border-y border-[#d4af6a]/20 text-center">
            <p className="font-display text-4xl text-[#f5e6d3]/75">{memoryContent.emptyState}</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {album.photos.map((photo, index) => (
                (() => {
                  const hasVisibleDate = typeof photo.date === "string" && photo.date.trim().length > 0 && !photo.date.startsWith("[");

                  return (
                <motion.button
                  type="button"
                  key={photo.id}
                  layoutId={`photo-${photo.id}`}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.65, delay: reduceMotion ? 0 : index * 0.08 }}
                  onClick={() => onSelectPhoto(photo, index)}
                  className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d4af6a]"
                  aria-label={`Open photo ${photo.title || `number ${index + 1}`}`}
                >
                  <div className="relative border border-[#f5e6d3]/15 bg-[#160b12]">
                    {photo.type === "video" ? (
                      <video src={photo.src} muted playsInline preload="metadata" aria-label={photo.alt || `${album.name} video ${index + 1}`} className="block h-auto max-h-[70vh] w-full object-contain" />
                    ) : (
                      <img
                        src={photo.src}
                        alt={photo.alt || photo.title || `${album.name} memory ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full object-contain"
                      />
                    )}
                    {photo.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/10">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f5e6d3]/60 bg-[#050505]/55 text-[#f5e6d3]">
                            <span className="ml-1 text-xl">▶</span>
                          </div>
                        </div>
                    )}
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