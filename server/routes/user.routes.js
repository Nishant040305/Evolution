const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { UserVerifier } = require('../middleware/credMiddleware');

const {
  getAllUserProjects,
  getAllSharedProjects,
  ChangeProfile,
  FindUserEmail,
  FindUserByID,
  FindUserSearch,
  GetFriends,
  getProjectsForDisplay,
  FindUserFromUsername,
} = userController;

// @route    GET /api/user/:id/project
// @desc     Get all projects by user id
router.get('/:id/project', UserVerifier, getAllUserProjects);

// @route    GET /api/user/:id/shared
// @desc     Get all shared projects by user id
router.get('/:id/shared', UserVerifier, getAllSharedProjects);

// @route    GET /api/user/:id
// @desc     Get user by id
router.put('/:id', UserVerifier, ChangeProfile);

// @route    GET /api/user/:email
// @desc     Get user by email
router.get('/:email', UserVerifier, FindUserEmail);

// @route    GET /api/user/:_id
// @desc     Get user by id
router.get('/ID/:id', UserVerifier, FindUserByID);

// @route    GET /api/user/search
// @desc     Search users
router.get('/search/:query', FindUserSearch);

// @route    GET /api/user/friends
// @desc     Get friends of a user
router.get('/friends/:id', UserVerifier, GetFriends);

// @route    GET /api/user/projects/:id
// @desc     Get all hosted projects
router.get('/projects/:id', UserVerifier, getProjectsForDisplay);

// @route    GET /api/user/username/:id
// @desc     Get user by username
router.get('/username/:id', UserVerifier, FindUserFromUsername);
module.exports = router;
