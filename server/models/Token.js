const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const expiresAt = {
  PasswordChange: 60 * 60,
  PasswordChangeOTP: 60 * 10,
  EmailVerification: 60 * 5,
};

tokenSchema.pre('save', function (next) {
  this.createdAt = new Date();
  this.schema.path('createdAt').options.expires = expiresAt[this.type];
  next();
});

module.exports = mongoose.model('Token', tokenSchema);
