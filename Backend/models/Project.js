const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    repository: {
      type: String,
      required: true,
      trim: true
    },

    environment: {
      type: String,
      required: true,
      enum: ["production", "staging", "development"],
      default: "production"
    },

    status: {
      type: String,
      default: "Operational"
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;