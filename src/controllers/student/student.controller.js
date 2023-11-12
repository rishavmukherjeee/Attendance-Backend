const { model } = require('mongoose');
const studentCollection = require('../../models/student');
const bcryptjs = require('bcryptjs');


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
        const { firstname, lastname, email, password } = req?.body;
        if(!firstname || !lastname || !email || !department || !semester || !section) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const Student = model(`stu.${department}.${semester}.${section}s`, studentCollection);
        
        let student = await Student.findOne({email});

        if(student) {
            return res.status(400).json({
                success: false,
                message: "Students already exist"
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        student = await Student.create({
            _id: "122",
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