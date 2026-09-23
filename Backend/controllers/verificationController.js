const Verification = require("../models/Verification");
const Incident = require("../models/Incident");
const Response = require("../models/Response");

// Create verification
const createVerification = async (req, res) => {
  try {
    const {
      incident,
      response,
      testName,
      testDescription,
      result,
      output,
      verifiedBy,
      status
    } = req.body;

    if (
      !incident ||
      !response ||
      !testName ||
      !testDescription ||
      !result ||
      !output
    ) {
      return res.status(400).json({
        message:
          "Incident, response, test name, test description, result and output are required"
      });
    }

    const existingIncident =
      await Incident.findById(incident);

    if (!existingIncident) {
      return res.status(404).json({
        message: "Incident not found"
      });
    }

    const existingResponse =
      await Response.findById(response);

    if (!existingResponse) {
      return res.status(404).json({
        message: "Response not found"
      });
    }

    if (existingResponse.approvalStatus !== "approved") {
      return res.status(400).json({
        message:
          "Response must be approved before verification"
      });
    }

    const verification = await Verification.create({
      incident,
      response,
      testName: testName.trim(),
      testDescription: testDescription.trim(),
      result,
      output: output.trim(),
      verifiedBy: verifiedBy
        ? verifiedBy.trim()
        : null,
      status: status || "completed"
    });

    res.status(201).json({
      message: "Verification created successfully",
      verification
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create verification",
      error: error.message
    });
  }
};

// Get all verifications
const getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find()
      .populate(
        "incident",
        "title severity status source"
      )
      .populate(
        "response",
        "recommendation remediation approvalStatus status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      verifications
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch verifications",
      error: error.message
    });
  }
};

// Get verification by ID
const getVerificationById = async (req, res) => {
  try {
    const verification =
      await Verification.findById(req.params.id)
        .populate(
          "incident",
          "title description severity status source"
        )
        .populate(
          "response",
          "recommendation remediation approvalStatus approvedBy approvedAt status"
        );

    if (!verification) {
      return res.status(404).json({
        message: "Verification not found"
      });
    }

    res.status(200).json({
      verification
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch verification",
      error: error.message
    });
  }
};

// Update verification
const updateVerification = async (req, res) => {
  try {
    const verification =
      await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({
        message: "Verification not found"
      });
    }

    const {
      testName,
      testDescription,
      result,
      output,
      verifiedBy,
      status
    } = req.body;

    if (testName !== undefined) {
      verification.testName =
        testName.trim();
    }

    if (testDescription !== undefined) {
      verification.testDescription =
        testDescription.trim();
    }

    if (result !== undefined) {
      verification.result = result;
    }

    if (output !== undefined) {
      verification.output =
        output.trim();
    }

    if (verifiedBy !== undefined) {
      verification.verifiedBy = verifiedBy
        ? verifiedBy.trim()
        : null;
    }

    if (status !== undefined) {
      verification.status = status;
    }

    if (
      result !== undefined ||
      output !== undefined ||
      verifiedBy !== undefined
    ) {
      verification.verifiedAt =
        new Date();
    }

    await verification.save();

    res.status(200).json({
      message: "Verification updated successfully",
      verification
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update verification",
      error: error.message
    });
  }
};

// Delete verification
const deleteVerification = async (req, res) => {
  try {
    const verification =
      await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({
        message: "Verification not found"
      });
    }

    await verification.deleteOne();

    res.status(200).json({
      message: "Verification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete verification",
      error: error.message
    });
  }
};

module.exports = {
  createVerification,
  getVerifications,
  getVerificationById,
  updateVerification,
  deleteVerification
};

