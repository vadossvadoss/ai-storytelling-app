export type Genre = "fantasy" | "sci-fi" | "romance" | "horror";

export interface Character {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  imageUrl: string | null;
  authorId: string;
  isPublic: boolean;
  genre: Genre;
  tags: string[];
  createdAt: string;
}

export interface World {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  authorId: string;
  isPublic: boolean;
  characterIds: string[];
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  characterId: string;
  worldId: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
  character?: Character;
  messages?: Message[];
}

export interface Memory {
  id: string;
  characterId: string;
  userId: string;
  content: string;
  importance: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  mana: number;
  createdAt: string;
}
