const express = require('express');
const router = express.Router();

const projectRoutes = require('./project.routes');
const credentialRoutes = require('./credential.routes');

router.use('/project', projectRoutes);
router.use('/auth', credentialRoutes);;

module.exports = router;