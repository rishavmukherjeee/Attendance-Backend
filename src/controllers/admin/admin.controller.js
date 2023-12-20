const Admin = require('../../models/admin.js');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');
const { model } = require('mongoose');
const Subject = require('../../models/Subjects.js');

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

exports.generateReport = async (req, res) => {
    try {
        const att = model('it.5.as', Subject.schema);
        const a1 = await att.find({});
        const tt = a1[0].attendance.map(e=>{
            // console.log(e);
            return e.map(e1=>e1.valueOf());
        })
        console.log(tt.at(0).buffer.slice)
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
        })
    }
}
