const mongoose = require('mongoose');

// Enum for chat types (personal or group chat)
const CHAT_TYPES = {
    PERSONAL: 'personal',
    GROUP: 'group',
};

const UsersChatSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // An array of chat IDs the user is a part of
    chats: [{
        chat_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Chat', 
            required: true 
        },
        type: {
            type: String,
            enum: [CHAT_TYPES.PERSONAL, CHAT_TYPES.GROUP],
            required: true,
        },
        // Active status for the user in the chat
        isActive: {
            type: Boolean,
            default: true,
        },
        // Timestamp for when the user was added to the chat
        joinedAt: { 
            type: Date, 
            default: Date.now 
        },
    }],
    // Timestamp when the user was added to the system
    createdAt: { type: Date, default: Date.now },
});

// Indexes to speed up queries for a specific user and chat
UsersChatSchema.index({ user_id: 1 });
UsersChatSchema.index({ 'chats.chat_id': 1 });

module.exports = mongoose.model('UsersChat', UsersChatSchema);
