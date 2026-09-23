const mongoose = require("mongoose");

const deploymentSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    version: {
      type: String,
      required: true,
      trim: true
    },

    environment: {
      type: String,
      enum: ["production", "staging", "development"],
      required: true
    },

    status: {
      type: String,
      enum: ["success", "failed", "in-progress"],
      required: true
    },

    deployedBy: {
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

const Deployment = mongoose.model(
  "Deployment",
  deploymentSchema
);

module.exports = Deployment;