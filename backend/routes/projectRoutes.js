const express = require("express");

const {
  createProject,
  getProjects,
  getFeaturedProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const router = express.Router();


// POST
// /api/projects
router.post(
  "/",
  createProject
);


// GET
// /api/projects
router.get(
  "/",
  getProjects
);


// GET
// /api/projects/featured
router.get(
  "/featured",
  getFeaturedProjects
);


// GET
// /api/projects/:id
router.get(
  "/:id",
  getProjectById
);


// PUT
// /api/projects/:id
router.put(
  "/:id",
  updateProject
);


// DELETE
// /api/projects/:id
router.delete(
  "/:id",
  deleteProject
);


module.exports = router;