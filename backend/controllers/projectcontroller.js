const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");


// CREATE PROJECT
const createProject = asyncHandler(
  async (req, res) => {

    const project = await Project.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  }
);


// GET ALL PROJECTS
const getProjects = asyncHandler(
  async (req, res) => {

    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  }
);


// GET FEATURED PROJECTS
const getFeaturedProjects = asyncHandler(
  async (req, res) => {

    const projects = await Project.find({
      featured: true
    }).sort({
      order: 1
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  }
);


// GET SINGLE PROJECT
const getProjectById = asyncHandler(
  async (req, res) => {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      res.status(404);

      throw new Error(
        "Project not found"
      );
    }

    res.status(200).json({
      success: true,
      data: project
    });
  }
);


// UPDATE PROJECT
const updateProject = asyncHandler(
  async (req, res) => {

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      res.status(404);

      throw new Error(
        "Project not found"
      );
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  }
);


// DELETE PROJECT
const deleteProject = asyncHandler(
  async (req, res) => {

    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      res.status(404);

      throw new Error(
        "Project not found"
      );
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  }
);


module.exports = {
  createProject,
  getProjects,
  getFeaturedProjects,
  getProjectById,
  updateProject,
  deleteProject
};