const mongoose = require("mongoose");

const teacherCollection = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    designation:{
      type: String
    },
    assignedSub:{
      type:[String]
    }
  },
);

module.exports = teacherCollection;
