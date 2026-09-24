const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    services: [
      {
        type: String,
      },
    ],

    availability: {
      type: String,
      default: "Available",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Provider", providerSchema);