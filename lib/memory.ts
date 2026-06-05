import type { Memory } from "./types";

const mockMemories: Memory[] = [
  {
    id: "mem-1",
    characterId: "char-1",
    userId: "user-1",
    content: "The user is searching for a portal in the Whispering Woods",
    importance: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "mem-2",
    characterId: "char-1",
    userId: "user-1",
    content: "The user showed courage when asking about forbidden knowledge",
    importance: 7,
    createdAt: new Date().toISOString(),
  },
];

export function getTopMemories(
  characterId: string,
  userId: string,
  limit = 5
): Memory[] {
  return mockMemories
    .filter((m) => m.characterId === characterId && m.userId === userId)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, limit);
}

export async function saveMemory(
  characterId: string,
  userId: string,
  content: string,
  importance: number
): Promise<Memory> {
  const memory: Memory = {
    id: `mem-${Date.now()}`,
    characterId,
    userId,
    content,
    importance,
    createdAt: new Date().toISOString(),
  };
  mockMemories.push(memory);
  return memory;
}
