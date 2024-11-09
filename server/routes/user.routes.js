const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { UserVerifier } = require('../middleware/credMiddleware');

const {
    getAllUserProjects,
    getAllSharedProjects,
} = userController;

// @route    GET /api/user/:id/project
// @desc     Get all projects by user id
router.get('/:id/project', UserVerifier, getAllUserProjects);

// @route    GET /api/user/:id/shared
// @desc     Get all shared projects by user id
router.get('/:id/shared', UserVerifier, getAllSharedProjects);

module.exports = router;