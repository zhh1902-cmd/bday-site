"use client";

import type { MemoryAlbum } from "@/data/albums";
import { AlbumCard } from "@/components/memories/AlbumCard";

type AlbumGridProps = {
  albums: MemoryAlbum[];
  onOpen: (album: MemoryAlbum, button: HTMLButtonElement) => void;
};

export function AlbumGrid({ albums, onOpen }: AlbumGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
      {albums.map((album, index) => (
        <AlbumCard key={album.id} album={album} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}