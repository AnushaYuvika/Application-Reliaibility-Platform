const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    cpuUsage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    memoryUsage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    requestRate: {
      type: Number,
      required: true,
      min: 0
    },

    responseTime: {
      type: Number,
      required: true,
      min: 0
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

const Metric = mongoose.model(
  "Metric",
  metricSchema
);

module.exports = Metric;