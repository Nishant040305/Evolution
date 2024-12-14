const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    type: { type: String, enum: ['individual', 'group'], required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupName: { type: String },
    groupAvatar: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    unread_messages: {
        type: Map,
        of: Number, // Value is a number (count of unread messages)
        default: {}
      },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', ChatSchema);
