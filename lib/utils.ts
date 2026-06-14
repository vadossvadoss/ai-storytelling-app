import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCharacterAvatarUrl(character: {
  name: string;
  imageUrl: string | null;
}): string {
  if (character.imageUrl) return character.imageUrl;

  const seed = character.name.split(/\s+/)[0] ?? character.name;
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(seed)}`;
}

export function getFirstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text;
}

export { buildWelcomeMessage } from "./anime";
