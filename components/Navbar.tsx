"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, UserCircle, LogOut, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setIsOpen(false);
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/events", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-dark/90 backdrop-blur-md text-white px-6 py-3 sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-1">
          Event<span className="text-accent">Hive</span>
          <motion.span
            className="inline-block w-2 h-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors duration-200"
              >
                <span className="text-sm font-medium">
                  {user.name || user.email?.charAt(0).toUpperCase()}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-dark/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl py-2"
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserCircle size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-white/10 hover:text-red-300 transition-colors w-full"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/10 mt-3 pt-4"
          >
            <div className="flex flex-col gap-3 pb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-400 hover:text-red-300 transition-colors px-2 py-1 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-white px-4 py-2 rounded-full text-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}