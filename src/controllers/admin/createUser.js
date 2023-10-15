const xlsx = require('xlsx')
const fs = require('fs')
const mongoose = require('mongoose')
const studentCollection = require('../../models/student')
const os = require('os')

exports.importStudents = async (req, res) => {

    try {
        let filePath = __dirname
        if(os.type().toLowerCase().includes('windows')) {
            filePath += '\\..\\..\\..\\';
        } else {
            filePath += '/../../../';
        }
        filePath += req.file.path;
        
        let wb = xlsx.readFile(filePath)
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

        const studentModel = mongoose.model('stu-it-5-aaaasaaas', studentCollection)

        const result = await studentModel.insertMany(userDate)

        fs.unlinkSync(filePath);

        res.status(200).json({success: true, msg: 'Excel file imported'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}