const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    semester: {
        type: Number,
        default: 8,
    },
    section: {
        type: [Number],
        default: [1,1,1,1,1,1,1,1],
    },
});

// Create the GlobalData model
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
