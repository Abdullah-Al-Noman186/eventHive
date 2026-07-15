"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import SkeletonCard from "@/components/SkeletonCard";

const CATEGORIES = [
  { icon: "🎵", name: "Music" },
  { icon: "💻", name: "Tech" },
  { icon: "⚽", name: "Sports" },
  { icon: "🍕", name: "Food" },
  { icon: "🎨", name: "Art" },
  { icon: "💼", name: "Business" },
];

const TESTIMONIALS = [
  { name: "Aisha K.", role: "Event Goer", text: "EventHive helped me find the best local concerts. Absolutely love the filtering!", rating: 5 },
  { name: "Rahul M.", role: "Organizer", text: "Creating and managing my tech meetups has never been easier. Great platform!", rating: 5 },
  { name: "Sara L.", role: "Attendee", text: "Booked 3 events last month. The experience from search to booking is seamless.", rating: 4 },
];

const FAQS = [
  { q: "Is EventHive free to use?", a: "Yes! Browsing and attending free events costs nothing. Paid events have their own pricing set by organizers." },
  { q: "How do I become an organizer?", a: "Simply register and select 'Organizer' as your role. You can immediately start creating events." },
  { q: "Can I cancel a booking?", a: "Yes, you can cancel from your bookings page. Refund policies depend on the organizer's settings." },
  { q: "How are events moderated?", a: "All events go through our community guidelines. You can report any event that violates our policies." },
  { q: "Is my payment information safe?", a: "Absolutely. We use industry-standard encryption and never store raw card details." },
];

// Reusable fade-up animation wrapper
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function StatItem({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : { scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-primary"
      >
        {count.toLocaleString()}+
      </motion.div>
      <div className="text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/events?limit=4")
      .then((r) => r.json())
      .then((d) => { setFeatured(d.events?.slice(0, 4) || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-dark text-white py-24 px-6 text-center overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          style={{
            background: "radial-gradient(ellipse at 30% 50%, #6C63FF 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            background: "radial-gradient(ellipse at 70% 50%, #f59e0b 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Discover Events <span className="text-primary">You'll Love</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg"
          >
            Browse thousands of events near you — music, tech, food, sports & more.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search events by title or location..."
              className="flex-1 px-4 py-3 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link href="/events" className="bg-primary hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-xl font-semibold">
              Explore Events
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex gap-8 justify-center text-sm text-gray-400"
          >
            <span>🎉 <strong className="text-white">5,000+</strong> Events</span>
            <span>🏙️ <strong className="text-white">120+</strong> Cities</span>
            <span>👥 <strong className="text-white">80K+</strong> Attendees</span>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <FadeUp>
          <h2 className="text-3xl font-bold text-dark mb-8">Featured Events</h2>
        </FadeUp>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : featured.length > 0
            ? featured.map((e) => (
                <motion.div
                  key={e._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <EventCard event={e} />
                </motion.div>
              ))
            : Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow text-center text-black animate-pulse">
                  Sample Event {i + 1}
                </div>
              ))}
        </motion.div>
        <div className="text-center mt-10">
          <Link href="/events" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 inline-block">
            View All Events
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-indigo-600 mb-10">Browse by Category</h2>
          </FadeUp>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
            className="grid grid-cols-3 md:grid-cols-6 gap-6"
          >
            {CATEGORIES.map((c) => (
              <motion.div
                key={c.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/events?category=${c.name}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-primary hover:text-white transition-colors duration-300 shadow-sm hover:shadow-lg"
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-white">{c.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <FadeUp>
          <h2 className="text-3xl font-bold text-dark mb-12">How EventHive Works</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: "1", title: "Browse Events", desc: "Search and filter from thousands of events across categories and cities." },
            { step: "2", title: "Register & Book", desc: "Sign up in seconds and secure your spot with one-click booking." },
            { step: "3", title: "Attend & Enjoy", desc: "Show up, experience the event, and share your review afterwards." },
          ].map((item, idx) => (
            <FadeUp key={item.step} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mb-4"
                >
                  {item.step}
                </motion.div>
                <h3 className="font-bold text-black text-lg">{item.title}</h3>
                <p className="text-black text-sm mt-2">{item.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-dark py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatItem target={5000} label="Total Events" />
          <StatItem target={120} label="Cities" />
          <StatItem target={800} label="Organizers" />
          <StatItem target={80000} label="Attendees" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-indigo-600 mb-10">What People Are Saying</h2>
          </FadeUp>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 text-left"
              >
                <div className="text-yellow-400 mb-2">{"★".repeat(t.rating)}</div>
                <p className="text-gray-600 text-sm italic">"{t.text}"</p>
                <div className="mt-4 font-semibold text-black">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
          style={{
            background: "radial-gradient(circle at center, white 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <FadeUp>
            <h2 className="text-3xl font-bold mb-3">Stay in the Loop</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/80 mb-8">Get the latest events delivered to your inbox every week.</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 rounded-xl text-dark focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-dark text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto py-16 px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold text-dark mb-10 text-center">Frequently Asked Questions</h2>
        </FadeUp>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-white text-black rounded-2xl shadow overflow-hidden border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-xl"
                  >
                    {openFaq === i ? "−" : "+"}
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-gray-500 text-sm"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}