const mongoose = require('mongoose')

const db = mongoose.connection;
const data = async (req, res) => {
    try {
        const { email,stream } = req.body;

        const teacherCollection = db.collection(stream);

        teacherCollection.findOne({ email: email }, (err, teacher) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
            } else if (teacher) {
                // Assuming these are defined somewhere
                res.status(200).json({
                    name: `${teacher.firstname} ${teacher.lastname}`,
                    designation: teacher.designation,
                    assignedSub: teacher.assignedSub
                });
            } else {
                res.status(400).json({ message: "Teacher not found" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { data }

