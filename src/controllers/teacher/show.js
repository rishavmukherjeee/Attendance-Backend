const Subject = require('../../models/Subjects');
const mongoose = require('mongoose');

const showAll = async (req, res) => {
  try {
    const { stream, _id,  } = req.body;

    const subjectModel = mongoose.model('Subject', Subject.schema, stream);

    const existingSubject = await subjectModel.findById(_id);

    if (!existingSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    else{
        console.log(existingSubject);
    }


    res.json(existingSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { showAll};
