const Subject = require('../../models/Subjects');
const mongoose = require('mongoose');
// Controller to create a new subject
const createSubject = async (req, res) => {
  try {
    const { _id, date, attendance, roll, subject, stream,sem} = req.body;

    // Create a model with dynamic collection and database names
    const subjectModel = mongoose.model('Subject', Subject.schema, stream);

    const newSubject = new subjectModel({
      _id: _id,
      subject: subject,
      sem: sem,
      date: date,
      attendance: attendance,
      roll: roll
    });

    await newSubject.save();
    res.status(201).json({ message: 'Subject created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to retrieve all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubject, getAllSubjects };
