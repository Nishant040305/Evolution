const express = require('express');
const router = express.Router();
const {UserVerifier}= require('../middleware/credMiddleware');
const Notifications = require('../controller/Notifications');
// @route    GET api/notifications/getNotifications
// @desc     Get all notifications
// @access   Private
router.get('/getNotifications', UserVerifier, Notifications.getNotifications);
// @route    POST api/notifications/createNotification
// @desc     Create a notification
// @access   Private
router.post('/createNotification', UserVerifier, Notifications.createNotification);
// @route    POST api/notifications/markAsRead
// @desc     Mark a notification as read    
// @access   Private
router.post('/markAsRead',UserVerifier, Notifications.markAsRead);
// @route    POST api/notifications/deleteNotification
// @desc     Delete a notification  
// @access   Private
router.post('/deleteNotification',UserVerifier, Notifications.deleteNotification);


module.exports = router;