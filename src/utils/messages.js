const express = require('express');
const router = express.Router();
const mongoose=require("mongoose")
const Message= require("../models/message")
const messageModel = mongoose.model('Message', Message.schema, "messages");
router.get('/',(req,res)=>{
res.status(200).json("reached message roiute")
})
router.post('/send', async(req, res) => {
    const {_id,emailfrom ,emailto, message,status}=req.body;
    const newMessage = new messageModel({
      _id:_id,
      emailfrom:emailfrom,
      emailto:emailto,
      message:message,
      status:status
    });
    try{
    await newMessage.save();
    res.status(201).json("something")
    }
    catch(error){
      res.status(500).json({message:error.message})
    }


})
router.post('/receive', async (req, res) => {
  const { email } = req.body;
  
  try {
    const messages = await messageModel.find({ emailto: email });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports=router;