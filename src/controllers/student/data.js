const mongoose = require('mongoose')

const db = mongoose.connection;
const data =async(req,res)=>{
    const{ email ,stream}=req.body;
    
   const studentCollection =db.collection(`stu.${stream}`);
   

    studentCollection.findOne({email: email}, (err, student) => {
        if(err) throw err;
        if(student) res.status(200).json({name:student.firstname
            +" "+student.lastname,roll,weeklyremark})
        else res.status(400)})
}
module.exports ={data}
