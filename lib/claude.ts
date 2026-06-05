import Anthropic from "@anthropic-ai/sdk";
import type { Character, Memory } from "./types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export function buildSystemPrompt(
  character: Character,
  memories: Memory[]
): string {
  const memoryBlock =
    memories.length > 0
      ? `\n\nMemories about this user:\n${memories.map((m) => `- ${m.content}`).join("\n")}`
      : "";

  return `${character.systemPrompt}${memoryBlock}

IMPORTANT INSTRUCTIONS:
- Stay in character at all times as ${character.name}
- Respond in a narrative, immersive style appropriate for interactive fiction
- Use *asterisks* for actions and descriptions
- Keep responses engaging but concise (2-4 paragraphs max)
- Never break the fourth wall or mention being an AI
- Reference memories naturally when relevant`;
}

export async function streamChatResponse(
  systemPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[]
) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  return client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });
}

export async function extractMemory(
  userMessage: string,
  assistantMessage: string,
  characterName: string
): Promise<{ content: string; importance: number } | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 256,
      system: `You analyze conversations between a user and the character ${characterName}. Determine if the exchange contains information worth remembering long-term (user preferences, backstory reveals, important plot points, emotional moments).

Respond ONLY with valid JSON: {"shouldRemember": boolean, "content": "brief memory text", "importance": 1-10}
Only set shouldRemember true if importance >= 6.`,
      messages: [
        {
          role: "user",
          content: `User: ${userMessage}\n\n${characterName}: ${assistantMessage}`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = JSON.parse(text) as {
      shouldRemember: boolean;
      content: string;
      importance: number;
    };

    if (parsed.shouldRemember && parsed.importance >= 6) {
      return { content: parsed.content, importance: parsed.importance };
    }
    return null;
  } catch {
    return null;
  }
}

export function getMockStreamResponse(characterName: string): string {
  const responses = [
    `*${characterName} pauses, considering your words carefully.*\n\n"An intriguing proposition. The threads of fate weave in mysterious patterns — and you, it seems, have caught one of the more interesting strands."`,
    `*A knowing smile crosses ${characterName}'s face.*\n\n"You ask the right questions, traveler. Few do. Let me share what the winds have whispered to me..."`,
    `*${characterName} leans closer, voice dropping to a conspiratorial tone.*\n\n"There are things in this world that prefer to stay hidden. But for you... I might make an exception."`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
