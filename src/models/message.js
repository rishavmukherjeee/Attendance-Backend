const mongoose = require("mongoose");

const messageSchema= new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    emailfrom: {
      type: String,
    },
    emailto: {
      type: String,
    },
    message: {
      type: String,
    },
   status:{
    type: Number,
   },
  },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;