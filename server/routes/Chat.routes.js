const express = require('express');
const router = express.Router();
const {UserVerifier} = require('../middleware/credMiddleware');
const ChatController = require('../controller/ChatController');

// @route    GET api/chats
// @desc     Get all chats
// @access   Private
router.get('/chats', UserVerifier, ChatController.getChatsData);

// @route    POST api/chats
// @desc     Create a new chat
// @access   Private
router.post('/chats', UserVerifier, ChatController.createChat);

// @route    POST api/chats/group
// @desc     Create a new group chat
// @access   Private
router.post('/chats/group', UserVerifier, ChatController.createGroupChat);

// @route    POST api/chats/group/add
// @desc     Add a user to a group chat
// @access   Private
router.post('/chats/group/add', UserVerifier, ChatController.addUserToGroupChat);  

// @route    POST api/chats/group/leave
// @desc     Leave a group chat
// @access   Private    
router.post('/chats/group/leave', UserVerifier, ChatController.LeaveGroup);

// @route    POST api/chats/group/editName
// @desc     Edit the group chat name
// @access   Private
router.post('/chats/group/editName', UserVerifier, ChatController.editGroupChatName);

// @route    POST api/chats/group/editIcon
// @desc     Edit the group chat icon
// @access   Private
router.post('/chats/group/editIcon', UserVerifier, ChatController.editGroupChatIcon);

module.exports = router;