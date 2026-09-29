"use client";

import type { MemoryAlbum } from "@/data/albums";
import { AlbumCard } from "@/components/memories/AlbumCard";

type AlbumGridProps = {
  albums: MemoryAlbum[];
  onOpen: (album: MemoryAlbum, button: HTMLButtonElement) => void;
};

export function AlbumGrid({ albums, onOpen }: AlbumGridProps) {
  return (
    <div className="grid gap-5 sm:auto-rows-[minmax(12rem,auto)] sm:grid-cols-12 sm:gap-6 sm:items-stretch">
      {albums.map((album, index) => (
        <AlbumCard key={album.id} album={album} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}