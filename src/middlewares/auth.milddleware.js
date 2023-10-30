const jwt = require('jsonwebtoken')

exports.validateUser = async (req, res, next) => {
    try {
        const cookie = req?.headers?.cookie;
        const token = cookie?.split('=')[1];
        console.log(token);    
        if(!token) {
            return res.status(403).json({
                success: false,
                message: "Unauthenticated please log in"
            });
        }
        req.user = await jwt.verify(token, process.env.JWT_SECRET); 
        next()
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: false,
            message: "Something wents wrong"
        })
    }
}