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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  components: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

module.exports = model('Project', ProjectSchema);