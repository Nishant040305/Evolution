const Chat = require('../models/Chat');

module.exports = (io, socket) => {
    socket.on('groupChatName', async (chatId) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', 'Chat not found');
                return;
            }
            socket.emit('groupChatName',{chatId,groupName:chat.groupName});
        } catch (error) {
            console.error('Error updating group chat name:', error);
            socket.emit('error', 'Failed to update group chat name');
        }
    });
    socket.on('groupChatIcon', async (chatId) => {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', 'Chat not found');
                return;
            }
            socket.emit('groupChatIcon',{chatId,groupIcon:chat.groupAvatar});
            await chat.save();
            console.log(`Group Chat Icon Updated`);
        } catch (error) {
            console.error('Error updating group chat icon:', error);
            socket.emit('error', 'Failed to update group chat icon');
        }
    });
};