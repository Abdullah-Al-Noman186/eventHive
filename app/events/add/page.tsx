"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Music", "Tech", "Sports", "Food", "Art", "Business"];

export default function AddEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", shortDescription: "", fullDescription: "", category: "Music",
    date: "", time: "", venue: "", price: 0, capacity: 100, imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || "Failed to create event");
    router.push(`/events/${data._id}`);
  };

  const field = (label: string, key: string, type = "text") => (
    <div key={key} className="space-y-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
        value={(form as any)[key]}
        onChange={(e) => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
        required={key !== "imageUrl"}
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-dark mb-8">Create New Event</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5 bg-white text-black rounded-2xl shadow p-8">
        {field("Event Title", "title")}
        {field("Short Description", "shortDescription")}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Full Description</label>
          <textarea
            rows={4}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.fullDescription}
            onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Category</label>
          <select
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field("Date", "date", "date")}
          {field("Time", "time", "time")}
        </div>
        {field("Venue / Location", "venue")}
        <div className="grid grid-cols-2 gap-4">
          {field("Price ($)", "price", "number")}
          {field("Capacity", "capacity", "number")}
        </div>
        {field("Image URL (optional)", "imageUrl")}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white bg-emerald-800 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}