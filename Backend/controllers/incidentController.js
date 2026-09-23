const Incident = require("../models/Incident");
const Project = require("../models/Project");

const createIncident = async (req, res) => {
  try {
    const {
      project,
      title,
      description,
      severity,
      source
    } = req.body;

    if (!project || !title || !description || !severity) {
      return res.status(400).json({
        message: "Project, title, description and severity are required"
      });
    }

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const incident = await Incident.create({
      project,
      title: title.trim(),
      description: description.trim(),
      severity,
      source
    });

    res.status(201).json({
      message: "Incident created successfully",
      incident
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create incident",
      error: error.message
    });
  }
};


const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("project", "name environment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      incidents
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch incidents",
      error: error.message
    });
  }
};


const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("project", "name repository environment status");

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found"
      });
    }

    res.status(200).json({
      incident
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch incident",
      error: error.message
    });
  }
};


const updateIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      severity,
      status,
      source
    } = req.body;

    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found"
      });
    }

    if (title !== undefined) {
      incident.title = title.trim();
    }

    if (description !== undefined) {
      incident.description = description.trim();
    }

    if (severity !== undefined) {
      incident.severity = severity;
    }

    if (status !== undefined) {
      incident.status = status;

      if (status === "resolved") {
        incident.resolvedAt = new Date();
      } else {
        incident.resolvedAt = null;
      }
    }

    if (source !== undefined) {
      incident.source = source;
    }

    await incident.save();

    res.status(200).json({
      message: "Incident updated successfully",
      incident
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update incident",
      error: error.message
    });
  }
};


const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found"
      });
    }

    await incident.deleteOne();

    res.status(200).json({
      message: "Incident deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete incident",
      error: error.message
    });
  }
};



module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident
};