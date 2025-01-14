const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['information', 'friendRequest', 'collaborationRequest'], // Restrict to defined notification types
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
  },
  receiverId: {
    type: String,
    required: true, // Every notification must have a receiver
  },
  read: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // Expire after 7 days
  },
});

module.exports = mongoose.model('Notifications', notificationSchema);
