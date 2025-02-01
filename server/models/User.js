const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Project = require('./Project');

// Define the User schema
const UserSchema = new Schema(
  {
    displayname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
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
    linkedin: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    contribution: {
      type: Schema.Types.Mixed,
    },
    selectedProjects: {
      type: [Schema.Types.Mixed],
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = model('User', UserSchema);
