import { NextResponse } from "next/server";

// Handle GET request
export async function GET() {
  return NextResponse.json({ message: "Hello from Next.js API!" });
}

// Handle POST request
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Data received", data: body });
}
