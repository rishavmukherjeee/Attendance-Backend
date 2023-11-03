const mongoose = require("mongoose");

const messageSchema= new mongoose.Schema(
  {
    
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