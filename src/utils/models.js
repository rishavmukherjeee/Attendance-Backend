const { model } = require("mongoose")
const studentCollection = require("../models/student");
const Subject = require("../models/Subjects");

exports.getStudentModel = (department, semester, section) => {
    return model(`stu.${department}.${semester}.${section}s`, studentCollection);
}

exports.getStudentCollectionName = (department, semester, section) => {
    return `stu.${department}.${semester}.${section}s`;
}

exports.getSubjectsModel = (department, semester, section) => {
    return model(`${department}.${semester}.${section}s`, Subject.schema);
}

exports.getSubjectsCollectionName = (department, semester, section) => {
    return `${department}.${semester}.${section}s`;
}
