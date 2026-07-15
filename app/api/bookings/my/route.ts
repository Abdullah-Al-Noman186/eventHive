import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await Booking.find({ userId: user.id }).populate("eventId");
  return NextResponse.json(bookings);
}