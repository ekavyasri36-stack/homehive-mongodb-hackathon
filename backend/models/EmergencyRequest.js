const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    emergencyType: {
      type: String,
      required: true,
      enum: [
        "Pregnant Woman",
        "Elderly Person",
        "Child",
        "Other",
      ],
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema,
  "emergency_requests"
);