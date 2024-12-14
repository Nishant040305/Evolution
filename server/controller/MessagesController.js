const Message = require('../models/message');
const User = require('../models/User');
const GetMessages = async (req, res) => {
    try {
        const { chatId, lastSeen, limit = 20 } = req.body;

        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required' });
        }

        const query = { chat_id: chatId };

        // Apply timestamp filter for pagination
        if (lastSeen) {
            query.timestamp = { $lt: new Date(lastSeen) }; // Include the exact lastSeen message
        }

        // Fetch messages with pagination
        const messages = await Message.find(query)
            .sort({ timestamp: -1 }) // Most recent messages first
            .limit(parseInt(limit));

        const totalMessages = await Message.countDocuments({ chat_id: chatId });
        console.log(messages[messages.length - 1])
        return res.json({
            success: true,
            data: messages,
            meta: {
                totalMessages,
                hasMore: messages.length === parseInt(limit),
                lastSeen: messages.length
                    ? messages[messages.length - 1].timestamp
                    : null,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};
const DeleteMessage = async (req, res) => {
    try {
        const { chatId, messageId } = req.body; 
        const user = await User.findById(req.user._id);
        if (!user || !user.verify) {
            return res.status(404).json({ error: 'No user found or user not verified' });
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        if (message.sender_id.toString() !== user._id.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this message' });
        }
        await Message.deleteOne({ _id: messageId });
        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

module.exports = { GetMessages, DeleteMessage };
