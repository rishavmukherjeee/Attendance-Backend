const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    Student:
 *      type: object
 *      required:
 *        - _id
 *        - firstname
 *        - lastname
 *        - email
 *        - password
 *      properties:
 *        _id: 
 *            type: string
 *            description: Required
 *        firstname: 
 *            type: string
 *            description: Required
 *        lastname: 
 *            type: string
 *            description: Required
 *        email: 
 *            type: string
 *            description: Required
 *        password: 
 *            type: string
 *            description: Required
 *        stream: 
 *            type: string
 *            description: Required
 *        stujects: 
 *            type: Array
 *            description: This is a array of subject papercode
 *        weeklyremark: 
 *            type: Array
 *            description: This is a array of string
 */
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
