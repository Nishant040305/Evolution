const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

const {
    getAllUserProjects,
} = userController;

// @route    GET /api/user/:id/project
// @desc     Get all projects by user id
router.get('/:id/project', getAllUserProjects);

module.exports = router;