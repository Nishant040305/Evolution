const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const projectRoutes = require('./project.routes');
const credentialRoutes = require('./credential.routes');
const ImageRoutes = require('./images.routes');

router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/auth', credentialRoutes);;
router.use('/image',ImageRoutes)
module.exports = router;