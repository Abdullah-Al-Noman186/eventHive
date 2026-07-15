import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

// ── Schemas (inline so script is self-contained) ─────────────────────
const UserSchema = new mongoose.Schema({
  name: String, email: String, passwordHash: String,
  role: String, createdAt: { type: Date, default: Date.now },
});
const EventSchema = new mongoose.Schema({
  title: String, shortDescription: String, fullDescription: String,
  category: String, date: String, time: String, venue: String,
  price: Number, capacity: Number, imageUrl: String,
  organizerId: mongoose.Schema.Types.ObjectId,
  rating: Number, createdAt: { type: Date, default: Date.now },
});
const ReviewSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number, comment: String,
  createdAt: { type: Date, default: Date.now },
});
const BookingSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, default: "confirmed" },
});

const User  = mongoose.models.User  || mongoose.model("User",  UserSchema);
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
const Review  = mongoose.models.Review  || mongoose.model("Review",  ReviewSchema);
const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

// ── Seed data ────────────────────────────────────────────────────────
const IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
];

const EVENTS_DATA = [
  {
    title: "Global Tech Summit 2025",
    shortDescription: "The world's largest gathering of tech innovators and startup founders.",
    fullDescription: "Join 5,000+ technology leaders, investors, and innovators for 3 days of keynotes, workshops, and networking. This year's theme is 'AI for Everyone' — exploring how artificial intelligence is reshaping every industry from healthcare to agriculture. Featured speakers include CTOs from Fortune 500 companies and founders of the hottest AI startups.",
    category: "Tech", date: "2025-09-15", time: "09:00",
    venue: "San Francisco Convention Center, CA", price: 299, capacity: 5000,
    imageUrl: IMAGES[0], rating: 4.8,
  },
  {
    title: "Jazz & Blues Festival",
    shortDescription: "Three days of world-class jazz and blues under the open sky.",
    fullDescription: "Experience the magic of live jazz and blues music across 5 outdoor stages. Over 40 artists will perform, including Grammy-winning legends and emerging local talent. Food vendors, art installations, and music workshops make this a full weekend experience for the whole family.",
    category: "Music", date: "2025-08-22", time: "14:00",
    venue: "Riverfront Park, New Orleans, LA", price: 75, capacity: 10000,
    imageUrl: IMAGES[1], rating: 4.9,
  },
  {
    title: "Street Food World Cup",
    shortDescription: "50+ food vendors from 30 countries compete for the best street food.",
    fullDescription: "The ultimate foodie event — chefs and street food vendors from around the globe bring their signature dishes to compete. Enjoy tastings, cooking demonstrations, and live judging. Categories include Best Main, Best Dessert, Most Creative, and People's Choice.",
    category: "Food", date: "2025-08-10", time: "11:00",
    venue: "Brooklyn Bridge Park, New York, NY", price: 25, capacity: 3000,
    imageUrl: IMAGES[2], rating: 4.7,
  },
  {
    title: "City Half Marathon 2025",
    shortDescription: "Run through the heart of the city with 8,000 fellow runners.",
    fullDescription: "A scenic 13.1-mile route through iconic city landmarks, finishing at Central Park. All fitness levels welcome. Includes chip timing, finisher medals, post-race party with live music, and a goodie bag. Fundraising for local youth sports programs.",
    category: "Sports", date: "2025-10-05", time: "07:00",
    venue: "City Hall Plaza, Chicago, IL", price: 55, capacity: 8000,
    imageUrl: IMAGES[3], rating: 4.6,
  },
  {
    title: "Contemporary Art Showcase",
    shortDescription: "Emerging artists exhibit their boldest work in one unforgettable night.",
    fullDescription: "Over 60 contemporary artists across painting, sculpture, digital art, and mixed media. Curated by leading gallery directors, the showcase features live art creation, artist talks, and the opportunity to purchase pieces directly. A champagne reception kicks off the evening.",
    category: "Art", date: "2025-09-28", time: "18:00",
    venue: "MOCA Gallery, Los Angeles, CA", price: 45, capacity: 500,
    imageUrl: IMAGES[4], rating: 4.5,
  },
  {
    title: "Startup Pitch Night",
    shortDescription: "Watch 12 startups pitch to a panel of top-tier VCs for $500K in funding.",
    fullDescription: "The most competitive pitch night in the region. 12 pre-selected startups each get 5 minutes to pitch and 5 minutes of Q&A from a panel of investors managing over $2 billion in assets. Audience members vote for the People's Choice Award. Free drinks and networking after.",
    category: "Business", date: "2025-08-30", time: "18:30",
    venue: "Founders Hub, Austin, TX", price: 0, capacity: 300,
    imageUrl: IMAGES[5], rating: 4.7,
  },
  {
    title: "Electronic Music Night",
    shortDescription: "Top DJs light up the night with underground beats until dawn.",
    fullDescription: "A night of pulsating electronic music across 3 stages — House, Techno, and Drum & Bass. 10 international DJs headlining, state-of-the-art sound systems, immersive LED visuals, and open-air dance floors. Doors open at 10 PM. 18+ only.",
    category: "Music", date: "2025-09-06", time: "22:00",
    venue: "The Warehouse, Detroit, MI", price: 40, capacity: 2000,
    imageUrl: IMAGES[6], rating: 4.8,
  },
  {
    title: "Web3 & Blockchain Expo",
    shortDescription: "Explore the future of decentralized internet with 200+ exhibitors.",
    fullDescription: "The premier Web3 conference of the year. Covering DeFi, NFTs, DAOs, and the evolving regulatory landscape. Workshops on building with smart contracts, a hackathon with $50K in prizes, and panels from founders of leading blockchain protocols. Exhibition hall features 200+ projects.",
    category: "Tech", date: "2025-11-12", time: "10:00",
    venue: "Miami Beach Convention Center, FL", price: 199, capacity: 4000,
    imageUrl: IMAGES[7], rating: 4.4,
  },
  {
    title: "Yoga & Wellness Retreat",
    shortDescription: "A full day of yoga, meditation, and holistic wellness workshops.",
    fullDescription: "Reset and recharge with a full day of guided yoga sessions for all levels, breathwork, sound healing, nutrition talks, and 1-on-1 wellness consultations. Held in a beautiful outdoor setting with organic meals included. Limited spots for an intimate experience.",
    category: "Sports", date: "2025-08-17", time: "08:00",
    venue: "Griffith Park, Los Angeles, CA", price: 85, capacity: 150,
    imageUrl: IMAGES[3], rating: 4.9,
  },
  {
    title: "Indie Film Festival",
    shortDescription: "A celebration of independent cinema from 40 countries over 5 days.",
    fullDescription: "Screen 80+ films from first-time directors and seasoned indie filmmakers across 6 curated programs: Drama, Comedy, Documentary, Animation, Horror, and Short Films. Q&A sessions with directors, script development workshops, and an awards ceremony on the final evening.",
    category: "Art", date: "2025-10-20", time: "12:00",
    venue: "The Roxy Theater, Portland, OR", price: 35, capacity: 800,
    imageUrl: IMAGES[4], rating: 4.6,
  },
  {
    title: "Women in Tech Conference",
    shortDescription: "Celebrating and empowering women shaping the future of technology.",
    fullDescription: "A full-day conference featuring 30 women leaders in engineering, product, design, and entrepreneurship. Panel discussions, mentorship sessions, workshops on salary negotiation and leadership, and a networking lunch. Open to all genders — an inclusive space for growth.",
    category: "Tech", date: "2025-09-20", time: "09:30",
    venue: "Google Campus, Seattle, WA", price: 0, capacity: 1000,
    imageUrl: IMAGES[0], rating: 4.9,
  },
  {
    title: "BBQ & Craft Beer Festival",
    shortDescription: "Taste 50+ craft beers and legendary BBQ from award-winning pitmasters.",
    fullDescription: "Smoke, fire, and cold beer — the ultimate BBQ and craft beer celebration. 20 regional pitmasters compete for the Golden Tong Award while 30 local and national craft breweries pour their finest. Live country and blues music, lawn games, and family-friendly activities throughout the day.",
    category: "Food", date: "2025-08-24", time: "12:00",
    venue: "Fair Park, Dallas, TX", price: 30, capacity: 5000,
    imageUrl: IMAGES[2], rating: 4.7,
  },
];

const REVIEWS_DATA = [
  { rating: 5, comment: "Absolutely incredible experience. Well organized and the speakers were world-class." },
  { rating: 4, comment: "Great event overall. The venue was perfect and the networking was invaluable." },
  { rating: 5, comment: "One of the best events I've attended. Can't wait for next year!" },
  { rating: 4, comment: "Really enjoyed it. Food could have been better but the content was excellent." },
  { rating: 5, comment: "Met so many amazing people. The organizers did a fantastic job." },
  { rating: 3, comment: "Decent event but felt a bit crowded. The talks themselves were great though." },
  { rating: 5, comment: "Blew my expectations out of the water. Already booked for next year." },
  { rating: 4, comment: "Very well run. Minor hiccups with the schedule but nothing major." },
];

// ── Main seed function ───────────────────────────────────────────────
async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Review.deleteMany({}),
    Booking.deleteMany({}),
  ]);
  console.log("🗑️  Cleared existing data");

  // Create users
  const passwordHash = await bcrypt.hash("demo1234", 10);
  const users = await User.insertMany([
    { name: "Demo Organizer", email: "demo@eventhive.io", passwordHash, role: "organizer" },
    { name: "Alice Johnson",  email: "alice@example.com", passwordHash, role: "attendee" },
    { name: "Bob Smith",      email: "bob@example.com",   passwordHash, role: "attendee" },
    { name: "Carol White",    email: "carol@example.com", passwordHash, role: "organizer" },
    { name: "David Lee",      email: "david@example.com", passwordHash, role: "attendee" },
  ]);
  console.log(`👥 Created ${users.length} users`);

  const organizer1 = users[0];
  const organizer2 = users[3];
  const attendees  = [users[1], users[2], users[4]];

  // Create events
  const eventsToInsert = EVENTS_DATA.map((e, i) => ({
    ...e,
    organizerId: i % 3 === 0 ? organizer2._id : organizer1._id,
  }));
  const events = await Event.insertMany(eventsToInsert);
  console.log(`🎉 Created ${events.length} events`);

  // Create reviews (2–3 per event)
  const reviews = [];
  for (const event of events) {
    const numReviews = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numReviews; i++) {
      const reviewer = attendees[i % attendees.length];
      const template = REVIEWS_DATA[(reviews.length) % REVIEWS_DATA.length];
      reviews.push({
        eventId: event._id,
        userId: reviewer._id,
        rating: template.rating,
        comment: template.comment,
      });
    }
  }
  await Review.insertMany(reviews);
  console.log(`⭐ Created ${reviews.length} reviews`);

  // Create bookings (each attendee books 4 events)
  const bookings = [];
  for (const attendee of attendees) {
    const shuffled = [...events].sort(() => Math.random() - 0.5).slice(0, 4);
    for (const event of shuffled) {
      bookings.push({
        eventId: event._id,
        userId: attendee._id,
        status: Math.random() > 0.8 ? "cancelled" : "confirmed",
      });
    }
  }
  await Booking.insertMany(bookings);
  console.log(`🎟️  Created ${bookings.length} bookings`);

  console.log("\n🌱 Seed complete! Login with:");
  console.log("   Email:    demo@eventhive.io");
  console.log("   Password: demo1234\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});