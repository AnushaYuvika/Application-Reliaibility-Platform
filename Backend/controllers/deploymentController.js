const Deployment = require("../models/Deployment");
const Project = require("../models/Project");

// Create deployment
const createDeployment = async (req, res) => {
  try {
    const {
      project,
      version,
      environment,
      status,
      deployedBy,
      timestamp
    } = req.body;

    if (
      !project ||
      !version ||
      !environment ||
      !status ||
      !deployedBy
    ) {
      return res.status(400).json({
        message:
          "Project, version, environment, status and deployedBy are required"
      });
    }

    const existingProject = await Project.findById(project);

    if (!existingProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const deployment = await Deployment.create({
      project,
      version,
      environment,
      status,
      deployedBy,
      timestamp
    });

    res.status(201).json({
      message: "Deployment created successfully",
      deployment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create deployment",
      error: error.message
    });
  }
};


// Get deployments
const getDeployments = async (req, res) => {
  try {
    const { project } = req.query;

    const filter = {};

    if (project) {
      filter.project = project;
    }

    const deployments = await Deployment.find(filter)
      .populate("project", "name environment")
      .sort({ timestamp: -1 });

    res.status(200).json({
      deployments
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch deployments",
      error: error.message
    });
  }
};


// Get latest deployment
const getLatestDeployment = async (req, res) => {
  try {
    const { project } = req.query;

    if (!project) {
      return res.status(400).json({
        message: "Project is required"
      });
    }

    const deployment = await Deployment.findOne({
      project
    })
      .populate("project", "name environment")
      .sort({ timestamp: -1 });

    if (!deployment) {
      return res.status(404).json({
        message: "No deployments found for this project"
      });
    }

    res.status(200).json({
      deployment
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch latest deployment",
      error: error.message
    });
  }
};


module.exports = {
  createDeployment,
  getDeployments,
  getLatestDeployment
};