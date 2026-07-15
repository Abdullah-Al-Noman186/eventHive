"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, Calendar, Sparkles, Target, Rocket } from "lucide-react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Reusable section wrapper with scroll animation
const FadeUpSection = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function AboutPage() {
  const stats = [
    { number: "5,000+", label: "Events", icon: Calendar },
    { number: "120+", label: "Cities", icon: MapPin },
    { number: "800+", label: "Organizers", icon: Users },
    { number: "80K+", label: "Attendees", icon: Sparkles },
  ];

  const team = [
    { name: "Amir Hassan", role: "Founder & CEO", emoji: "🚀" },
    { name: "Leila Park", role: "Head of Design", emoji: "🎨" },
    { name: "Sam Chen", role: "Lead Engineer", emoji: "⚡" },
    { name: "Nadia Roy", role: "Community Manager", emoji: "🌟" },
  ];

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
            background: "radial-gradient(ellipse at 30% 50%, #3B82F6 0%, transparent 60%)",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            background: "radial-gradient(ellipse at 70% 50%, #60A5FA 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold"
          >
            About <span className="text-blue-400">EventHive</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-xl mx-auto text-lg"
          >
            We're on a mission to connect people through experiences. From local meetups to global concerts — EventHive makes it happen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">
              <Rocket size={16} />
              Join the community
            </span>
          </motion.div>
        </div>
      </section>

      {/* Mission & Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeUpSection>
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-blue-500">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            EventHive was founded to make event discovery seamless and community-driven. 
            We believe great experiences should be accessible to everyone — whether you're 
            a passionate attendee or a visionary organizer.
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 italic">
              "Connecting people through unforgettable moments."
            </p>
          </div>
        </FadeUpSection>

        <FadeUpSection delay={0.1}>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-blue-500">Platform Stats</h2>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <stat.icon className="text-blue-500 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </FadeUpSection>
      </section>

      {/* Team */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUpSection>
            <h2 className="text-3xl font-bold text-blue-500 mb-3">Meet the Team</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Passionate individuals dedicated to making EventHive the best platform for event discovery.
            </p>
          </FadeUpSection>

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-500/20 text-blue-500 text-3xl flex items-center justify-center mb-3 ring-4 ring-blue-500/10">
                    {member.emoji}
                  </div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                </div>
                <div className="font-semibold text-blue-700">{member.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{member.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-16 px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Hive?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Start discovering amazing events today or create your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/events"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Explore Events
            </a>
            <a
              href="/register"
              className="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}