const { Schema, model } = require('mongoose');
const User = require('./User');

const fileSchema = new Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  content: { type: String, default: "" },
  components: { type: Schema.Types.Mixed, default: undefined }, // false if file is index.html
  styles: { type: [String], default: [] },
  scripts: { type: [String], default: [] },
  useDefault: { type: Boolean, default: undefined }, // true if file is index.html
});

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'No description provided.',
  },
  
  // search engine optimization
  keywords: [
    {
      type: String,
    }
  ],

  // domain provided by server and custom domain provided by user (not implemented)
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
  publishVersion: {
    type: Number,
    default: 0,
  },
  analytics: {
    views: [
      {
        type: Date,
        default: Date.now
      }
    ]
  },

  // project owner and collaborators
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groupChatId:{
    type:Schema.Types.ObjectId,
    ref:'Chat',
    default:null
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      /*
       * viewer: can VIEW
       * editor: can also EDIT, PUBLISH, DOWNLOAD
       * admin: can MANAGE PROJECT
       * owner: can MANAGE MEMBERS, DELETE
       */ 
      role: {
        type: String,
        enum: ['admin', 'editor', 'viewer', 'default'], // 'owner' is not a role
        default: 'default',
      },
      status:{
        type: String,
        enum: ['active', 'pending', 'declined'],
        default: 'pending',
      },
      // additional permissions
      permissions: {
        type: Array,
        default: [],
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
  files: {
    type: [fileSchema],
    default: () => [
      {
        name: 'index.html',
        components: false,
        styles: ["style.css"],
        scripts: ["script.js"],
        useDefault: true,
      },
      {
        name: 'style.css',
        content: "/* Add your custom CSS here */",
      },
      {
        name: 'script.js',
        content: "/* Write custom JavaScript here */",
      },
      {
        name: 'homepage.html',
        components: {},
        styles: ["style.css"],
        scripts: ["script.js"],
      }
    ]
  },
  media: {
    type:[String],
    default:[]
  },

  // development version control
  version: {
    type: Number,
    default: 0,
  },
  commitMessage: {
    type: String,
    default: "Initial commit"
  },
  versions: [
    {
      version: Number,
      components: Schema.Types.Mixed,
      javascriptContent: String,
      cssContent: String,
      files: Schema.Types.Mixed,
      timestamp: { type: Date, default: Date.now },
      commitMessage: String,
      member: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Pre-save hook to track changes and version control
ProjectSchema.pre('save', function (next) {
  console.log("Save detected");
  if (this.isModified('version')) {
    console.log("Version modified to ", this.version);
    const newVersion = {
      version: this.version,
      components: this.components,
      javascriptContent: this.javascriptContent,
      cssContent: this.cssContent,
      files: this.files,
      commitMessage: this.commitMessage,
      member: this.user,
    };
    this.versions.push(newVersion);
  }
  next();
});

module.exports = model('Project', ProjectSchema);