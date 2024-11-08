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
  domain: {
    type: String,
    unique: true,
    default: function() {
      return this._id.toString();
    },
  },
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  components: {
    type: Schema.Types.Mixed,
    default: {}
  },
  media:{
    type:[String],
    default:[]
  }
}, { timestamps: true });

module.exports = model('Project', ProjectSchema);