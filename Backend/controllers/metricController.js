const Metric = require("../models/Metric");
const Project = require("../models/Project");

// Create metric
const createMetric = async (req, res) => {
  try {
    const {
      project,
      cpuUsage,
      memoryUsage,
      requestRate,
      responseTime,
      timestamp
    } = req.body;

    if (
      !project ||
      cpuUsage === undefined ||
      memoryUsage === undefined ||
      requestRate === undefined ||
      responseTime === undefined
    ) {
      return res.status(400).json({
        message:
          "Project, CPU usage, memory usage, request rate and response time are required"
      });
    }

    const existingProject =
      await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const metric = await Metric.create({
      project,
      cpuUsage,
      memoryUsage,
      requestRate,
      responseTime,
      timestamp
    });

    res.status(201).json({
      message: "Metric created successfully",
      metric
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create metric",
      error: error.message
    });
  }
};


// Get metrics
const getMetrics = async (req, res) => {
  try {
    const { project } = req.query;

    const filter = {};

    if (project) {
      filter.project = project;
    }

    const metrics = await Metric.find(filter)
      .populate("project", "name environment")
      .sort({ timestamp: -1 });

    res.status(200).json({
      metrics
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch metrics",
      error: error.message
    });
  }
};


// Get latest metric for a project
const getLatestMetric = async (req, res) => {
  try {
    const { project } = req.query;

    if (!project) {
      return res.status(400).json({
        message: "Project is required"
      });
    }

    const metric = await Metric.findOne({
      project
    })
      .populate("project", "name environment")
      .sort({ timestamp: -1 });

    if (!metric) {
      return res.status(404).json({
        message: "No metrics found for this project"
      });
    }

    res.status(200).json({
      metric
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch latest metric",
      error: error.message
    });
  }
};


module.exports = {
  createMetric,
  getMetrics,
  getLatestMetric
};