import mongoose, { Schema, models } from "mongoose";

const ReviewSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: "Event" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export const Review = models.Review || mongoose.model("Review", ReviewSchema);