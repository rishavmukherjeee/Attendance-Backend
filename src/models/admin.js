const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
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
  designation: {
    type: String,
  }
});

module.exports = model("Admin", adminSchema);