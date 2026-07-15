"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import SkeletonCard from "@/components/SkeletonCard";

const CATEGORIES = ["Music", "Tech", "Sports", "Food", "Art", "Business"];

// Staggered grid animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ExplorePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const prevLoadingRef = useRef(loading);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      params.set("page", String(page));

      const res = await fetch(`/api/events?${params}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        console.error("Events API error:", data.error || res.status);
        setEvents([]);
        setTotal(0);
        return;
      }

      setEvents(data.events || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search, category, page]);

  // Reset page on filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-dark mb-8"
      >
        Explore Events
      </motion.h1>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Search by title or location..."
          className="border rounded-xl px-4 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          value={search}
          onChange={handleSearchChange}
        />
        <select
          className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option className="text-black" key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </motion.div>
        ) : events.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-4 text-center text-gray-400 py-16"
          >
            No events found.
          </motion.p>
        ) : (
          <motion.div
            key="events"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {events.map((e) => (
              <motion.div key={e._id} variants={cardVariants}>
                <EventCard event={e} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {total > 10 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mt-10"
        >
          {Array.from({ length: Math.ceil(total / 10) }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => setPage(i + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                page === i + 1
                  ? "bg-blue-800 text-white shadow-md"
                  : "bg-white text-black border hover:border-blue-500 hover:shadow"
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}