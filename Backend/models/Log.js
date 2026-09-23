const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    level: {
      type: String,
      enum: ["info", "warning", "error", "critical"],
      required: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    service: {
      type: String,
      required: true,
      trim: true
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;