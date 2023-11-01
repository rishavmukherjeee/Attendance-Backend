const { model } = require('mongoose');
const studentCollection = require('../../models/student');


exports.getAllStudentOfSemsterAndSection = async (req, res) => {
    try {
        const { semester, section } = req?.params;
        const Student = model(`stu.it.${semester}.${section}s`, studentCollection);
        const student = await Student.find({}).select('-password');
        if(!student) {
            return res.status(400).json({
                success: false,
                message: "Students not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Students details fetched successfully",
            student
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });        
    }
}