const mongoose = require('mongoose')
const teacherCollection = require('../../models/teacher')


exports.getAllTeachers = async (req, res) => {
    try {
        const teacherModel = mongoose.model("it.teachers", teacherCollection)
        const teachers = await teacherModel.find({}).select('-password');
        res.status(200).json({
            success: true,
            message: "Teachers details fetched successfully",
            teachers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            teachers
        });        
    }
}