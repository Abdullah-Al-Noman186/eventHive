import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { getUserFromRequest } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const user = getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.userId.toString() !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    booking.status = "cancelled";
    await booking.save();

    return NextResponse.json(booking);
  } catch (error) {
    console.error("PATCH Booking Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}