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
  verify: {
    type: Boolean,
    default: false,
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
    },
  ],
  sharedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

module.exports = model('User', UserSchema);
