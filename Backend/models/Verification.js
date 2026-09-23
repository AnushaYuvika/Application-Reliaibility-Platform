const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },

    response: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
      required: true
    },

    testName: {
      type: String,
      required: true,
      trim: true
    },

    testDescription: {
      type: String,
      required: true,
      trim: true
    },

    result: {
      type: String,
      enum: ["passed", "failed"],
      required: true
    },

    output: {
      type: String,
      required: true,
      trim: true
    },

    verifiedBy: {
      type: String,
      default: null,
      trim: true
    },

    verifiedAt: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Verification = mongoose.model(
  "Verification",
  verificationSchema
);

module.exports = Verification;