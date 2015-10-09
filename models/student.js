var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  name: String,
  subject: String,
  grade: {
    type: Number,
    min: 0,
    max: 4
  },
  author: {type: String, default: 'Anonymous'}
});

module.exports = mongoose.model('Student', studentSchema);
