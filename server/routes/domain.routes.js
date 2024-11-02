const express = require('express');
const router = express.Router();

const { projectController } = require('../controller');

const {
    openProject,
} = projectController;

// @route    GET /:domain
// @desc     Open a project by domain
router.get('/:domain', openProject);

module.exports = router;