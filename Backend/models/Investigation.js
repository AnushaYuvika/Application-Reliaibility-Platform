const mongoose = require("mongoose");

const investigationSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },

    evidence: {
      type: String,
      required: true,
      trim: true
    },

    rootCause: {
      type: String,
      required: true,
      trim: true
    },

    impact: {
      type: String,
      required: true,
      trim: true
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    status: {
      type: String,
      enum: ["pending", "analyzing", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Investigation = mongoose.model(
  "Investigation",
  investigationSchema
);

module.exports = Investigation;