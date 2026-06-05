import {
  buildSystemPrompt,
  streamChatResponse,
  extractMemory,
  getMockStreamResponse,
} from "@/lib/claude";
import { getTopMemories, saveMemory } from "@/lib/memory";
import {
  getCharacterById,
  getConversationById,
  MOCK_MESSAGES,
} from "@/lib/mock-data";

export async function POST(req: Request) {
  const { conversationId, characterId, message } = await req.json();

  const character = getCharacterById(characterId);
  if (!character) {
    return new Response("Character not found", { status: 404 });
  }

  const conversation = getConversationById(conversationId);
  const history = conversation?.messages ?? MOCK_MESSAGES[conversationId] ?? [];

  const memories = getTopMemories(characterId, "user-1", 5);
  const systemPrompt = buildSystemPrompt(character, memories);

  const conversationHistory = [
    ...history.slice(-20).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: message },
  ];

  const encoder = new TextEncoder();

  if (!process.env.ANTHROPIC_API_KEY) {
    const mockResponse = getMockStreamResponse(character.name);
    const stream = new ReadableStream({
      async start(controller) {
        const words = mockResponse.split(" ");
        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "));
          await new Promise((r) => setTimeout(r, 40));
        }
        controller.close();
        extractMemory(message, mockResponse, character.name).then((mem) => {
          if (mem) saveMemory(characterId, "user-1", mem.content, mem.importance);
        });
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const claudeStream = await streamChatResponse(
      systemPrompt,
      conversationHistory
    );

    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const text = event.delta.text;
            fullResponse += text;
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();

        extractMemory(message, fullResponse, character.name).then((mem) => {
          if (mem) saveMemory(characterId, "user-1", mem.content, mem.importance);
        });
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Claude API error:", error);
    return new Response("AI service error", { status: 500 });
  }
}
