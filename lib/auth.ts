import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as any;
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.split(" ")[1]);
}