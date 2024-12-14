const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// controllers
const { 
    projectController, 
    publishController, 
    memberController 
} = require("../controller");

const {
  getAllProjects,
  getProjectById,
  getProjectVersionHistory,
  revertProject,
  createProject,
  updateProject,
  deleteProject,
  updateComponents,
  updateImageProject,
} = projectController;
const { publishProject, openProject, downloadProject } = publishController;
const { inviteMember, updateMemberRole, removeMember } = memberController;

// middlewares
const { UserVerifier } = require("../middleware/credMiddleware");
const { permissions, authorize } = require("../middleware/authMiddleware");

// @route    GET /api/project
// @desc     Get all projects
router.get("/", UserVerifier, getAllProjects);

// @route    GET /api/project/:id
// @desc     Get a project by id
router.get(
  "/:id",
  UserVerifier,
  authorize(permissions.viewProject),
  getProjectById
);

// @route    GET /api/project/:id/versionHistory
// @desc     Get project version history by id
router.get(
  "/:id/versionHistory",
  UserVerifier,
  authorize(permissions.manageProject),
  getProjectVersionHistory
);

// @route    POST /api/project/:id/versionHistory
// @desc     Revert project version by id
router.post(
  "/:id/versionHistory",
  UserVerifier,
  authorize(permissions.manageProject),
  revertProject
);

// @route    POST /api/project
// @desc     Create a new project
router.post("/", UserVerifier, createProject);

// @route    POST /api/project/:id/invite/:userid
// @desc     Invite a user to a project
router.post(
  "/:id/invite",
  UserVerifier,
  authorize(permissions.manageMembers),
  inviteMember
);

// @route    PUT /api/project/:id/member/:userid
// @desc     Update a user's role in a project
router.put(
  "/:id/member",
  UserVerifier,
  authorize(permissions.manageMembers),
  updateMemberRole
);

// @route    DELETE /api/project/:id/member/:userid
// @desc     Remove a user from a project
router.delete(
  "/:id/member",
  UserVerifier,
  authorize(permissions.manageMembers),
  removeMember
);

// @route    PUT /api/project/:id
// @desc     Update a project by id
router.put(
  "/:id",
  UserVerifier,
  authorize(permissions.manageProject),
  updateProject
);

// @route    PUT /api/project/:id/components
// @desc     Update a project's components by id
router.put(
  "/:id/components",
  UserVerifier,
  authorize(permissions.editProject),
  updateComponents
);

// @route    DELETE /api/project/:id
// @desc     Delete a project by id
router.delete(
  "/:id",
  UserVerifier,
  authorize(permissions.deleteProject),
  deleteProject
);

// @route    POST /api/project/image/:id
// @desc     Update a project's media by id
router.post(
  "/image/:id",
  UserVerifier,
  authorize(permissions.editProject),
  upload.single("file"),
  updateImageProject
);

// @route    POST /api/project/:id/publish
// @desc     Publish a project by id
router.post(
  "/:id/publish",
  UserVerifier,
  authorize(permissions.publishProject),
  publishProject
);

// @route    GET /:domain/download
// @desc     Download a project zip by domain
router.get(
  "/:id/download",
  UserVerifier,
  authorize(permissions.downloadProject),
  downloadProject
);

module.exports = router;
