const express = require('express');
const router = express.Router();

const API_URL = '/api';

// const projectRoutes = require('./project.routes');
const credentialRoutes = require('./credential.routes');

// router.use(API_URL + '/project', projectRoutes);
router.use(API_URL + '/auth', credentialRoutes);;

module.exports = router;