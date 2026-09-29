"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AlbumGallery } from "@/components/memories/AlbumGallery";
import { AlbumGrid } from "@/components/memories/AlbumGrid";
import { MemoryLightbox } from "@/components/memories/MemoryLightbox";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { memoryAlbums, memoryContent, type MemoryAlbum, type MemoryPhoto } from "@/data/albums";

export function MemoriesSection() {
  const [selectedAlbum, setSelectedAlbum] = useState<MemoryAlbum | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const isOverlayOpen = selectedAlbum !== null;
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedAlbum]);

  useEffect(() => {
    if (selectedAlbum) return;
    lastTrigger.current?.focus();
  }, [selectedAlbum]);

  useEffect(() => {
    if (!selectedAlbum) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) setLightboxIndex(null);
        else setSelectedAlbum(null);
      }
      if (lightboxIndex !== null && event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % selectedAlbum.photos.length);
      if (lightboxIndex !== null && event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, selectedAlbum]);

  const openAlbum = (album: MemoryAlbum, button: HTMLButtonElement) => {
    lastTrigger.current = button;
    setSelectedAlbum(album);
    setLightboxIndex(null);
  };

  const openPhoto = (_photo: MemoryPhoto, index: number) => setLightboxIndex(index);

  return (
    <section id="our-memories" className="relative overflow-hidden bg-[#0b0b10] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(123,32,56,0.2),transparent_32%),radial-gradient(circle_at_15%_56%,rgba(212,175,106,0.06),transparent_22%)]" />
      <RomanticAtmosphere hearts sparkles />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: "easeOut" }} className="mb-20 max-w-3xl">
          <div className="mb-6 text-[0.68rem] uppercase tracking-[0.44em] text-[#d4af6a]">{memoryContent.eyebrow}</div>
          <h2 className="font-display text-5xl leading-none text-[#f5e6d3] sm:text-8xl">{memoryContent.title}</h2>
          <p className="mt-7 font-display text-3xl text-[#f5e6d3]/85 sm:text-5xl">{memoryContent.subtitle}</p>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#f5e6d3]/60 sm:text-lg">{memoryContent.intro}</p>
        </motion.div>

        <AlbumGrid albums={memoryAlbums} onOpen={openAlbum} />
      </div>

      <AnimatePresence>
        {selectedAlbum && lightboxIndex === null && <AlbumGallery album={selectedAlbum} onClose={() => setSelectedAlbum(null)} onSelectPhoto={openPhoto} />}
        {selectedAlbum && lightboxIndex !== null && <MemoryLightbox photos={selectedAlbum.photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />}
      </AnimatePresence>
    </section>
  );
}