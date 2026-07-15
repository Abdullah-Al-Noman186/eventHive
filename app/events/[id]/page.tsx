"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [related, setRelated] = useState<any[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [booking, setBooking] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/events/${id}`)
      .then(r => r.json())
      .then(setEvent);
    fetch(`/api/reviews?eventId=${id}`)
      .then(r => r.json())
      .then(setReviews);
  }, [id]);

  useEffect(() => {
    if (event?.category) {
      fetch(`/api/events?category=${event.category}`)
        .then(r => r.json())
        .then(d => {
          setRelated((d.events || []).filter((e: any) => e._id !== id).slice(0, 4));
        });
    }
  }, [event]);

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setBooking("Please login to book.");
      return;
    }
    setIsBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await res.json();
      setBooking(res.ok ? "✅ Booked successfully!" : data.error || "Failed to book.");
    } catch {
      setBooking("❌ Something went wrong.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsReviewSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ eventId: id, ...reviewForm }),
      });
      if (res.ok) {
        const r = await res.json();
        setReviews(prev => [r, ...prev]);
        setReviewForm({ rating: 5, comment: "" });
      }
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-72 md:h-96 w-full overflow-hidden"
      >
        <img
          src={event.imageUrl || "https://placehold.co/1200x400/6C63FF/white?text=EventHive"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent flex items-end p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-blue-800 text-white text-xs px-3 py-1 rounded-full">
              {event.category}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">
              {event.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="md:col-span-2 space-y-8"
        >
          {/* Overview */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3 text-dark">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              {event.fullDescription}
            </p>
          </motion.section>

          {/* Location */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-bold mb-3 text-dark">Location</h2>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue)}&output=embed`}
                className="w-full h-56 border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.section>

          {/* Reviews */}
          <motion.section variants={fadeUp}>
            <h2 className="text-xl font-bold mb-4 text-dark">Reviews</h2>
            <form
              onSubmit={handleReview}
              className="bg-gray-50 p-5 rounded-2xl mb-6 shadow-sm"
            >
              <div className="flex flex-wrap gap-3 items-center mb-3">
                <label className="text-sm font-medium text-gray-700">Rate:</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, rating: +e.target.value })
                  }
                  className="border rounded-xl px-3 py-2 text-sm bg-white text-blue-500 focus:ring-2 focus:ring-blue-800"
                >
                  {[5, 4, 3, 2, 1].map(n => (
                    <option key={n} value={n}>{n} ★</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Share your experience..."
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                rows={3}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isReviewSubmitting}
                className="bg-blue-800 text-white px-6 py-2 rounded-xl text-sm hover:shadow-lg transition-shadow disabled:opacity-50 mt-2"
              >
                {isReviewSubmitting ? "Submitting..." : "Submit Review"}
              </motion.button>
            </form>

            <AnimatePresence>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm text-dark">
                        {r.userId?.name || "User"}
                      </span>
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(r.rating)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.section>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 sticky top-24">
            <h2 className="text-lg font-bold text-blue-800 mb-2">Event Details</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📅 {event.date} at {event.time}</p>
              <p>📍 {event.venue}</p>
              <p>👥 Capacity: {event.capacity}</p>
              <p>🏷️ Category: {event.category}</p>
            </div>
            <div className="text-2xl font-bold text-blue-800 pt-2 border-t border-gray-200">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </div>
            <motion.button
              onClick={handleBook}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isBooking}
              className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isBooking ? "Processing..." : "Book Now"}
            </motion.button>
            <AnimatePresence>
              {booking && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm font-medium text-green-600"
                >
                  {booking}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Related Events */}
      {related.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto px-6 pb-16"
        >
          <h2 className="text-xl font-bold text-dark mb-6">Related Events</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {related.map((e) => (
              <motion.div key={e._id} variants={fadeUp}>
                <EventCard event={e} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}