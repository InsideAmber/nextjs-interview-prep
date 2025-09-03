import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  const {slug} = await params;
  return NextResponse.json({ path: slug });
}
