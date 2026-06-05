import { NextResponse } from "next/server";
import {
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  getCharacterById,
} from "@/lib/mock-data";

export async function GET() {
  const conversations = MOCK_CONVERSATIONS.filter((c) => c.userId === "user-1");
  return NextResponse.json(conversations);
}

export async function POST(req: Request) {
  const { characterId, worldId } = await req.json();
  const character = getCharacterById(characterId);

  if (!character) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  const conversation = {
    id: `conv-${Date.now()}`,
    userId: "user-1",
    characterId,
    worldId: worldId ?? null,
    title: `Story with ${character.name}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MOCK_CONVERSATIONS.unshift(conversation);
  MOCK_MESSAGES[conversation.id] = [
    {
      id: `msg-${Date.now()}`,
      conversationId: conversation.id,
      role: "assistant",
      content: `*${character.name} turns to face you, sensing your arrival.*\n\n"Ah... a new traveler. I have been expecting someone like you. Tell me — what brings you to my story?"`,
      createdAt: new Date().toISOString(),
    },
  ];

  return NextResponse.json(conversation);
}
