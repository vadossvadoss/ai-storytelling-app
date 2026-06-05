import { NextResponse } from "next/server";
import { MOCK_CHARACTERS } from "@/lib/mock-data";
import type { Genre } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre") as Genre | null;

  let characters = MOCK_CHARACTERS.filter((c) => c.isPublic);
  if (genre) {
    characters = characters.filter((c) => c.genre === genre);
  }

  return NextResponse.json(characters);
}

export async function POST(req: Request) {
  const body = await req.json();
  const character = {
    id: `char-${Date.now()}`,
    name: body.name,
    description: body.description,
    systemPrompt: body.systemPrompt,
    imageUrl: body.imageUrl ?? null,
    authorId: "user-1",
    isPublic: body.isPublic ?? true,
    genre: body.genre as Genre,
    tags: body.tags ?? [],
    createdAt: new Date().toISOString(),
  };

  MOCK_CHARACTERS.unshift(character);
  return NextResponse.json(character, { status: 201 });
}
