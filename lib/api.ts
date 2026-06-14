import type { Character, Conversation, AuthUser } from "./types";
import { getStoredToken } from "./auth-store";
import { getApiBaseUrl } from "./api-config";

const API_BASE = getApiBaseUrl();

interface BackendCharacter {
  id: string;
  name: string;
  description: string;
  systemPrompt?: string;
  personality?: string;
  imageUrl?: string;
  avatarUrl?: string | null;
  genre?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
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

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface ApiError {
  error?: string;
}

function normalizeGenre(genre?: string): Character["genre"] {
  const value = genre?.toLowerCase() ?? "";
  if (value.includes("sci")) return "sci-fi";
  if (value.includes("romance")) return "romance";
  if (value.includes("horror")) return "horror";
  return "fantasy";
}

function mapCharacter(character: BackendCharacter): Character {
  return {
    id: character.id,
    name: character.name,
    description: character.description,
    systemPrompt: character.systemPrompt ?? character.personality ?? "",
    imageUrl: character.imageUrl ?? character.avatarUrl ?? null,
    authorId: "",
    isPublic: true,
    genre: normalizeGenre(character.genre),
    tags: character.tags ?? [],
    createdAt: character.createdAt ?? new Date().toISOString(),
  };
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    console.error("\n========== API REQUEST FAILED ==========");
    console.error("status:", res.status, res.statusText);
    console.error("url:   ", res.url);
    console.error("body:  ", text);
    console.error("=========================================\n");
    let message = text || `Request failed with status ${res.status}`;
    try {
      const body = JSON.parse(text) as ApiError;
      if (body.error) {
        message =
          typeof body.error === "string"
            ? body.error
            : JSON.stringify(body.error);
      }
    } catch {
      // use raw text
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function getCharacters(): Promise<Character[]> {
  const res = await fetch(`${API_BASE}/api/characters`);
  const data = await handleResponse<CharactersResponse>(res);
  return data.characters.map(mapCharacter);
}

export async function getCharacterById(id: string): Promise<Character | null> {
  const characters = await getCharacters();
  return characters.find((c) => c.id === id) ?? null;
}

interface ChatStreamResult {
  messageId: string;
  createdAt: string;
  fullContent: string;
  conversationId?: string;
}

export async function streamMessage(
  conversationId: string,
  message: string,
  characterId: string,
  history: { role: "user" | "assistant"; content: string }[] = [],
  onToken: (token: string) => void
): Promise<ChatStreamResult> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ conversationId, characterId, message, history }),
  });

  const contentType = res.headers.get("content-type") ?? "";

  if (!res.ok) {
    const text = await res.text();
    console.error("\n========== API REQUEST FAILED ==========");
    console.error("status:", res.status, res.statusText);
    console.error("body:  ", text);
    console.error("=========================================\n");
    let errMsg = text || `Request failed with status ${res.status}`;
    try {
      const body = JSON.parse(text) as ApiError;
      if (body.error) {
        errMsg =
          typeof body.error === "string"
            ? body.error
            : JSON.stringify(body.error);
      }
    } catch {
      // use raw text
    }
    throw new Error(errMsg);
  }

  if (!contentType.includes("text/event-stream") || !res.body) {
    throw new Error("Expected SSE stream from chat API");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullContent = "";
  let messageId = `msg-${Date.now()}`;
  let createdAt = new Date().toISOString();
  let resultConversationId = conversationId;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const line = part.trim();
      if (!line.startsWith("data: ")) continue;

      const data = JSON.parse(line.slice(6)) as {
        type: string;
        content?: string;
        error?: string;
        messageId?: string;
        createdAt?: string;
        conversationId?: string;
      };

      if (data.type === "token" && data.content) {
        fullContent += data.content;
        onToken(data.content);
      } else if (data.type === "done") {
        if (data.messageId) messageId = data.messageId;
        if (data.createdAt) createdAt = data.createdAt;
        if (data.conversationId) resultConversationId = data.conversationId;
      } else if (data.type === "error") {
        throw new Error(data.error ?? "Stream error");
      }
    }
  }

  return {
    messageId,
    createdAt,
    fullContent,
    conversationId: resultConversationId,
  };
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
