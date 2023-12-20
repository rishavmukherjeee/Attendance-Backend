const { model } = require("mongoose")
const studentCollection = require("../models/student");
const Subject = require("../models/Subjects");

exports.getStudentModel = (department, semester, section) => {
    const student = model(`stu.${department}.${semester}.${section}s`, studentCollection);
    return student;
}

exports.getSubjectsModel = (department, semester, section) => {
    return model(`${department}.${semester}.${section}s`, Subject.schema);
}

exports.getStudentCollectionName = (department, semester, section) => {
    return `stu.${department}.${semester}.${section}s`;
}