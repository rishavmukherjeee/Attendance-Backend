const Subject = require('../../models/Subjects');
const mongoose = require('mongoose');

const showAll = async (req, res) => {
  try {
    const { stream, _id, roll } = req.body;

    const subjectModel = mongoose.model('Subject', Subject.schema, stream);

    const existingSubject = await subjectModel.findById(_id);

    if (!existingSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    const index = existingSubject.roll.indexOf(roll);

    if (index === -1) {
      return res.status(404).json({ message: 'Roll not found in subject' });
    }

    const attendance = existingSubject.attendance.map(item => item[index]);
    const date= existingSubject.date.map(item=>item)
    res.status(200).json({ attendance ,date });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { showAll };
