import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  bookedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
});

export const Booking = models.Booking || mongoose.model("Booking", BookingSchema);