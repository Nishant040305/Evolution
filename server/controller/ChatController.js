const Chat = require('../models/Chat');
const UsersChat = require('../models/UsersChat');
const Message = require('../models/message');
const User = require('../models/User');

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
                    const member = await User.findById(memberId).select('displayName avatar');
                    return {
                        user_id: member._id,
                        username: member.displayname,
                        avatar: member.avatar,
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
            return res.status(404).json({ error: 'User not verified or found' });
        }
        if (!secondUser || !secondUser.verify) {
            return res.status(404).json({ error: 'Second user not verified or found' });
        }

        // Check if a chat already exists between the two users
        const existingChat = await Chat.findOne({
            type: 'individual',
            members: { $all: [user._id, secondUser._id] },
        });

        if (existingChat) {
            return res.status(400).json({ error: 'Chat already exists' });
        }

        // Create a new chat
        const newChat = new Chat({
            type: 'individual',
            members: [user._id, secondUser._id],
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
                participants: [
                    { user_id: user._id, username: user.displayname },
                    { user_id: secondUser._id, username: secondUser.displayname },
                ],
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create chat' });
    }
};

const createGroupChat = async (req, res) => {
    try {
        const { chatName, users, groupImage = 'default_group_image_url' } = req.body;
        const user = await User.findById(req.user._id);

        if (!user || !user.verify) {
            return res.status(404).json({ error: 'User not verified or found' });
        }

        if (!Array.isArray(users) || users.length < 2) {
            return res.status(400).json({ error: 'At least two users must be added to the group' });
        }

        const newChat = new Chat({
            type: 'group',
            groupName: chatName,
            groupAvatar: groupImage,
            members: [user._id, ...users],
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

        return res.status(200).json({
            success: true,
            data: {
                chat_id: newChat._id,
                chat_name: newChat.groupName,
                chat_image: newChat.groupAvatar,
                participants: [user._id, ...users],
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create group chat' });
    }
};
const addUserToGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const userToAdd = await User.findById(userId);

        if (!userToAdd || !userToAdd.verify) {
            return res.status(404).json({ error: 'User to add not verified or found' });
        }

        const groupChat = await Chat.findById(chatId);
        if (!groupChat || groupChat.type !== 'group') {
            return res.status(404).json({ error: 'Group chat not found or invalid chat type' });
        }

        if (groupChat.members.includes(userId)) {
            return res.status(400).json({ error: 'User is already part of the group chat' });
        }

        groupChat.members.push(userId);
        await groupChat.save();

        let userChat = await UsersChat.findOne({ user_id: userId });
        if (!userChat) {
            userChat = new UsersChat({ user_id: userId, chats: [] });
        }
        userChat.chats.push({ chat_id: chatId, type: 'group' });
        await userChat.save();

        return res.status(200).json({
            success: true,
            message: `User ${userToAdd.displayname} added to the group successfully`,
            data: {
                chat_id: chatId,
                user_id: userToAdd._id,
                username: userToAdd.displayname,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add user to group chat' });
    }
};

module.exports = { getChatsData,createChat,createGroupChat,addUserToGroupChat };