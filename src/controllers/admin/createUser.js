const xlsx = require('xlsx')
const fs = require('fs')
const { getStudentModel, getStudentCollectionName } = require('../../utils/models')
const { SheetName, FirstName, LastName, Email, Password, Id } = require('../../utils/constants')
const { connection } = require('mongoose')
const bcryptjs = require('bcryptjs')

exports.importStudents = async (req, res) => {
    try {        
        const { department, semester, section } = req?.body
        console.log(req?.body);

        if(!department || !semester || !section){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        const Student = getStudentModel(department, semester, section);

        await Student.deleteMany({});

        let wb = xlsx.readFile(req.file.path)
        let excelData = wb.Sheets[SheetName]
        let students = xlsx.utils.sheet_to_json(excelData)

        let studentData = students.map( async (student) => {
            const hashPassword = bcryptjs.hashSync(student[Password], 10);
            
            try {
                await Student.create({
                    _id: student[Id],
                    firstname: student[FirstName],
                    lastname: student[LastName],
                    email: student[Email],
                    password: hashPassword
                });                
            } catch (error) {
                console.log(error);
            }
        });

        fs.unlinkSync(req.file.path);
        
        res.status(200).json({success: true, message: 'Excel file imported'});

    } catch (error) {
        fs.unlinkSync(req.file.path);
        console.log(error)
        res.status(500).json({success: false, message: 'Internal server error'})
    }
}