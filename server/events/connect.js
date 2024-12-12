const User = require('../models/User');
const UsersChat = require('../models/UsersChat');


module.exports = (io,socket)=>{
    socket.on('joinChat', async (userId) => {
        try {
            // Check if the user exists in the database
            const user = await User.findById(userId);
            if (!user) {
                console.log(`User not found: ${userId}`);
                return;
            }

            // Fetch or create UsersChat for the user
            let userChats = await UsersChat.findOne({ user_id: userId });
            if (!userChats) {
                console.log(`No chats found for user ${userId}. Creating a new UsersChat entry.`);
                userChats = new UsersChat({
                    user_id: userId,
                    chats: [], // Initialize with an empty chat list
                });
                await userChats.save();
            }

            // Join the socket to all chat rooms the user is part of
            const chatIds = userChats.chats.map((chat) => chat.chat_id.toString());
            chatIds.forEach((chatId) => socket.join(chatId));

            // Additionally, join the user to their own room (for personal notifications)
            socket.join(userId);

            console.log(`Socket ${socket.id} joined chats: ${chatIds} and user room: ${userId}`);
        } catch (error) {
            console.error(`Error joining chats for user ${userId}:`, error);
        }
    });
}
