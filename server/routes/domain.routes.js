const express = require('express');
const router = express.Router();

const { publishController } = require('../controller');
const { openProject, auditProject } = publishController;

// @route    GET /:domain
// @desc     Open a project by domain
router.get('/:domain', openProject);

// @route    GET /audit/:domain/
// @desc     Audit a project by domain
router.get('/audit/:domain', auditProject);

module.exports = router;