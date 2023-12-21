const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  _id: String, 
  sem: Number,
  subject: String,
  date: [Number],
  attendance: [Buffer],
  roll: [mongoose.Schema.Types.Number],
  subtype: String,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;