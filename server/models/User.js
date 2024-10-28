const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Project = require('./Project');

const UserSchema = new Schema({
  displayname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
    default: '',
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    }
  ]
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = model('User', UserSchema);