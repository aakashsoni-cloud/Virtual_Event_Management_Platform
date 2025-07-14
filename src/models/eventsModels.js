const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "14:00"
      required: true,
    },
    location: {
      type: String,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    capacity: {
      type: Number,
      min: 1,
      default: 100,
    },
    eventUrl: {
      type: String,
      required: true,
      trim: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;