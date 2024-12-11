const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { UserVerifier } = require('../middleware/credMiddleware');

const {
    getAllUserProjects,
    getAllSharedProjects,
    ChangeProfile,
    FindUserEmail,
    FindUserByID
} = userController;

// @route    GET /api/user/:id/project
// @desc     Get all projects by user id
router.get('/:id/project', UserVerifier, getAllUserProjects);

// @route    GET /api/user/:id/shared
// @desc     Get all shared projects by user id
router.get('/:id/shared', UserVerifier, getAllSharedProjects);

// @route    GET /api/user/:email
// @desc     Get user by email
router.put('/:id',UserVerifier,ChangeProfile);

// @route    GET /api/user/:email 
// @desc     Get user by email
router.get('/:email',UserVerifier,FindUserEmail);

// @route    GET /api/user/:_id
// @desc     Get user by id
router.get('/ID/:id',UserVerifier,FindUserByID);
module.exports = router;