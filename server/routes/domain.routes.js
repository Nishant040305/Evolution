const express = require('express');
const router = express.Router();

const { publishController } = require('../controller');
const { openProject } = publishController;

// @route    GET /:domain
// @desc     Open a project by domain
router.get('/:domain', openProject);

module.exports = router;