const Chat = require('../models/Chat');
const Message = require('../models/message');

module.exports = (io, socket) => {
    // Handle sending messages
    socket.on('sendMessage', async (data) => {
        const { chatId, senderId, content, type } = data;

        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', { error: 'Chat not found' });
                return;
            }
        
            // Create and save the new message
            const newMessage = new Message({
                chat_id: chatId,
                sender_id: senderId,
                content,
                type: type || 'text',
            });
        
            await newMessage.save();
        
            // Update unread messages count for all members except the sender
            const otherMembers = chat.members.filter(member => member.toString() !== senderId.toString());
            const updateUnreadMessages = otherMembers.reduce((updateObj, memberId) => {
                updateObj[`unread_messages.${memberId}`] = 1;
                return updateObj;
            }, {});
        
            await Chat.updateOne(
                { _id: chatId },
                { $inc: updateUnreadMessages } // Increment unread count for all other members
            );
        
            // Emit the message to all clients in the chat room
            io.to(chatId).emit('receiveMessage', {
                _id: newMessage._id,
                chat_id: chatId,
                sender_id: senderId,
                content,
                type: newMessage.type,
                timestamp: newMessage.timestamp,
            });
        
            console.log(`Message sent in chat ${chatId}: ${content}`);
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { error: 'Failed to send message' });
        }
    });
    // Handle marking messages as read
    socket.on('markAsRead', async (data) => {
        const { chatId, userId } = data;

        try {
            // Check if the chat exists
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', { error: 'Chat not found' });
                return;
            }
            const unreadCountKey = `unread_messages.${userId}`;
            await Chat.updateOne(
                { _id: chatId },
                { $set: { [unreadCountKey]: 0 } } // Set unread count to 0 for the user
            );    

            io.to(chatId).emit('readReceipts', {
                chatId,
                userId,
            });

          
        } catch (error) {
            console.error('Error marking messages as read:', error);
            socket.emit('error', { error: 'Failed to mark messages as read' });
        }
    });
    //handle delete message
    socket.on('deleteMessage', async (data) => {
        const { chatId, messageId } = data;
        console.log("hello");
        try {
            // Check if the chat exists
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', { error: 'Chat not found' });
                return;
            }

            const message = await Message.findById(messageId);
            if (!message) {
                socket.emit('error', { error: 'Message not found' });
                return;
            }

            await Message.deleteOne({ _id: messageId });
            console.log(messageId,chatId)
            io.to(chatId).emit('deleteMessage', {
                chatId,
                messageId,
            });

            console.log(`Message ${messageId} deleted from chat ${chatId}`);
        } catch (error) {
            console.error('Error deleting message:', error);
            socket.emit('error', { error: 'Failed to delete message' });
        }
    });
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
};
