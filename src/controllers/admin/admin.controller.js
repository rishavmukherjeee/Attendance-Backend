const Admin = require('../../models/admin.js');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

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
            httpOnly: true,
            path: '/',
            expires: new Date(Date.now() + 24*3600*1000),            
            sameSite: "lax",
        })

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
        res.cookie("token", null, {
            path: '/',
            httpOnly: true,
            expires: 0,            
            sameSite: "lax",
        });
        
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
