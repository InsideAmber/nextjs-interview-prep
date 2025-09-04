import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("session");

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Normally lookup session in DB/Redis
  if (session.value === "abc123") {
    return NextResponse.json({ user: { name: "Amber", role: "Frontend Dev" } });
  }

  return NextResponse.json({ error: "Invalid session" }, { status: 403 });
}
