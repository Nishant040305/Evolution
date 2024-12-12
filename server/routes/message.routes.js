const express = require('express');
const router = express.Router();
const {UserVerifier} = require('../middleware/credMiddleware');
const MessageController = require('../controller/MessageController');

// @route    GET api/messages
// @desc     Get all messages
// @access   Private
router.get('/messages', UserVerifier, MessageController.getMessages);

module.exports = router;