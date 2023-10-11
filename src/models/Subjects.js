const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  _id: String, 
    subject: String,
    date: [Number],
    attendance: [Buffer],
    roll: [Number]
  
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;