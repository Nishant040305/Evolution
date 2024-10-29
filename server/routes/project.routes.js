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

module.exports = router;