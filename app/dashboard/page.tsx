"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, PlusCircle, List, User, Clock } from "lucide-react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
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

  const stats = [
    {
      label: "My Bookings",
      count: bookings.length,
      href: "/bookings",
      color: "bg-indigo-600",
      icon: Calendar,
      description: "View all your registered events",
    },
    {
      label: "Create Event",
      count: "+",
      href: "/events/add",
      color: "bg-emerald-600",
      icon: PlusCircle,
      description: "Host your own event",
    },
    {
      label: "My Events",
      count: "→",
      href: "/events/manage",
      color: "bg-blue-600",
      icon: List,
      description: "Manage your created events",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2"
      >
        <div>
          <h1 className="text-3xl font-bold text-amber-600 flex items-center gap-2">
            {greeting}, {user?.name || "Guest"} 👋
            <motion.span
              className="inline-block w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </h1>
          <p className="text-white/70">Manage your events and bookings from one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 rounded-full p-2">
            <User size={20} className="text-gray-600" />
          </div>
          <span className="text-sm text-gray-600">{user?.email}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Link
              href={stat.href}
              className={`${stat.color} text-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group block`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-4xl font-bold">
                    {stat.count}
                  </div>
                  <div className="mt-1 text-white/90 font-medium">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-white/60 text-sm">
                    {stat.description}
                  </div>
                </div>
                <stat.icon
                  size={32}
                  className="text-white/50 group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="mt-4 flex items-center text-white/70 text-sm group-hover:text-white transition-colors">
                <span>Access →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
            <Clock size={20} className="text-indigo-600" />
            Recent Bookings
          </h2>
          {bookings.length > 0 && (
            <Link
              href="/bookings"
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-4 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100"
          >
            <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No bookings yet.</p>
            <Link
              href="/events"
              className="mt-3 inline-block text-indigo-600 hover:underline font-medium"
            >
              Browse events →
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {bookings.slice(0, 5).map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, boxShadow: "0 8px 25px -5px rgba(0,0,0,0.08)" }}
                  className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {b.eventId?.title?.charAt(0) || "E"}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {b.eventId?.title || "Untitled Event"}
                      </div>
                      <div className="text-gray-400 text-xs flex items-center gap-2">
                        <span>{b.eventId?.date || "TBD"}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{b.eventId?.venue || "No venue"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {b.status || "Booked"}
                    </span>
                    <Link
                      href={`/events/${b.eventId?._id}`}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}