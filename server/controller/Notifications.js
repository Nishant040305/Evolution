const Notifications = require('../models/Notifications');

module.exports = {
    async getNotifications(req, res) {
        try {
            const receiverId = req.user._id;
            console.log("Notifications retrieved for user:", req.user.displayname, receiverId);
            if (!receiverId) {
                res.status(400).json({ success: false, error: 'Receiver ID is required' });
                return;
            }

            const notifications = await Notifications.find({ receiverId });
            console.log("Notifications retrieved:", notifications);
            res.status(200).json({ success: true, data: notifications });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },

    async markAsRead(req, res) {
        try {
            const { id } = req.body;
            const notification = await Notifications.findById(id);
            if (!notification) {
                res.status(404).json({ success: false, error: 'Notification not found' });
                return;
            }
            notification.read = true;
            await notification.save();
            res.status(200).json({ success: true, data: notification });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },

    async deleteNotification(req, res) {
        try {
            console.log("deleteNotification",req.body.id)
            const { id } = req.body;
            const notification = await Notifications.findById(id);
            if (!notification) {
                res.status(404).json({ success: false, error: 'Notification not found' });
                return;
            }
            await Notifications.findByIdAndDelete(id);
            res.status(200).json({ success: true, data: notification });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },

    async createNotification(req, res) {
        try {
            const { title, type, message, receiverId } = req.body;

            if (!receiverId) {
                res.status(400).json({ success: false, error: 'Receiver ID is required' });
                return;
            }

            if (!['information', 'friendRequest'].includes(type)) {
                res.status(400).json({ success: false, error: 'Invalid notification type' });
                return;
            }

            const notification = new Notifications({ title, type, message, receiverId });
            await notification.save();

            res.status(201).json({ success: true, data: notification });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },
};
