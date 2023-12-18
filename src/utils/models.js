const { model } = require("mongoose")
const studentCollection = require("../models/student")

exports.getStudentModel = (department, semester, section) => {
    const student = model(`stu.${department}.${semester}.${section}s`, studentCollection);
    return student;
}

exports.getStudentCollectionName = (department, semester, section) => {
    return `stu.${department}.${semester}.${section}s`;
}