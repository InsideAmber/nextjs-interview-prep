import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Fake check (replace with DB lookup)
  if (username === "amber" && password === "1234") {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

    // Return token in response (or set in cookie)
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

// 👉 Client can store this token (in localStorage or an HTTP-only cookie).