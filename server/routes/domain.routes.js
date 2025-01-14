const express = require('express');
const router = express.Router();

const { publishController } = require('../controller');
const { auditProject } = publishController;

// @route    GET /audit/:domain/
// @desc     Audit a project by domain
router.get('/audit/:domain', auditProject);

module.exports = router;