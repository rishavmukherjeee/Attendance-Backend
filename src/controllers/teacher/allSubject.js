const Subject = require('../../models/Subjects');
const mongoose = require('mongoose');

const showAllIds = async (req, res) => {
  try {
    const { stream } = req.body;

    const subjectModel = mongoose.model(stream, Subject.schema);

    const subjects = await subjectModel.find({}, '_id'); // Removed the 'sem' filter

    const ids = subjects.map(subject => subject._id);

    res.status(200).json(ids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { showAllIds };
