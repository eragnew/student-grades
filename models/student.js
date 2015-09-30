var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  name: String,
  subject: String,
  grade: {
    type: Number,
    min: 0,
    max: 4
  },
  username: String
});

module.exports = mongoose.model('Student', studentSchema);
