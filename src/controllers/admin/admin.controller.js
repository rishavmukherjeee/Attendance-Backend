const Admin = require('../../models/admin.js');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const { model } = require('mongoose');
const Subject = require('../../models/Subjects.js');
const { getSubjectsCollectionName, getSubjectsModel } = require('../../utils/models.js');

exports.onRegister = async (req, res) => {
    try {
        const { teacherId, firstname, lastname, email, password, designation } = req.body;
        
        if(!teacherId || !firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        let admin = await Admin.findOne({email});
        
        if(admin) {
            return res.status(403).json({
                success: false,
                message: "Admin already exist"
            });           
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        
        admin = await Admin.create({
            _id: teacherId,
            firstname, 
            lastname,
            email,
            password: hashPassword,
            designation: designation || "SUPER-ADMIN"
        })
        
        if(!admin) {
            return res.status(500).json({
                success: false,
                message: "Admin creation failed, please try again..."
            });            
        }
        
        return res.status(200).json({
            success: true,
            message: "Admin created successfully"
        });            
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });        
    }
}

exports.onLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const admin = await Admin.findOne({email});
        if(!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin user not found"
            });            
        }
        
        if(!(await bcryptjs.compare(password, admin.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = await jwt.sign({
            id : admin._id,
            role: "ADMIN"
        }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });

        admin.password = undefined

        res.status(200).json({
            success:true,
            message: "Admin user login successful",
            data: admin
        })            
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })        
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const admin = await Admin.findById(id).select('-password');
        if(!admin) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Admin details fetched successfully",
            user: admin
        })
    } catch (error) {
        // console.log(error)
        res.status(200).json({
            success: true,
            message: "Internal server error",
        });        
    }
}

exports.onLogout = async (req, res) => {    
    try {
        res.clearCookie('token');
        
        res.status(200).json({
            success: true,
            message: "Admin logout successful"
        })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.createSubjectAdmin = async (req, res) => {
    try {
        const { department, semester, section, paper_code, paper_name } = req?.body;

        if(!department || !semester || !section || !paper_code || !paper_name){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const Subject = getSubjectsModel(department, semester, section);

        const subject = await Subject.findById(paper_code);

        if(subject){
            return res.status(400).json({
                success: false,
                message: 'Subject already exist.'
            });
        }

        const createSubject = await Subject.create({
            _id: paper_code.toUpperCase(),
            sem: semester,
            subject: paper_name.toUpperCase(),
        });
        
        return res.status(200).json({
            success: true,
            message: 'Subject created successfully',
            subject: createSubject,
        })
    } catch (error) {
        console.log(error)        
        return res.status(500).json({
            success: false,
        })
    }
}

exports.generateReport = async (req, res) => {
    try {
        const {  } = req?.body;
        
        let department = 'it', semester = '5', section = 'a';

        const att = model(getSubjectsCollectionName(department, semester, section), Subject.schema);



        const a1 = await att.find({});

        console.log(a1.at(7));

        const tt = a1[7].attendance;

        const noOfStu = a1.at(7).roll.length;
        const noOfAtt = tt.length;

        let cnt = 0;
        
        for(let j = 0; j<noOfAtt; j++){
            for(let i = 0; i<noOfStu; i++){
                console.log(a1.at(7).attendance.at(j).at(i));
            }
        }

            console.log(cnt);

        res.status(200).json({
            success: true,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
        })
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        // id -> paper code
        const { department, semester, section, id } = req?.params;

        if(!department || !semester || !section || !id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        const Subject = getSubjectsModel(department, semester, section);

        const subject = await Subject.findById(id);

        if(!subject){
            return res.status(400).json({
                success: false,
                message: 'Subject does not exist.'
            });
        }

        await Subject.findByIdAndDelete(id);        
        
        return res.status(200).json({
            success: true,
            message: 'Subject deleted successfully',
        });
        
    } catch (error) {
        console.log(error)        
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });

    }
}
