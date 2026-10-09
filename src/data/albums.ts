export interface MemoryPhoto {
  id: string;
  type?: "image" | "video";
  src: string;
  poster?: string;
  alt?: string;
  title?: string;
  caption?: string;
  date?: string;
}

export interface MemoryAlbum {
  id: string;
  name: string;
  description: string;
  cover: string;
  photos: MemoryPhoto[];
}

export const memoryContent = {
  eyebrow: "Mana Birthday Edition ❤️",
  title: "MANA MEMORIES",
  subtitle: "Prathi chinna moment. ❤️",
  intro: "Mana story ni create chesina prathi chinna memory... okkokkati kalisi mana world ayyayi. ❤️",
  albumPrivateLabel: "Mana Collection ❤️",
  galleryBackLabel: "← Mana Memories ki",
  emptyState: "Inka memories add cheyyali... ❤️",
} as const;

export const albumLabels: Record<string, string> = {
  "crazy-us": "Mana Crazy Chapter",
  "favorite-pictures": "Mana Favorite Memories",
  festivals: "Mana Festival Memories",
  "just-us": "Only Us",
  "just-you": "Birthday Memories",
  "our-beginning": "Mana Beginning",
  "our-dates": "Mana Date Memories",
  "special-days": "Mana Special Days",
};

const imagePath = (albumId: string, filename: string) => `/images/albums/${albumId}/${encodeURIComponent(filename)}`;

const createAlbum = (id: string, name: string, description: string, filenames: string[]): MemoryAlbum => {
  const photos = filenames.map((filename, index): MemoryPhoto => ({
    id: `${id}-${index + 1}`,
    type: "image",
    src: imagePath(id, filename),
    alt: `${name} memory ${index + 1}`,
    title: name,
    caption: "Mana story lo inkoka beautiful moment. ❤️",
  }));

  return { id, name, description, cover: photos[0].src, photos };
};

export const memoryAlbums: MemoryAlbum[] = [
  createAlbum("crazy-us", "Crazy Us", "Mana iddari crazy moments, silly moments, unpredictable moments anni ikkade. 😂❤️", [
    "IMG_20251008_212053_228.jpg",
    "IMG_20251102_171812.jpg",
    "IMG_20251110_191200.jpg",
    "IMG_20251230_185508.jpg",
    "IMG_20260101_110606.jpg",
    "IMG-20251011-WA0009.jpg",
  ]),
  createAlbum("favorite-pictures", "Favorite Pictures", "Enni pictures unna, malli malli chudalanipinche mana favorite pictures. ❤️", [
    "IMG_20250913_161541.jpg",
    "IMG_20251008_212112_871.jpg",
    "IMG_20251011_162307.jpg",
    "photo_2026-09-06_11-44-50.jpg",
  ]),
  createAlbum("festivals", "Festivals", "Kalisi celebrate chesina festivals... mana memories lo special ga migilipoyina rojulu. ❤️", [
    "IMG_20251110_191200.jpg",
    "IMG_20251230_185754.jpg",
    "IMG_20260303_183810.jpg",
    "IMG_20260725_183035.jpg",
    "IMG-20250827-WA0019.jpg",
    "photo_2026-09-06_11-39-05.jpg",
    "photo_2026-09-06_11-42-05.jpg",
    "photo_2026-09-06_11-44-50.jpg",
  ]),
  createAlbum("just-us", "Just Us", "Mana iddariki matrame belong ayye konni special moments. ❤️", [
    "IMG-20251010-WA0021.jpg",
    "IMG-20260212-WA0013.jpg",
    "IMG-20260214-WA0018.jpg",
    "IMG-20260801-WA0001.jpg",
    "WhatsApp Image 2026-03-03 at 2.54.05 PM.jpeg",
  ]),
  createAlbum("just-you", "Just You", "Nuvvu, nee cute moments, nee beautiful pictures... simply just you. ❤️", [
    "IMG_20251026_094421.jpg",
    "IMG_20251230_185728.jpg",
    "IMG_20260214_182236.jpg",
    "IMG_20260215_191642.jpg",
    "IMG_20260303_184842.jpg",
    "IMG_20260725_183213.jpg",
    "IMG-20251010-WA0018.jpg",
    "IMG-20260124-WA0014.jpg",
    "IMG-20260124-WA0016.jpg",
    "IMG-20260127-WA0001.jpg",
    "IMG-20260301-WA0003.jpg",
    "IMG-20260312-WA0010.jpg",
    "IMG-20260319-WA0003.jpg",
    "IMG-20260403-WA0040.jpg",
    "IMG-20260801-WA0004.jpg",
    "IMG-20260811-WA0016.jpg",
    "IMG-20260814-WA0018.jpg",
    "photo_2026-09-06_11-44-13.jpg",
  ]),
  createAlbum("our-beginning", "Our Beginning", "Mana story start ayina first chapters... akkadi nundi ippudaka vachina journey. ❤️", [
    "IMG_20250809_185040_392.jpg",
    "IMG-20260814-WA0008.jpg",
    "IMG-20260814-WA0011.jpg",
  ]),
  createAlbum("our-dates", "Our Dates", "Manam kalisi spend chesina days, places, and moments anni mana memories ga maaripoyayi. ❤️", [
    "IMG_20251008_212053_542.jpg",
    "IMG_20251010_141153.jpg",
    "IMG_20251026_094649.jpg",
    "IMG-20260801-WA0002.jpg",
    "photo_2024-03-07_14-03-42.jpg",
  ]),
  createAlbum("special-days", "Special Days", "Konni days normal days kaavu... mana story lo konchem extra special meaning unna days. ❤️", [
    "IMG_20251221_103216.jpg",
    "IMG_20260214_181335.jpg",
    "IMG_20260215_192254.jpg",
    "IMG_20260303_183810.jpg",
    "IMG_20260410_173241.jpg",
  ]),
];