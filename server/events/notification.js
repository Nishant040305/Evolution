const Notifications = require('../models/Notifications');

module.exports = (io,socket) => {
        // Handle sending a friend request notification
        socket.on('sendFriendRequest', async ({ senderId, receiverId, title }) => {
            try {
                //check if user is already friend or notfication already exists
                
                //check if notification already exists
                const notification = await Notifications.findOne({ receiverId, type: 'friendRequest', message: { senderId } });
                if (notification) {
                    console.log("Notification already exists");
                    return;
                }
                //check if user is already friend
                const newNotification = new Notifications({
                    title,
                    type: 'friendRequest',
                    message: { senderId },
                    receiverId,
                });
                await newNotification.save();

                // Emit to the specific user (receiverId)
                console.log(newNotification)
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
        socket.on('acceptFriendRequest', async (chat) => {
            try {
                console.log(chat);
                if(chat){
                    for(let i=0;i<chat.participants.length;i++){
                        io.to(chat.participants[i].user_id).emit('acceptFriendRequest', chat);
                    }
                }
            } catch (error) {
                console.error('Error marking notification as read:', error);
                socket.emit('error', 'Failed to mark notification as read');
            }
        });
        socket.on('sendNotification', async (data) => { 
            try {
                const {receiverId,_id} = data;
                const notification = await Notifications.findById(_id);
                if (!notification) {
                    socket.emit('error', { error: 'Notification not found' });
                    return;
                }
                io.to(receiverId).emit('newNotification', notification);
                console.log(`Notification sent to ${receiverId}`);
            } catch (error) {
                console.error('Error sending message:', error);
                socket.emit('error', { error: 'Failed to send message' });
            }
        });
        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    }

