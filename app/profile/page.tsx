"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserCircle,
  FaCalendarAlt,
  FaIdCard,
} from "react-icons/fa";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const tabVariants = {
  inactive: { opacity: 0.6, y: 0 },
  active: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) { router.push("/login"); return; }
    const parsed = JSON.parse(u);
    setUser(parsed);
    setForm({ name: parsed.name, email: parsed.email });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, name: form.name, email: form.email };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (passwords.next !== passwords.confirm) {
      return setPwError("New passwords do not match.");
    }
    if (passwords.next.length < 6) {
      return setPwError("Password must be at least 6 characters.");
    }
    setPwSuccess(true);
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setPwSuccess(false), 3000);
  };

  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 rounded-full bg-indigo-600 text-white text-2xl font-bold flex items-center justify-center flex-shrink-0 shadow-md"
        >
          {initials}
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-1 inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full capitalize font-medium"
          >
            {user.role}
          </motion.span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
        {(["profile", "security"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition capitalize ${
              activeTab === tab
                ? "text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 bg-white shadow-sm rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab === "profile" ? <FaUser size={14} /> : <FaLock size={14} />}
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      <AnimatePresence mode="wait">
        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              <FaUserCircle className="text-indigo-600" size={20} />
              Personal Information
            </motion.h2>
            <motion.form
              variants={container}
              initial="hidden"
              animate="visible"
              onSubmit={handleSaveProfile}
              className="space-y-5"
            >
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUser size={14} className="text-gray-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaEnvelope size={14} className="text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaShieldAlt size={14} className="text-gray-400" />
                  Role
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500 capitalize cursor-not-allowed"
                  value={user.role}
                  disabled
                />
                <p className="text-xs text-gray-400">Role cannot be changed after registration.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Save Changes
                </motion.button>
                <AnimatePresence>
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-emerald-600 text-sm font-medium flex items-center gap-1"
                    >
                      <FaCheckCircle /> Profile updated!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.form>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-8 border-t grid grid-cols-2 gap-4 text-sm"
            >
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                  <FaCalendarAlt size={12} /> Member Since
                </div>
                <div className="font-semibold text-gray-800">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "—"}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-gray-400 text-xs mb-1 flex items-center gap-1">
                  <FaIdCard size={12} /> Account ID
                </div>
                <div className="font-mono text-xs text-gray-500 truncate">{user.id}</div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"
            >
              <FaLock className="text-indigo-600" size={20} />
              Change Password
            </motion.h2>
            <AnimatePresence>
              {pwError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4 border border-red-200 flex items-center gap-2"
                >
                  <FaExclamationCircle />
                  {pwError}
                </motion.div>
              )}
              {pwSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-4 border border-emerald-200 flex items-center gap-2"
                >
                  <FaCheckCircle />
                  Password changed successfully!
                </motion.div>
              )}
            </AnimatePresence>
            <motion.form
              variants={container}
              initial="hidden"
              animate="visible"
              onSubmit={handleChangePassword}
              className="space-y-5"
            >
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaLock size={14} className="text-gray-400" />
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaLock size={14} className="text-gray-400" />
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
                  value={passwords.next}
                  onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaLock size={14} className="text-gray-400" />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  required
                />
              </motion.div>
              <motion.button
                variants={fadeUp}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Update Password
              </motion.button>
            </motion.form>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-10 pt-8 border-t"
            >
              <h3 className="text-sm font-bold text-red-500 mb-3 flex items-center gap-2">
                <FaTrashAlt size={14} /> Danger Zone
              </h3>
              <div className="border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-red-50/50 transition-colors">
                <div>
                  <div className="font-medium text-gray-800 text-sm">Delete Account</div>
                  <div className="text-xs text-gray-500">Permanently remove your account and all data.</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-600 border border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600 text-xs px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}