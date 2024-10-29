const express = require('express');
const router = express.Router();

const { projectController } = require('../controller');

const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = projectController;

// @route    GET /api/v1/project
// @desc     Get all projects
router.get('/', projectController.getAllProjects);

// @route    GET /api/v1/project/:id
// @desc     Get a project by id
router.get('/:id', projectController.getProjectById);

// @route    POST /api/v1/project
// @desc     Create a new project
router.post('/', projectController.createProject);

// @route    PUT /api/v1/project/:id
// @desc     Update a project by id
router.put('/:id', projectController.updateProject);

// @route    DELETE /api/v1/project/:id
// @desc     Delete a project by id
router.delete('/:id', projectController.deleteProject);

module.exports = router;