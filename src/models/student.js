const mongoose = require("mongoose");

const studentCollection = new mongoose.Schema(
  {
    _id: {
      type: Number,
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
    stream:{
      type:String,
    },
    subjects: {
      type: [String],
    },
    weeklyremark:{
      type:[String],
    }
  },
  
);

module.exports = studentCollection;
