import { NextResponse } from "next/server";
import { getConversationById } from "@/lib/mock-data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const conversation = getConversationById(params.id);

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(conversation);
}
