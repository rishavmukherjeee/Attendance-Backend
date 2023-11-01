const mongoose = require('mongoose')
const teacherCollection = require('../../models/teacher')
const bcryptjs = require('bcryptjs')


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

exports.onRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password, designation } = req?.body;

        if(!firstname || !lastname || !email || !password || !designation) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        const teacherModel = mongoose.model('it.teachers', teacherCollection);
        let teacher = await teacherModel.findOne({email});
        
        if(teacher) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            });            
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        teacher = await teacherModel.create({
            _id: email,
            firstname,
            lastname,
            email,
            password: hashPassword,
            designation: designation || "Faculty"
        });

        teacher.password = undefined

        res.status(200).json({
            success: true,
            message: "Teacher details created successfully",
            teacher
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });        
    }
}