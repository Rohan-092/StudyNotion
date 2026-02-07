const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/template/emailVerificationTemplate');

const OTPSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(), 
        expires:5*60,
    },
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification email from StudyNotation",otpTemplate(otp));
        console.log("email sent successfully",mailResponse);
    }
    catch(error){
        console.log("error occured while sending email",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);