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
    roll:{
      type:Number
    },
    weeklyremark:{
      type:[String]
    }
  },
  
);

module.exports = studentCollection;
