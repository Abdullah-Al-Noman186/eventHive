"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { FaEnvelope, FaLock, FaSpinner, FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa";

// Animation variants — now using the imported easeOut function
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
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

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      setLoading(false);

      if (!res.ok) {
        setError(data.error || `Server error (${res.status})`);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      router.push("/dashboard");
    } catch (err) {
      setLoading(false);
      setError("Could not connect to server. Please try again.");
    }
  };

  const demoLogin = () => setForm({ email: "demo@eventhive.io", password: "demo1234" });

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
            <span className="text-3xl">👋</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue to your account</p>
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
                  Logging in...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight size={16} />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Demo Account */}
        <motion.button
          onClick={demoLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200"
        >
          🚀 Use Demo Account
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Login */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors"
          >
            <FaGoogle className="text-red-500" size={20} />
            <span className="text-sm font-medium text-gray-600">Google</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors"
          >
            <FaGithub className="text-gray-800" size={20} />
            <span className="text-sm font-medium text-gray-600">GitHub</span>
          </motion.button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline transition-colors">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}