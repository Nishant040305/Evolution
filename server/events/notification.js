const Notifications = require('../models/Notifications');

module.exports = (io,socket) => {
        // Handle sending a friend request notification
        socket.on('sendFriendRequest', async ({ senderId, receiverId, title }) => {
            try {
                const newNotification = new Notifications({
                    title,
                    type: 'friendRequest',
                    message: { senderId },
                    receiverId,
                });
                await newNotification.save();

                // Emit to the specific user (receiverId)
                io.to(receiverId).emit('newNotification', newNotification);
                console.log(`Friend request sent from ${senderId} to ${receiverId}`);
            } catch (error) {
                console.error('Error creating friend request notification:', error);
                socket.emit('error', 'Failed to send friend request');
            }
        });

        // Handle marking a notification as read
        socket.on('markAsRead', async ({ notificationId, receiverId }) => {
            try {
                const notification = await Notifications.findById(notificationId);
                if (!notification) {
                    socket.emit('error', 'Notification not found');
                    return;
                }

                notification.read = true;
                await notification.save();

                // Emit the updated notification to the specific user
                io.to(receiverId).emit('notificationUpdated', notification);
                console.log(`Notification ${notificationId} marked as read for ${receiverId}`);
            } catch (error) {
                console.error('Error marking notification as read:', error);
                socket.emit('error', 'Failed to mark notification as read');
            }
        });
        socket.on('deleteNotification', async ({ notificationId, receiverId }) => {
            try {
                const notification = await Notifications.findById(notificationId);
                if (!notification) {
                    socket.emit('error', 'Notification not found');
                    return;
                }
                await notification.remove();
                console.log(`Notification ${notificationId} deleted for ${receiverId}`);
            } catch (error) {
                console.error('Error deleting notification:', error);
                socket.emit('error', 'Failed to delete notification');
            }
        });
        socket.on('acceptFriendRequest', async ({ notificationId, receiverId }) => {
            try {
                const notification = await Notifications.findById(notificationId);
                if (!notification) {
                    socket.emit('error', 'Notification not found');
                    return;
                }
                notification.read = true;
                await notification.save();
                const friend = await Notifications.findOne({ type: 'friendRequest', receiverId });
                friend.read = true;
                await friend.save();
                // Emit the updated notification to the specific user
                io.to(receiverId).emit('notificationUpdated', notification);
                console.log(`Notification ${notificationId} marked as read for ${receiverId}`);
            } catch (error) {
                console.error('Error marking notification as read:', error);
                socket.emit('error', 'Failed to mark notification as read');
            }
        });
        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    }

