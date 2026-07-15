"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/events/my", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setEvents);
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    await fetch(`/api/events/${deleteId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setEvents(prev => prev.filter(e => e._id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark">My Events</h1>
        <Link href="/events/add" className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90">
          + New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center py-20">You haven't created any events yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left px-6 py-4">Event</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Price</th>
                <th className="text-left px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {events.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={e.imageUrl || "https://placehold.co/40x40"} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-medium text-black">{e.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{e.date}</td>
                  <td className="px-6 py-4 text-black font-semibold">{e.price === 0 ? "Free" : `$${e.price}`}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link href={`/events/${e._id}`} className="text-green-500 text-xs border border-green-300 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white transition">
                      View
                    </Link>
                    <button
                      onClick={() => setDeleteId(e._id)}
                      className="text-red-500 text-xs border border-red-300 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-xl text-center">
            <h3 className="text-lg font-bold mb-2">Delete Event?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="border px-5 py-2 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}