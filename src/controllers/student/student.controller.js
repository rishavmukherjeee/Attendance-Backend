const { model } = require('mongoose');
const studentCollection = require('../../models/student');
const bcryptjs = require('bcryptjs');
const { getStudentModel } = require('../../utils/models');


exports.getAllStudentOfSemsterAndSection = async (req, res) => {
    try {
        const { department, semester, section } = req?.params;
        if(!department || !semester || !section) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const Student = model(`stu.${department}.${semester}.${section}s`, studentCollection);

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

exports.registerStudent = async (req, res) => {
    try {
        const { department, semester, section } = req?.params;
        const { firstname, lastname, email, password, id, mobile } = req?.body;
        if(!firstname || !lastname || !email || !department || !semester || !section) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const Student = getStudentModel(department, semester, section);
        
        let student = await Student.findById(id);

        if(student) {
            return res.status(400).json({
                success: false,
                message: "Students already exist"
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        student = await Student.create({
            _id: id,
            firstname,
            lastname,
            email,
            password: hashPassword,
            stream: department            
        });

        student.password = undefined;

        res.status(200).json({
            success: true,
            message: "Student registered successfully",
            student,
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });        
    }

}

exports.deleteStudent = async (req, res) => {
    try {
        const { id, department, semester, section } = req?.params;
        console.log(req?.params)
        if(!id || !department || !semester || !section){
            return res.status(400).json({
                success: false,
                message: "All details are reqired"
            });
        }
        
        const student = await getStudentModel(department, semester, section).findById(id);

        if(!student){
            return res.status(400).json({
                success: false,
                message: "Student not found"
            });
        }
        
        await getStudentModel(department, semester, section).findByIdAndDelete(id);
        
        return res.status(200).json({
            success: true,
            message: "Student details deleted successfully"
        });
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}