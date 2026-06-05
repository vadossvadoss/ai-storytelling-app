import { NextResponse } from "next/server";
import { MOCK_WORLDS } from "@/lib/mock-data";

export async function GET() {
  const worlds = MOCK_WORLDS.filter((w) => w.isPublic);
  return NextResponse.json(worlds);
}

export async function POST(req: Request) {
  const body = await req.json();
  const world = {
    id: `world-${Date.now()}`,
    name: body.name,
    description: body.description,
    imageUrl: body.imageUrl ?? null,
    authorId: "user-1",
    isPublic: body.isPublic ?? true,
    characterIds: [],
    createdAt: new Date().toISOString(),
  };

  MOCK_WORLDS.unshift(world);
  return NextResponse.json(world, { status: 201 });
}
