const Subject = require('../../models/Subjects');
const mongoose = require('mongoose');

const updateAttendance = async (req, res) => {
  try {
    const { stream, _id, date, attendance } = req.body;

    // Create a model with dynamic collection name
    const subjectModel = mongoose.model('Subject', Subject.schema, stream);

    // Find the subject by its ID
    const existingSubject = await subjectModel.findById(_id);

    if (!existingSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    else{
        console.log(existingSubject);
    }
    // Update the attendance for the specified date
    existingSubject.date.push(date);
    existingSubject.attendance.push(Buffer.from(attendance, 'binary'));

    // Save the updated subject
    await existingSubject.save();

    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateAttendance };
