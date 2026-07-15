import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Review } from "@/models/Review";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { eventId, rating, comment } = await req.json();
  const review = await Review.create({ eventId, userId: user.id, rating, comment });
  return NextResponse.json(review, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  const reviews = await Review.find({ eventId }).populate("userId", "name");
  return NextResponse.json(reviews);
}