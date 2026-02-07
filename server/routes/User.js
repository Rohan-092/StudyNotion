const express = require('express');
const router = express.Router();

const {isSignup,isLogin,changePassword,sendOTP} = require('../controllers/Auth');
const {resetPassword,resetPasswordToken} = require('../controllers/ResetPassword');
const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');


router.post("/signup",isSignup);
router.post("/login",isLogin);
router.post("/sendOTP",sendOTP);
router.put("/changePassword",auth,changePassword);

router.post("/resetPassword",resetPassword);
router.post("/resetPasswordToken",resetPasswordToken);

module.exports = router