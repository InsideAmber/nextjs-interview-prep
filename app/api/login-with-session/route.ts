import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === "amber" && password === "1234") {
    // Fake "session id"
    const sessionId = "abc123";

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionId, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return NextResponse.json({ message: "Logged in" });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
