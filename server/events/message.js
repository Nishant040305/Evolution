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

            const newMessage = new Message({
                chat_id: chatId,
                sender_id: senderId,
                content,
                type: type || 'text',
            });
            await newMessage.save();

            io.to(chatId).emit('receiveMessage', {
                message: {
                    _id: newMessage._id,
                    chat_id: chatId,
                    sender_id: senderId,
                    content,
                    type: newMessage.type,
                    timestamp: newMessage.timestamp,
                },
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

            // Update all unread messages for the user in this chat to 'read'
            const result = await Message.updateMany(
                { chat_id: chatId, read_by: { $ne: userId } },
                { $addToSet: { read_by: userId } } // Add userId to the read_by array
            );

            io.to(chatId).emit('readReceipts', {
                chatId,
                userId,
                updatedCount: result.modifiedCount, // Number of messages marked as read
            });

            console.log(
                `User ${userId} marked ${result.modifiedCount} messages as read in chat ${chatId}`
            );
        } catch (error) {
            console.error('Error marking messages as read:', error);
            socket.emit('error', { error: 'Failed to mark messages as read' });
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
};
