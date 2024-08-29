const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  forumName: {
    type: String,
    required: true
  },
  chatArray: {
    type: Array,
    default: []
  }
});

const ForumModel = mongoose.model('ForumModel', forumSchema);

module.exports = ForumModel;