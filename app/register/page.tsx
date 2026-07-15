"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaUserTag,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "attendee",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error("Server responded with non‑JSON:", text);
        throw new Error("Server returned an invalid response. Please check server logs.");
      }

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-3"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join the EventHive community today</p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2"
            >
              <span className="text-lg">⚠️</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={fieldVariants} className="relative">
            <FaUser className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-200 rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-gray-50/50"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="relative">
            <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-200 rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-gray-50/50"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="relative">
            <FaLock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-200 rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-gray-50/50"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="relative">
            <FaCheckCircle className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-200 rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-gray-50/50"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={fieldVariants}>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FaUserTag size={16} className="text-blue-500" />
              <span>I am a...</span>
            </div>
            <div className="flex gap-3">
              {["attendee", "organizer"].map((role) => (
                <label
                  key={role}
                  className={`flex-1 flex items-center justify-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 ${
                    form.role === role
                      ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/30"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 text-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={() => setForm({ ...form, role })}
                    className="accent-blue-600"
                  />
                  <span className="capitalize text-sm font-medium">
                    {role}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="pt-2"
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={18} />
                  Creating account...
                </>
              ) : (
                <>
                  Register
                  <FaArrowRight size={16} />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Signup */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors"
            type="button"
          >
            <span className="text-xl">🇬</span>
            <span className="text-sm font-medium text-gray-600">Google</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors"
            type="button"
          >
            <span className="text-xl">🐙</span>
            <span className="text-sm font-medium text-gray-600">GitHub</span>
          </motion.button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}