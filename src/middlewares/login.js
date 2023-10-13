const express = require('express');

const router = express.Router();
const mongoose = require('mongoose')
const db = mongoose.connection;

router.post('/', (req, res) => {
   const {email, password}=req.body;
   const studentCollection =db.collection('stu.it.5.as');
   const teacherCollection =db.collection('it.teachers');
   
   studentCollection.findOne({email: email}, (err, student) => {
        if(err) throw err;
        if(student){
            // Compare password
            if(password === student.password) {
                res.status(200).json("student");
            } else {
                res.status(401).json("Invalid password");
            }
        } else {
            teacherCollection.findOne({email: email}, (err, teacher) => {
                if(err) throw err;
                if(teacher){
                    // Compare password
                    if(password === teacher.password) {
                        res.status(200).json("teacher");
                    } else {
                        res.status(401).json("Invalid password");
                    }
                } else{
                    res.status(404).json("User not found");
                }
            });
        }
    });
});

module.exports = router;
