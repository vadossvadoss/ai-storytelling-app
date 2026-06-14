import type { Character } from "./types";

export function chatCharacterKey(conversationId: string): string {
  return `chat-character-${conversationId}`;
}

export function saveChatCharacter(
  conversationId: string,
  character: Character
): void {
  localStorage.setItem(
    chatCharacterKey(conversationId),
    JSON.stringify(character)
  );
}

export function loadChatCharacter(conversationId: string): Character | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(chatCharacterKey(conversationId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Character;
  } catch {
    return null;
  }
}

export function createMockConversationId(characterId: string): string {
  return `mock-${characterId}-${Date.now()}`;
}

export function isMockConversationId(conversationId: string): boolean {
  return conversationId.startsWith("mock-");
}
