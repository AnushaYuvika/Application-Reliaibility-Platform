const Log = require("../models/Log");
const Project = require("../models/Project");


// Create a log
const createLog = async (req, res) => {
  try {
    const {
      project,
      level,
      message,
      service,
      timestamp
    } = req.body;

    if (!project || !level || !message || !service) {
      return res.status(400).json({
        message:
          "Project, level, message and service are required"
      });
    }

    const existingProject =
      await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const log = await Log.create({
      project,
      level,
      message,
      service,
      timestamp
    });

    res.status(201).json({
      message: "Log created successfully",
      log
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create log",
      error: error.message
    });
  }
};


// Get all logs
const getLogs = async (req, res) => {
  try {
    const { project, level } = req.query;

    const filter = {};

    if (project) {
      filter.project = project;
    }

    if (level && level !== "all") {
      filter.level = level;
    }

    const logs = await Log.find(filter)
      .populate("project", "name environment")
      .sort({ timestamp: -1 });

    res.status(200).json({
      logs
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch logs",
      error: error.message
    });
  }
};


// Get single log
const getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id)
      .populate("project", "name environment");

    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      });
    }

    res.status(200).json({
      log
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch log",
      error: error.message
    });
  }
};


// Delete a log
const deleteLog = async (req, res) => {
  try {
    const log =
      await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        message: "Log not found"
      });
    }

    await log.deleteOne();

    res.status(200).json({
      message: "Log deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete log",
      error: error.message
    });
  }
};


module.exports = {
  createLog,
  getLogs,
  getLogById,
  deleteLog
};