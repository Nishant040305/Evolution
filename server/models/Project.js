const { Schema, model } = require('mongoose');
const User = require('./User');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'No description provided.',
  },

  // domain provided by server and custom domain provided by user
  domain: {
    type: String,
    unique: true,
    default: function() {
      return this._id.toString();
    },
  },
  customDomain: {
    type: String,
    default: null,
  },

  // site analytics
  version: {
    type: Number,
    default: 1,
  },
  analytics: {
    views: {
      type: Number,
      default: 0,
    }
  },

  // project owner and collaborators
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['admin', 'editor', 'viewer', 'default'],
        default: 'default',
      },
    }
  ],
  visibility: {
    type: String,
    enum: ['public', 'private'],
  },

  // project data
  components: {
    type: Schema.Types.Mixed,
    default: {}
  },
  text: {
    "js": String,
    "css": String,
  },
  media:{
    type:[String],
    default:[]
  },

  // development version control
  versions: [
    {
      version: Number,
      components: Schema.Types.Mixed,
      text: {
        "js": String,
        "css": String,
      },
      timestamp: { type: Date, default: Date.now },
      message: { type: String, default: 'No message provided.' },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    }
  ]
}, { timestamps: true });

// Pre-save hook to track changes and version control
ProjectSchema.pre('save', function (next) {
  if (this.isModified('components') || this.isModified('text')) {
    const newVersion = {
      version: this.version + 1,
      components: this.components,
      text: this.text,
      user: this.user,
    };
    this.versions.push(newVersion);
  }
  next();
});

module.exports = model('Project', ProjectSchema);