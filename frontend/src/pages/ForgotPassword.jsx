import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FaArrowDownLong } from "react-icons/fa6";

const ForgotPassword = () =>{

    const [emailSent,setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

    return(
        <div>
            <div className="max-w-maxContent h-screen mx-auto flex justify-center items-center">
                {
                    loading ? (
                        <div className="spinner"></div>
                    ):(
                        <div className="text-white flex flex-col gap-3 w-[320px] h-[400px]">
                            <h1 className="text-2xl">
                                {
                                    emailSent ? "Check Your Email" : "Reset your password"
                                }
                            </h1>

                            <p className="text-richblack-300 text-sm mb-3">
                                {
                                    emailSent ? `We have sent the reset email to ${email}`
                                    : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                }
                            </p>

                            <form>
                                {
                                    !emailSent &&  (
                                        <label>
                                            <p className="text-[11px] text-richblack-300 mb-1">Email Address <span className="text-[#ce3b59]">*</span></p>
                                            <input
                                                className="bg-richblack-800 text-richblack-50 text-[13px] h-[40px] p-2 w-full px-2 mb-4 rounded-md"
                                                required
                                                type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter Email Address"
                                            />
                                        </label>
                                    )
                                }
                            </form>
                            
                            <button 
                            className="rounded-md bg-yellow-50 text-black text-sm  py-2 mb-3"
                            onClick={handleOnSubmit}>
                                {
                                    emailSent ? "Reset Email" : "Reset Password"
                                }
                            </button>

                            <div>
                                <Link to={"/login"} className="flex items-center gap-2 px-3">
                                    <FaArrowDownLong className="rotate-90"/>
                                    <p className="text-sm">Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    )
                 }
            </div>
        </div>
    )
}

export default ForgotPassword