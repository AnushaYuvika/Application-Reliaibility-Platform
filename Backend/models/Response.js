const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },

    investigation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investigation",
      required: true
    },

    recommendation: {
      type: String,
      required: true,
      trim: true
    },

    remediation: {
      type: String,
      required: true,
      trim: true
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    approvedBy: {
      type: String,
      default: null,
      trim: true
    },

    approvedAt: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["pending", "approved", "executing", "completed", "failed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;