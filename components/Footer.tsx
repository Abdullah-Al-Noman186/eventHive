"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const socialLinks = [
    { icon: FaEnvelope, label: "Email", href: "mailto:hello@eventhive.io" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaLinkedin, label: "LinkedIn", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
  ];

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      className="bg-dark text-white mt-20 py-16 px-6 border-t border-white/10 relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/0 via-primary/5 to-dark/0 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 relative">
        {/* Brand */}
        <motion.div variants={item} className="space-y-3">
          <h2 className="text-2xl font-bold text-primary">
            Event<span className="text-accent">Hive</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Discover, create, and manage events that matter to you.
          </p>
          <div className="flex gap-3 pt-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={16} className="text-gray-400 hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Explore */}
        <motion.div variants={item}>
          <h4 className="font-semibold text-white mb-4 tracking-wide">Explore</h4>
          <ul className="space-y-2.5">
            {["All Events", "About Us", "Contact"].map((label) => {
              const href = label === "All Events" ? "/events" : `/${label.toLowerCase().replace(" ", "")}`;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 relative group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Account */}
        <motion.div variants={item}>
          <h4 className="font-semibold text-white mb-4 tracking-wide">Account</h4>
          <ul className="space-y-2.5">
            {["Login", "Register", "Dashboard"].map((label) => {
              const href = label === "Dashboard" ? "/dashboard" : `/${label.toLowerCase()}`;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 relative group"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div variants={item}>
          <h4 className="font-semibold text-white mb-4 tracking-wide">Connect</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-3 hover:text-white transition-colors duration-200">
              <FaEnvelope size={14} className="text-primary/70" />
              <a href="mailto:hello@eventhive.io" className="hover:text-white">hello@eventhive.io</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors duration-200">
              <FaTwitter size={14} className="text-primary/70" />
              <span>@eventhive</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors duration-200">
              <FaLinkedin size={14} className="text-primary/70" />
              <span>linkedin.com/eventhive</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        variants={item}
        className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-gray-500 text-xs flex flex-col sm:flex-row justify-between items-center gap-2"
      >
        <span>© {new Date().getFullYear()} EventHive. All rights reserved.</span>
        <span className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </span>
      </motion.div>
    </motion.footer>
  );
}