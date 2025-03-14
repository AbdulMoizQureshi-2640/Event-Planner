const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Meeting", "Birthday", "Appointment", "Other"],
    },
    reminders: [
      {
        time: {
          type: Date,
          required: true,
        },
        sent: {
          type: Boolean,
          default: false,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
eventSchema.index({ user: 1, date: 1 });
eventSchema.index({ category: 1 });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
