const User = require("../models/User");
const mailSender = require("../utils/mailSender");
// const { response } = require('express');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{ 
    try{
        //get email
        const {email} = req.body;
        //validate
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"your email is not registered"
            })
        }
        
        //generate token
        const token = crypto.randomBytes(20).toString("hex");
    
        //update user by token and expiration timed
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires: Date.now()+ 5*60*1000,
                                            }, {new:true});

        //create url
        const url = `http://localhost:3000/updatePassword/${token}`;

        // send email containing the url
        try{
            await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`);
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"email not sent"
            })
        }
        
        return res.status(200).json({
            suddess:true,
            message:"email sent successfully, please check email and change pwd"
        })

        }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong, while generate reset password token"
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        let { password, confirmPassword, token } = req.body;

        if (!password ||  !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password not matching"
            });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password not matching"
            });
        }
        
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }
        
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token is expired, please regenerate token"
            });
        }
        
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(confirmPassword, 10);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }
        

        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );
        
        return res.status(200).json({
            success: true,
            message: "Reset password successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password"
        });
    }
};