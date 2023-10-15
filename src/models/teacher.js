const mongoose = require("mongoose");

const studentCollection = new mongoose.Schema(
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
    role:{
        type:String,
    },
    assignedsub:{
        type:[String],
    }
  },
);

module.exports = studentCollection;
