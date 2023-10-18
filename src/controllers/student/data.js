const mongoose = require('mongoose')

const db = mongoose.connection;
const data =async(req,res)=>{
    try{
            const{ email ,stream}=req.body;
            
            const studentCollection =db.collection(stream);
        

            studentCollection.findOne({email: email}, (err, student) => {
                if(err){
                    res.status(500).json("Internal Server Error")
                }
                else if(student) res.status(200).json({
                    name:student.firstname +" "+student.lastname,
                    roll:student._id,
                    weeklyremark:student.weeklyremark
                })
                else res.status(400).json("Student Not found")
            })
    }
    catch(err){
        res.status(500).json(err)
    }
}
module.exports ={data}
/*const mongoose = require('mongoose')

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

*/