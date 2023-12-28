const mongoose = require('mongoose');
const db = mongoose.connection;

const getRollAttendance = async (req, res) => {
  const rollNumber = parseInt(req.params.rollNumber);
  const collection = req.params.stream;
  
  
  console.log(`Fetching attendance for roll number ${rollNumber} from collection ${collection}`);

  try {
    // Find all documents in MongoDB that have the specified roll number
    const cursor = db.collection(collection).find({ roll: rollNumber });

    // Convert the cursor to an array of documents
    const results = await cursor.toArray();

    console.log(`Found ${results.length} document(s) with roll number ${rollNumber}`);

    if (results.length > 0) {
      const rollAttendance = results.map(result => {
        const rollIndex = result.roll.indexOf(rollNumber);
       
        return result.date.map((date, index) => {
            console.log(`date ${date}   roll ${rollNumber}  _id ${result._id}:`,result.attendance[index]
            );
            

        });
      }).flat();
      
      res.json(results.map(result => {
        const rollIndex = result.roll.indexOf(rollNumber);
       
        return result.date.map((date, index) => {
            console.log(`date ${date}   roll ${rollNumber}  _id ${result._id}:`,result.attendance[index]
            );
            return {
                _id: result._id,
              date,
              attendance: result.attendance[index]
            };
        });
      }).flat());
    } else {
      console.log(`No documents found with roll number ${rollNumber}`);
      res.status(404).json({ error: "Roll number not found in any document" });
    }
  } catch (error) {
    console.error('Error querying MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getRollAttendance };
