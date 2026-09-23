const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name, repository, environment } = req.body;

    if (!name || !repository) {
      return res.status(400).json({
        message: "Project name and repository are required"
      });
    }

    const existingProject = await Project.findOne({
      name: name.trim()
    });

    if (existingProject) {
      return res.status(409).json({
        message: "Project with this name already exists"
      });
    }

    const project = await Project.create({
      name: name.trim(),
      repository: repository.trim(),
      environment
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project",
      error: error.message
    });
  }
};


const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      projects
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message
    });
  }
};


const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      project
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch project",
      error: error.message
    });
  }
};


const updateProject = async (req, res) => {
  try {
    const { name, repository, environment } = req.body;

    if (!name || !repository) {
      return res.status(400).json({
        message: "Project name and repository are required"
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    const duplicateProject = await Project.findOne({
      name: name.trim(),
      _id: { $ne: req.params.id }
    });

    if (duplicateProject) {
      return res.status(409).json({
        message: "Project with this name already exists"
      });
    }

    project.name = name.trim();
    project.repository = repository.trim();
    project.environment = environment;

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update project",
      error: error.message
    });
  }
};


const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
      error: error.message
    });
  }
};




module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};