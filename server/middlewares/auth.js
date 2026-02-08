const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next)=>{
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(500).json({
                success:false,
                message:"token id missing"
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token invalid"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong, while validating token"
        })
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for students"
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}

//isAdmin
exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:`this is a protected route for Admin user accountType is ${req.user.accountType}`
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}

//id Instructor
exports.isInstructor = (req,res,next)=>{
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for Instructor"
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}