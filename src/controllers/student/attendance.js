const mongoose = require('mongoose');
const db = mongoose.connection;

const getRollAttendance = async (req, res) => {
  const rollNumber = parseInt(req.params.rollNumber);
  const collection = req.params.stream;

  try {
    const cursor = db.collection(collection).find({ roll: rollNumber });
    const results = await cursor.toArray();

    if (results.length > 0) {
      res.json(results.map(result => {
        return result.date.map((date, index) => {
            return {
                _id: result._id,
              date,
              attendance: result.attendance[index]
            };
        });
      }).flat());
    } else {
      res.status(404).json({ error: "Roll number not found in any document" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getRollAttendance };
