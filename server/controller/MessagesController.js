const Message = require('../models/message');
const GetMessages = async (req, res) => {
    try {
        const { chatId, lastSeen, limit = 20 } = req.query;

        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required' });
        }

        const query = { chat_id: chatId };

        // Apply timestamp filter for pagination
        if (lastSeen) {
            query.timestamp = { $lt: new Date(lastSeen) };
        }

        // Fetch messages with pagination
        const messages = await Message.find(query)
            .sort({ timestamp: -1 }) // Most recent messages first
            .limit(parseInt(limit));

        // Fetch the total count of messages in the chat
        const totalMessages = await Message.countDocuments({ chat_id: chatId });

        res.json({
            success: true,
            data: messages,
            meta: {
                totalMessages,
                hasMore: messages.length === parseInt(limit),
                lastSeen: messages[messages.length - 1]?.timestamp || null,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = { GetMessages };
