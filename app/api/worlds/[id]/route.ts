import { NextResponse } from "next/server";
import { getWorldById } from "@/lib/mock-data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const world = getWorldById(params.id);

  if (!world) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(world);
}
