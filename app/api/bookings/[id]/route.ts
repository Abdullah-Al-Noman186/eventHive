import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const booking = await Booking.findById(params.id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (booking.userId.toString() !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  booking.status = "cancelled";
  await booking.save();
  return NextResponse.json(booking);
}