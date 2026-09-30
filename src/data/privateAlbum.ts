export const privateAlbumContent = {
  id: "only-us",
  name: "ONLY US",
  subtitle: "Private Memories",
  description: "Some memories are meant to stay between us.",
  lockMessage: "Some memories are meant\nto stay between us.",
  wrongPassword: "That's not the key to our little secret.",
} as const;

export interface PrivateAlbumPhoto {
  id: string;
  src: string;
  type: "image" | "video";
  alt: string;
  title: string;
  caption: string;
}