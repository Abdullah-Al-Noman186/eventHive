import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const events = await Event.find({ organizerId: user.id }).sort({ createdAt: -1 });
  return NextResponse.json(events);
}