const xlsx = require('xlsx')
const fs = require('fs')
const mongoose = require('mongoose')
const studentCollection = require('../../models/student')

exports.importStudents = async (req, res) => {
    const { collectionName } = req.body
    try {        
        let wb = xlsx.readFile(req.file.path)
        let excelData = wb.Sheets['Sheet1']
        let ans = xlsx.utils.sheet_to_json(excelData)

        let userDate = ans.map((obj, i) => {
            return {
                _id: i,
                firstname: obj['First Name [Required]'],
                lastname: obj['Last Name [Required]'],
                email: obj['Email Address [Required]'],
                password: obj['Password [Required]']
            }
        })

        const studentModel = mongoose.model(collectionName, studentCollection)

        const result = await studentModel.insertMany(userDate)

        fs.unlinkSync(req.file.path);

        res.status(200).json({success: true, msg: 'Excel file imported'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}