const Response = require("../models/Response");
const Incident = require("../models/Incident");
const Investigation = require("../models/Investigation");

const createResponse = async (req, res) => {
  try {
    const {
      incident,
      investigation,
      recommendation,
      remediation
    } = req.body;

    if (
      !incident ||
      !investigation ||
      !recommendation ||
      !remediation
    ) {
      return res.status(400).json({
        message:
          "Incident, investigation, recommendation and remediation are required"
      });
    }

    const existingIncident = await Incident.findById(incident);

    if (!existingIncident) {
      return res.status(404).json({
        message: "Incident not found"
      });
    }

    const existingInvestigation =
      await Investigation.findById(investigation);

    if (!existingInvestigation) {
      return res.status(404).json({
        message: "Investigation not found"
      });
    }

    const existingResponse = await Response.findOne({
      incident
    });

    if (existingResponse) {
      return res.status(409).json({
        message: "Response already exists for this incident"
      });
    }

    const response = await Response.create({
      incident,
      investigation,
      recommendation: recommendation.trim(),
      remediation: remediation.trim()
    });

    res.status(201).json({
      message: "Response created successfully",
      response
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create response",
      error: error.message
    });
  }
};

const getResponses = async (req, res) => {
  try {
    const responses = await Response.find()
      .populate(
        "incident",
        "title severity status source"
      )
      .populate(
        "investigation",
        "rootCause confidence status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      responses
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch responses",
      error: error.message
    });
  }
};

const getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(
      req.params.id
    )
      .populate(
        "incident",
        "title description severity status source"
      )
      .populate(
        "investigation",
        "evidence rootCause impact confidence status"
      );

    if (!response) {
      return res.status(404).json({
        message: "Response not found"
      });
    }

    res.status(200).json({
      response
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch response",
      error: error.message
    });
  }
};


const updateResponse = async (req, res) => {
  try {
    const {
      recommendation,
      remediation,
      approvalStatus,
      approvedBy,
      status
    } = req.body;

    const response = await Response.findById(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: "Response not found"
      });
    }

    if (recommendation !== undefined) {
      response.recommendation = recommendation.trim();
    }

    if (remediation !== undefined) {
      response.remediation = remediation.trim();
    }

    if (approvalStatus !== undefined) {
      response.approvalStatus = approvalStatus;

      if (approvalStatus === "approved") {
        response.approvedAt = new Date();
      } else {
        response.approvedAt = null;
      }
    }

    if (approvedBy !== undefined) {
      response.approvedBy = approvedBy.trim();
    }

    if (status !== undefined) {
      response.status = status;
    }

    await response.save();

    res.status(200).json({
      message: "Response updated successfully",
      response
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update response",
      error: error.message
    });
  }
};


const deleteResponse = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);

    if (!response) {
      return res.status(404).json({
        message: "Response not found"
      });
    }

    await response.deleteOne();

    res.status(200).json({
      message: "Response deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete response",
      error: error.message
    });
  }
};




module.exports = {
  createResponse,
  getResponses,
  getResponseById,
  updateResponse,
  deleteResponse
};