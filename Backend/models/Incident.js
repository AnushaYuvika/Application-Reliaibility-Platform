const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true
    },

    status: {
      type: String,
      enum: ["active", "investigating", "resolved"],
      default: "active"
    },

    source: {
      type: String,
      default: "manual"
    },

    startedAt: {
      type: Date,
      default: Date.now
    },

    resolvedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;