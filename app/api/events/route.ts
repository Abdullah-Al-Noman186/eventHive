import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search   = searchParams.get("search");
    const page     = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit    = 10;

    const query: Record<string, any> = {};
    if (category) query.category = category;
    if (search)   query.title    = { $regex: search, $options: "i" };

    const [events, total] = await Promise.all([
      Event.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      Event.countDocuments(query),
    ]);

    return NextResponse.json({ events, total, page });

  } catch (err: any) {
    console.error("[GET /api/events]", err);
    return NextResponse.json(
      { error: "Failed to fetch events", events: [], total: 0 },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, shortDescription, fullDescription, category, date, time, venue, price, capacity, imageUrl } = body;

    if (!title || !category || !date || !venue) {
      return NextResponse.json(
        { error: "title, category, date and venue are required" },
        { status: 400 }
      );
    }

    const event = await Event.create({
      title, shortDescription, fullDescription,
      category, date, time, venue,
      price: price ?? 0,
      capacity: capacity ?? 100,
      imageUrl: imageUrl || "",
      organizerId: user.id,
      rating: 0,
    });

    return NextResponse.json(event, { status: 201 });

  } catch (err: any) {
    console.error("[POST /api/events]", err);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}