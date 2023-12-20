const express = require('express');

const router = express.Router();
const mongoose = require('mongoose')
const db = mongoose.connection;
const bcryptjs = require('bcryptjs');

router.post('/', (req, res) => {
   const {email, password,stream }=req.body;
   /*const studentCollection =db.collection('stu.it.5.as');
   const teacherCollection =db.collection('it.teachers');
   */
  
   const Collection =db.collection(stream);
   
   
   Collection.findOne({email: email}, async (err, found) => {
        if(err) throw err;
        if(found){
            // Compare password
            // if(password === found.password) {
            if(await (bcryptjs.compareSync(password, found.password))) {
                res.status(200).json("Yes");
            } else {
                res.status(401).json("Invalid Password");
            }}
         else{
                res.status(404).json("User not found");
            
        }
    }
    )
});
//Hardddddcodeddddd
router.post('/data',(req,res)=>{
    const{ email}=req.body;
    
   const studentCollection =db.collection('stu.it.5.as');
   const teacherCollection =db.collection('it.teachers');
   
   studentCollection.findOne({email: email}, (err, student) => {
    if(err) throw err;
    if(student) res.status(200).json({name:student.firstname+" "+student.lastname})
    else res.status(400)})

    teacherCollection.findOne({email: email}, (err, teacher) => {
        if(err) throw err;
        if(teacher) res.status(200).json({name:teacher.firstname+" "+teacher.lastname})
        else res.status(400)})
})
module.exports = router;
