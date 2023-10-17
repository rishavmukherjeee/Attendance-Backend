const mongoose = require('mongoose')

const db = mongoose.connection;
const data =async(req,res)=>{
    const{ email}=req.body;
    
   const teacherCollection =db.collection('it.teachers');
   

    teacherCollection.findOne({email: email}, (err, teacher) => {
        if(err) throw err;
        if(teacher) res.status(200).json({name:teacher.firstname
            +" "+teacher.lastname,designation,assignedSub})
        else res.status(400)})
}
module.exports ={data}
