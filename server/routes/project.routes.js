const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { projectController } = require('../controller');

const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    publishProject,
    updateImageProject
} = projectController;

// @route    GET /api/project
// @desc     Get all projects
router.get('/', getAllProjects);

// @route    GET /api/project/:id
// @desc     Get a project by id
router.get('/:id', getProjectById);

// @route    POST /api/project
// @desc     Create a new project
router.post('/', createProject);

// @route    PUT /api/project/:id
// @desc     Update a project by id
router.put('/:id', updateProject);

// @route    DELETE /api/project/:id
// @desc     Delete a project by id
router.delete('/:id', deleteProject);

router.post('/image/:id',upload.single('file'),updateImageProject);
// @route    POST /api/project/:id/publish
// @desc     Publish a project by id
router.post('/:id/publish', publishProject);

module.exports = router;