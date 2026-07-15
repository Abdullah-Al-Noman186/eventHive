"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/bookings/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setBookings(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCancel = async (bookingId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    }
    setCancelling(null);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">My Bookings</h1>
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark">My Bookings</h1>
        <Link
          href="/events"
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          Browse More Events
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <div className="text-5xl mb-4">🎟️</div>
          <p className="text-lg font-semibold">No bookings yet</p>
          <p className="text-sm mt-2">
            Start exploring events and book your first one!
          </p>
          <Link
            href="/events"
            className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const event = booking.eventId;
            const isCancelled = booking.status === "cancelled";
            return (
              <div
                key={booking._id}
                className={`bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row gap-4 transition ${
                  isCancelled ? "opacity-60" : ""
                }`}
              >
                {/* Event Image */}
                <img
                  src={event?.imageUrl || "https://placehold.co/80x80/6C63FF/white?text=E"}
                  alt={event?.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />

                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-dark text-lg leading-tight">
                        {event?.title || "Event"}
                      </h3>
                      <div className="text-gray-400 text-sm mt-1 space-y-1">
                        <div>📅 {event?.date} at {event?.time}</div>
                        <div>📍 {event?.venue}</div>
                        <div>
                          💰{" "}
                          {event?.price === 0
                            ? "Free"
                            : `$${event?.price}`}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ${
                        isCancelled
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking meta */}
                  <div className="text-xs text-gray-300 mt-2">
                    Booked on{" "}
                    {new Date(booking.bookedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    <Link
                      href={`/events/${event?._id}`}
                      className="text-primary text-xs border border-primary px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
                    >
                      View Event
                    </Link>
                    {!isCancelled && (
                      <button
                        onClick={() => setCancelling(booking._id)}
                        className="text-red-400 text-xs border border-red-300 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats summary */}
      {bookings.length > 0 && (
        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            {
              label: "Total Booked",
              value: bookings.length,
              color: "text-primary",
            },
            {
              label: "Confirmed",
              value: bookings.filter((b) => b.status === "confirmed").length,
              color: "text-green-500",
            },
            {
              label: "Cancelled",
              value: bookings.filter((b) => b.status === "cancelled").length,
              color: "text-red-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-sm p-4 text-center"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelling && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-dark mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to cancel this booking? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCancelling(null)}
                className="border px-6 py-2 rounded-xl text-sm hover:bg-gray-50 transition"
              >
                Keep it
              </button>
              <button
                onClick={() => handleCancel(cancelling)}
                className="bg-red-500 text-white px-6 py-2 rounded-xl text-sm hover:opacity-90 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}