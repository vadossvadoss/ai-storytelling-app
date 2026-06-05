import { NextResponse } from "next/server";
import { getCharacterById } from "@/lib/mock-data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const character = getCharacterById(params.id);

  if (!character) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(character);
}
