"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaClock, 
  FaCheckCircle, 
  FaComment 
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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const inView = useInView(formRef, { once: true, margin: "-50px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 1000);
  };

  const socials = [
    { name: "Twitter", icon: FaTwitter, url: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: FaLinkedin, url: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: FaInstagram, url: "#", color: "hover:text-pink-500" },
  ];

  const Field = ({ label, name, type = "text", placeholder, required = true, ...props }: any) => (
    <motion.div variants={fadeUp} className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-shadow"
          value={form[name as keyof typeof form]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          required={required}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-shadow"
          value={form[name as keyof typeof form]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          required={required}
          {...props}
        />
      )}
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-cyan-600 flex items-center gap-3">
          <FaComment className="text-cyan-600" size={32} />
          Get in Touch
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Form Column - 3/5 */}
        <motion.div
          ref={formRef}
          className="md:col-span-3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4"
                >
                  <FaCheckCircle size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Message Sent! 🎉</h3>
                <p className="text-emerald-600">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-4 text-cyan-600 hover:underline font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
              >
                <Field label="Your Name" name="name" placeholder="John Doe" />
                <Field label="Email Address" name="email" type="email" placeholder="john@example.com" />
                <Field label="Message" name="message" type="textarea" placeholder="Tell us what's on your mind..." />
                <motion.div variants={fadeUp}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Info - 2/5 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 space-y-8"
        >
          {/* Email */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <FaEnvelope className="text-cyan-600" size={24} />
              <h3 className="font-bold text-gray-800">Email</h3>
            </div>
            <a href="mailto:hello@eventhive.io" className="text-cyan-600 hover:underline">
              hello@eventhive.io
            </a>
          </div>

          {/* Support Hours */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="text-cyan-600" size={24} />
              <h3 className="font-bold text-gray-800">Support Hours</h3>
            </div>
            <p className="text-gray-600">Monday – Friday: 9am – 6pm (GMT)</p>
            <p className="text-gray-400 text-sm mt-1">We usually reply within 24 hours.</p>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-gray-50 rounded-full text-gray-500 ${social.color} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Response Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 text-center"
          >
            <p className="text-cyan-700 text-sm font-medium">
              💬 We're here to help — reach out anytime!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}