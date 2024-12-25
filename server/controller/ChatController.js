const Chat = require('../models/Chat');
const UsersChat = require('../models/UsersChat');
const Message = require('../models/message');
const User = require('../models/User');
const getChatDetails = async (chatId) => {
    try {
        // Step 1: Retrieve the chat document by its ID
        const chat = await Chat.findById(chatId); // Optionally populate participant details
        if (!chat) {
            return { error: "Chat not found" };
        }
        
        // Step 2: Get the last message (if any)
        const lastMessage = await Message.findOne({ chat_id: chat._id })
                .sort({ timestamp: -1 })
                .limit(1);
        // Step 3: Get participants information
        const participants = await Promise.all(
            chat.members.map(async (memberId) => {
                const member = await User.findById(memberId).select('displayname avatar email');
                return {
                    user_id: member._id,
                    username: member.displayname,
                    avatar: member.avatar,
                    email: member.email,
                };
            })
        );

        // Step 4: Format the chat details to return
        const chatDetails = {
            chat_id: chat._id,
            chat_name: chat.groupName,
            chat_avatar: chat.groupAvatar || '/default-group-avatar.png',
            chat_type: chat.chatType || "group", // Assuming 'group' as default
            last_message: lastMessage ? lastMessage.content : "No messages yet",
            last_message_time: lastMessage ? lastMessage.timestamp : null,
            participants, // Participant details array
            unread_messages: chat.unread_messages || 0, // Assuming unread_messages is a count of unread messages
            createdBy: chat.createdBy,
        };

        // Step 5: Return the formatted data
        return chatDetails;
    } catch (error) {
        console.error("Error fetching chat details:", error);
        return { error: "An error occurred while fetching chat details" };
    }
};
// Get chat data for the user
const getChatsData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user || !user.verify) {
            return res.status(404).json({ error: 'No chats found or user not verified' });
        }

        // Fetch the user's chats from UsersChat
        const userChats = await UsersChat.findOne({ user_id: user._id }).populate('chats.chat_id');

        if (!userChats) {
            // If no chats exist for the user, initialize UsersChat and return empty data
            const newUserChat = new UsersChat({ user_id: user._id });
            await newUserChat.save();
            return res.status(200).json({ success: true, data: [] });
        }

        // Fetch chat data and latest message for each chat
        const chatDataPromises = userChats.chats.map(async (userChat) => {
            const chat = userChat.chat_id;
            const chatType = userChat.type;

            // Get the last message for the chat
            const lastMessage = await Message.findOne({ chat_id: chat._id })
                .sort({ timestamp: -1 })
                .limit(1);

            // Build participants list
            const participants = await Promise.all(
                chat.members.map(async (memberId) => {
                    const member = await User.findById(memberId).select('displayname avatar email');
                    return {
                        user_id: member._id,
                        username: member.displayname,
                        avatar: member.avatar,
                        email: member.email,
                    };
                })
            );

            return {
                chat_id: chat._id,
                chat_name: chatType === 'group' ? chat.groupName : participants.find(p => p.user_id.toString() !== user._id.toString()).username,
                chat_avatar: chatType === 'group' ? chat.groupAvatar : participants.find(p => p.user_id.toString() !== user._id.toString()).avatar,
                chat_type: chatType,
                last_message: lastMessage ? lastMessage.content : 'No messages yet',
                last_message_time: lastMessage ? lastMessage.timestamp : null,
                participants,
                unread_messages: chat.unread_messages,
                createdBy: chat.createdBy,
            };
        });

        const chatData = await Promise.all(chatDataPromises);
        return res.status(200).json({ success: true, data: chatData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve chat data' });
    }
};

const createChat = async (req, res) => {
    try {
        const { secondUserId } = req.body;
        const user = await User.findById(req.user._id);
        const secondUser = await User.findById(secondUserId);

        if (!user || !user.verify) {
            return res.status(404).json({ error: 'User not verified or found' ,data:null});
        }
        if (!secondUser || !secondUser.verify) {
            return res.status(404).json({ error: 'Second user not verified or found',data:null});
        }

        // Check if a chat already exists between the two users
        const existingChat = await Chat.findOne({
            type: 'individual',
            members: { $all: [user._id, secondUser._id] },
        });

        if (existingChat) {
            return res.status(200).json({ error: 'Chat already exists',data:null });
        }

        // Create a new chat
        const newChat = new Chat({
            type: 'individual',
            members: [user._id, secondUser._id],
            unread_messages: {[user._id]:0,[secondUser._id]:0},

        });
        await newChat.save();

        // Add chat to UsersChat for both users
        const addUserToChat = async (userId) => {
            let userChat = await UsersChat.findOne({ user_id: userId });
            if (!userChat) {
                userChat = new UsersChat({ user_id: userId, chats: [] });
            }
            userChat.chats.push({ chat_id: newChat._id, type: 'personal' });
            await userChat.save();
        };

        await addUserToChat(user._id);
        await addUserToChat(secondUser._id);

        return res.status(200).json({
            success: true,
            data: {
                chat_id: newChat._id,
                chat_name: secondUser.displayname,
                chat_avatar: secondUser.avatar,
                chat_type: newChat.chat_type,
                last_message: "No messages yet",
                last_message_time: null,
                participants: [
                    { user_id: user._id, username: user.displayname },
                    { user_id: secondUser._id, username: secondUser.displayname },

                ],
                unread_messages: newChat.unread_messages,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create chat' });
    }
};

const createGroupChat = async (req, res) => {
    try {
        const { chatName, users, groupImage } = req.body;
        const user = await User.findById(req.user._id);
        console.log("Group Chat" , users);
        if (!user || !user.verify) {
            return res.status(404).json({ error: 'User not verified or found' });
        }

        if (!Array.isArray(users) || users.length < 2) {
            return res.status(400).json({ error: 'At least two users must be added to the group' });
        }

        const unreadMessages = { [user._id]: 0 }; // Initialize unread_messages with the creator

        // Add each user from the `users` array with a value of 0
        users.forEach((id) => {
        unreadMessages[id] = 0;
        });
        

        const newChat = new Chat({
        type: 'group',
        groupName: chatName,
        groupAvatar: groupImage,
        members: [user._id, ...users],
        unread_messages: unreadMessages, // Use the constructed unreadMessages object
        createdBy: user._id,
        });

        await newChat.save();

        const addUsersToChat = async (userId) => {
            let userChat = await UsersChat.findOne({ user_id: userId });
            if (!userChat) {
                userChat = new UsersChat({ user_id: userId, chats: [] });
            }
            userChat.chats.push({ chat_id: newChat._id, type: 'group' });
            await userChat.save();
        };

        await addUsersToChat(user._id);
        for (const userId of users) {
            await addUsersToChat(userId);
        }
        const participants = await Promise.all(
            newChat.members.map(async (memberId) => {
                const member = await User.findById(memberId).select('displayname avatar');
                return {
                    user_id: member._id,
                    username: member.displayname,
                    avatar: member.avatar,
                };
            })
        );
        return res.status(200).json({
            success: true,
            data: {
                chat_id: newChat._id,
                chat_name: newChat.groupName,
                chat_type: newChat.type,
                chat_avatar: newChat.groupAvatar,
                participants: participants,
                last_message: 'No messages yet',
                last_message_time: null,
                unread_messages: newChat.unread_messages,
                createdBy: user._id,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create group chat' });
    }
};

const addUserToGroupChat = async (req, res) => {
    try {
        const { chatId, userIds } = req.body; // `userIds` is now an array
        console.log("hello");
        if (!Array.isArray(userIds) || userIds.length === 0) {
            
            return res.status(400).json({ error: "Invalid or empty userIds array" });
        }

        const groupChat = await Chat.findById(chatId).populate("members", "displayname avatar email"); // Populate member details
        if (!groupChat || groupChat.type !== "group") {
            return res.status(404).json({ error: "Group chat not found or invalid chat type" });
        }

        const addedUsers = [];
        const errors = [];

        for (const userId of userIds) {
            try {
                const userToAdd = await User.findById(userId);

                if (!userToAdd || !userToAdd.verify) {
                    errors.push({ userId, message: "User not found or not verified" });
                    continue;
                }

                if (groupChat.members.some(member => member._id.toString() === userId)) {
                    errors.push({ userId, message: "User is already part of the group chat" });
                    continue;
                }

                // Add user to group chat
                groupChat.members.push(userToAdd);
                groupChat.unread_messages[userId] = 0;

                // Update user's chats
                let userChat = await UsersChat.findOne({ user_id: userId });
                if (!userChat) {
                    userChat = new UsersChat({ user_id: userId, chats: [] });
                }
                userChat.chats.push({ chat_id: chatId, type: "group" });
                await userChat.save();

                addedUsers.push({
                    user_id: userToAdd._id,
                    username: userToAdd.displayname,
                    avatar: userToAdd.avatar,
                });
            } catch (innerError) {
                errors.push({ userId, message: "Failed to process user", error: innerError.message });
            }
        }

        await groupChat.save();

        // Fetch the latest chat details to include in the response
        console.log(groupChat.members);
        const participants = groupChat.members.map(member => ({
            user_id: member._id,
            username: member.displayname,
            avatar: member.avatar,
            email: member.email,
        }));
        const lastMessage = await Message.findOne({ chat_id: groupChat._id })
        .sort({ timestamp: -1 })
        .limit(1);

        const chatDetails = {
            chat_id: groupChat._id,
            chat_name: groupChat.groupName,
            chat_avatar: groupChat.groupAvatar,
            chat_type: "group",
            last_message: lastMessage ? lastMessage.content : "No messages yet",
            last_message_time: lastMessage ? lastMessage.timestamp : null,
            participants,
            unread_messages: groupChat.unread_messages,
            createdBy: groupChat.createdBy,
        };

        return res.status(200).json({
            success: true,
            message: `${addedUsers.length} user(s) added to the group successfully`,
            data: chatDetails,
            errors,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add users to group chat" });
    }
};

const LeaveGroup = async (req, res) => {
    try {
        const { chatId } = req.body;
        const user = await User.findById(req.user._id);
        if (!user || !user.verify) {
            return res.status(404).json({ error: 'No user found or user not verified' });
        }
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (chat.type !== 'group') {
            return res.status(400).json({ error: 'Chat is not a group chat' });
        }
        if (!chat.members.some(member => member.toString() === user._id.toString())) {
            return res.status(400).json({ error: 'User is not a member of the group chat' });
        }
        await Chat.updateOne(
            { _id: chatId },
            { $pull: { members: user._id } }
        );
        await UsersChat.updateOne(
            { user_id: user._id },
            { $pull: { chats:{ chat_id: chatId } } }
        );
        //get the whole chat data of the chat
        const chatDetails = await getChatDetails(chatId);
        console.log("Chat details",chatDetails);
        res.status(200).json({
             success: true,
             data: chatDetails,
             message: 'User removed successfully' 
            });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing user', error });
    }
};
// To Edit the Group Icon and Name
const editGroupChatName = async (req, res) => {
    try {
        const { chatId, groupName } = req.body;
        const user = await User.findById(req.user._id);
        if (!user || !user.verify) {
            return res.status(404).json({ error: 'User not found or not verified' });
        }
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (chat.type !== 'group') {
            return res.status(400).json({ error: 'Chat is not a group chat' });
        }
        if (!chat.members.some(member => member.toString() === user._id.toString())) {
            return res.status(400).json({ error: 'User is not a member of the group chat' });
        }
        await Chat.updateOne(
            { _id: chatId },
            { $set: { groupName } }
        );
        res.status(200).json({
            success: true,
            message: 'Group chat details updated successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating group chat details', error });
    }
};
const editGroupChatIcon = async (req, res) => {
    try {
        const { chatId, groupImage } = req.body;
        console.log("hello",chatId,groupImage);
        const user = await User.findById(req.user._id);
        if (!user || !user.verify) {
            return res.status(404).json({ error: 'User not found or not verified' });
        }
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        if (chat.type !== 'group') {
            return res.status(400).json({ error: 'Chat is not a group chat' });
        }
        if (!chat.members.some(member => member.toString() === user._id.toString())) {
            return res.status(400).json({ error: 'User is not a member of the group chat' });
        }
        await Chat.updateOne(
            { _id: chatId },
            { $set: { groupAvatar: groupImage } }
        );
        res.status(200).json({
            success: true,
            message: 'Group chat icon updated successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating group chat icon', error });
    }
};
module.exports = { getChatsData,createChat,createGroupChat,addUserToGroupChat,LeaveGroup,editGroupChatName,editGroupChatIcon };
