import { NextFunction, Request, Response } from "express";
import  {Email,Message,IMessage, IEmail,Attachment,IAttachment } from "../../models/messages.model";
import AppError from "../../utils/app-error";

  const sendEmail = async (req, res, next) => {
    try {
      const attachmentIds = [];
      if (attachmentIds.length>0){
      for (let i = 0; i < req.files.length; i++) {
        const newAttachment = new Attachment({
          filename: req.files[i].filename,
          path: req.files[i].path,
          size: req.files[i].size,
          uploadDate: new Date()
        });
  
        await newAttachment.save();
  
        attachmentIds.push(newAttachment._id);
      }
    }
    var newEmail
    if (attachmentIds.length>0){
        newEmail = new Email({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        isDelivered: false,
        isRead: false,
        isSent: true,
        cc: req.body.cc,
        bcc: req.body.bcc,
        attachments: attachmentIds
      });
    }
    else{
        newEmail = new Email({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        isDelivered: false,
        isRead: false,
        isSent: true,
        cc: req.body.cc,
        bcc: req.body.bcc,
        
      });
    }
  
      await newEmail.save();
  
      res.status(200).send('Email sent with attachments!');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

const updateEmail = async (req, res, next) => {
  try {
    const {id}=req.params;
    const {isDelivered,isRead}=req.body;
    const email = await Email
    .findById
    (id);
    if (!email) {
      return next(new AppError('Email not found', 404));
    }
    email.isDelivered=isDelivered;
    email.isRead=isRead;
    await email.save();
    res.status(200).send('Email updated!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

  const getEmails = async (req, res, next) => {
    try {
      const {id}=req.params;
      const emails = await Email.findById(id).populate('attachments');
  
      res.status(200).send(emails);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const sendMessages = async (req, res, next) => {
    try {
      const attachmentIds = [];
  
      for (let i = 0; i < req.files.length; i++) {
        const newAttachment = new Attachment({
          filename: req.files[i].filename,
          path: req.files[i].path,
          size: req.files[i].size,
          uploadDate: new Date()
        });
  
        await newAttachment.save();
  
        attachmentIds.push(newAttachment._id);
      }
  
      const newMessage = new Message({
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message,
        isDelivered: false,
        isRead: false,
        isSent: true,
        cc: req.body.cc,
        bcc: req.body.bcc,
        attachments: attachmentIds
      });
  
      await newMessage.save();
  
      res.status(200).send('Message sent with attachments!');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  const updateMessage = async (req, res, next) => {
    try {
      const {id}=req.params;
      const {isDelivered,isRead}=req.body;
      const message = await Message
      .findById
      (id);
      if (!message) {
        return next(new AppError('Message not found', 404));
      }
      message.isDelivered=isDelivered;
      message.isRead=isRead;
      await message.save();
      res.status(200).send('Message updated!');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

const getMessages = async (req, res, next) => {
  try {
    const {id}=req.params;
    const messages = await
    Message.findById(id).populate('attachments');
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};



  export {
    sendEmail
    ,updateEmail
    ,getEmails
    ,sendMessages
    ,updateMessage
    ,getMessages
  }