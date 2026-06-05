import type { Character, Conversation } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface BackendCharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CharactersResponse {
  characters: BackendCharacter[];
}

interface ConversationsResponse {
  conversations: Conversation[];
}

interface CreateConversationResponse {
  conversation: Conversation;
}

interface ChatResponse {
  response: string;
  conversationId?: string;
  message: {
    id: string;
    role: string;
    content: string;
    createdAt: string;
  };
}

function mapCharacter(character: BackendCharacter): Character {
  return {
    id: character.id,
    name: character.name,
    description: character.description,
    systemPrompt: character.personality,
    imageUrl: character.avatarUrl,
    authorId: "",
    isPublic: true,
    genre: "fantasy",
    tags: [],
    createdAt: character.createdAt,
  };
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${API_BASE}/api/characters`);
  const data = await handleResponse<CharactersResponse>(res);
  return data.characters.map(mapCharacter);
}

export async function sendMessage(
  conversationId: string,
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ conversationId, message }),
  });
  return handleResponse<ChatResponse>(res);
}

export async function getConversations(): Promise<Conversation[]> {
  const res = await fetch(`${API_BASE}/api/conversations`, {
    headers: getAuthHeaders(),
  });
  const data = await handleResponse<ConversationsResponse>(res);
  return data.conversations;
}

export async function createConversation(
  characterId: string
): Promise<Conversation> {
  const res = await fetch(`${API_BASE}/api/conversations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      characterId,
      title: "New Story",
    }),
  });
  const data = await handleResponse<CreateConversationResponse>(res);
  return data.conversation;
}
