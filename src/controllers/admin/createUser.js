const xlsx = require('xlsx')
const fs = require('fs')
const mongoose = require('mongoose')
const studentCollection = require('../../models/student')

exports.importStudents = async (req, res) => {
    // const {} = req.body

    try {
        const filePath = __dirname + '\\..\\..\\..\\public\\uploads\\test.xlsx';
        let wb = xlsx.readFile(filePath)
        let excelData = wb.Sheets['ALL NEW USER']
        let ans = xlsx.utils.sheet_to_json(excelData)
        console.log(ans)

        let userDate = ans.map((obj, i) => {
            return {
                _id: i,
                firstname: obj['First Name [Required]'],
                lastname: obj['Last Name [Required]'],
                email: obj['Email Address [Required]'],
                password: obj['Password [Required]']
            }
        })

        const studentModel = mongoose.model('stu-it-5-aaas', studentCollection)

        const result = await studentModel.insertMany(userDate)

        console.log(result)
        fs.unlinkSync(filePath);
        res.status(200).json({success: true, msg: 'Excel file imported'})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: 'Internal server error'})
    }
}