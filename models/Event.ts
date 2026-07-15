import mongoose, { Schema, models } from "mongoose";

const EventSchema = new Schema(
  {
    title:            { type: String, required: true },
    shortDescription: { type: String, default: "" },
    fullDescription:  { type: String, default: "" },
    category:         { type: String, required: true },
    date:             { type: String, required: true },
    time:             { type: String, default: "" },
    venue:            { type: String, required: true },
    price:            { type: Number, default: 0 },
    capacity:         { type: Number, default: 100 },
    imageUrl:         { type: String, default: "" },
    organizerId:      { type: Schema.Types.ObjectId, ref: "User" },
    rating:           { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Event = models.Event || mongoose.model("Event", EventSchema);