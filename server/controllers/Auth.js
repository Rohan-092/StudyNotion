const User = require("../models/User");
const bcrypt = require('bcrypt');
const OTP = require("../models/OTP");
require('dotenv').config();
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const {passwordUpdated} = require("../mail/template/passwordUpdate")
const otpGenerator = require("otp-generator")
const otpTemplate = require('../mail/template/emailVerificationTemplate');

exports.sendOTP = async (req,res) =>{
    try{
        const {email} = req.body;
        console.log("1afterrmail")
        const userExist = await User.findOne({email});
        if(userExist){
            console.log("hello");
            return res.status(401).json({
                success:false,
                message:"user already registered"
            })
        }
        console.log("2afterrmail")
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated : ",otp);
    console.log("3afterrmail")
        let result = await OTP.findOne({otp:otp});
        console.log("4afterrmail")
        do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    } while (result);
console.log("5afterrmail")
        const otpPayload = {email,otp};
        
        // create an entry in db
        console.log("6afterrmail")
        const otpbody = await OTP.create(otpPayload);
        console.log(otpbody);
    console.log("beforemail")
        await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpTemplate(otp)
    );
    console.log("afterrmail")
        return res.status(200).json({
            success:true,
            message:"otp send successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            otp:otp
        })
    }
};

exports.isSignup = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp} = req.body;
        console.log(firstName,lastName,email,password, confirmPassword,accountType,otp);
        if(!firstName || !lastName|| !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"fill all details"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password are not match"
            })
        }
        console.log("hh");
        const existUser = await User.findOne({email});
        console.log("hhh");
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"user already registered",
            })
        }
        console.log("hhhh");
        //find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("hh");
        console.log(recentOtp);
        
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:'otp not found'
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:'otp invalid'
            })
        }

        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password"
            })
        };

        // Create the user
        //let approved = ""
        //approved === "Instructor" ? (approved = false) : (approved = true)

        const profileDetails = await Profile.create({
            gender:null, dateOfBirth:null, about:null, contactNumber:null
        });

        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            // approved: approved,
            password:hashedPassword,
            accountType:accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,    //use dicebear site for api
        });
        
        return res.status(200).json({
            success:true,
            message:"user registered successfully",
            user
        });
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"Error in Sign in"
        });
    }
}

exports.isLogin = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            console.log("hello")
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })
        }

        //user exist
        const user = await User.findOne({email}).populate("additionalDetails") ;
        if(!user){
            console.log("hello2")
            return res.status(400).json({
                success:false,
                message:"user not registered, please sign up"
            })
        }

        const payload = {
            email: user.email,
            id:user._id,
            role: user.accountType,
        }

        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(payload,process.env.JWT_SECRET,
                                    {
                                        expiresIn: '2h',
                                    })
            
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message: "Logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed , please try again"
        })
    }
};

exports.changePassword = async (req,res)=>{
    try{
        const {id} = req.user;
        const {newPassword,oldPassword} = req.body;

        if(!newPassword || !oldPassword ){
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })
        }

        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not exist"
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password)

        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res.status(401).json({ 
                success: false, 
                message: "The password is incorrect" 
            })
        }
        
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(newPassword,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"error in hashing password"
            })
        };

        const updatedUser = await User.findByIdAndUpdate({_id:id},{password:hashedPassword},{new:true})
                            .populate("additionalDetails")
                            .exec();
        console.log(updatedUser);

        try{
            await mailSender(updatedUser.email,"Password for your account has been updated",passwordUpdated(updatedUser.email,`Password updated successfully for ${updatedUser.firstName} ${updatedUser.lastName}`));
        }
        catch(error){
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res.status(200).json({
            success:true,
            message:"Password change successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while changing password",
            error:error.message
        })
    }
}




// exports.login = async (req, res) => {
//     try {
//       // Get email and password from request body
//       const { email, password } = req.body
  
//       // Check if email or password is missing
//       if (!email || !password) {
//         // Return 400 Bad Request status code with error message
//         return res.status(400).json({
//           success: false,
//           message: `Please Fill up All the Required Fields`,
//         })
//       }
  
//       // Find user with provided email
//       const user = await User.findOne({ email }).populate("additionalDetails")
  
//       // If user not found with provided email
//       if (!user) {
//         // Return 401 Unauthorized status code with error message
//         return res.status(401).json({
//           success: false,
//           message: `User is not Registered with Us Please SignUp to Continue`,
//         })
//       }
  
//       // Generate JWT token and Compare Password
//       if (await bcrypt.compare(password, user.password)) {
//         const token = jwt.sign(
//           { email: user.email, id: user._id, role: user.role },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "24h",
//           }
//         )
  
//         // Save token to user document in database
//         user.token = token
//         user.password = undefined
//         // Set cookie for token and return success response
//         const options = {
//           expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//           httpOnly: true,
//         }
//         res.cookie("token", token, options).status(200).json({
//           success: true,
//           token,
//           user,
//           message: `User Login Successfull`,
//         })
//       } else {
//         return res.status(401).json({
//           success: false,
//           message: `Password is incorrect`,
//         })
//       }
//     } catch (error) {
//       console.error(error)
//       // Return 500 Internal Server Error status code with error message
//       return res.status(500).json({
//         success: false,
//         message: `Login Failure Please Try Again`,
//       })
//     }
//   }
