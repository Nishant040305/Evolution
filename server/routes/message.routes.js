const express = require('express');
const router = express.Router();
const {UserVerifier} = require('../middleware/credMiddleware');
const MessageController = require('../controller/MessagesController');

// @route    GET api/messages
// @desc     Get all messages
// @access   Private
router.post('/messages', UserVerifier, MessageController.GetMessages);

// @route    POST api/messages
// @desc     Delete a message
// @access   Private
router.delete('/messages', UserVerifier, MessageController.DeleteMessage);
module.exports = router;