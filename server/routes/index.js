const express = require('express');
const router = express.Router();

const API_URL = '/api';

const projectRoutes = require('./project.routes');

router.use(API_URL + '/project', projectRoutes);

module.exports = router;