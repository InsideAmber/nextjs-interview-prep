import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization"); // e.g. "Bearer token"

  if (!authHeader) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { username: string };
    return NextResponse.json({ message: "Profile data", user: decoded });
  } catch (err:unknown) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
