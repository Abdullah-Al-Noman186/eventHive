import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { eventId } = await req.json();
  const existing = await Booking.findOne({ eventId, userId: user.id });
  if (existing) return NextResponse.json({ error: "Already booked" }, { status: 400 });

  const booking = await Booking.create({ eventId, userId: user.id });
  return NextResponse.json(booking, { status: 201 });
}