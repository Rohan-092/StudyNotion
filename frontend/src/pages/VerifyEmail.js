import React, { useEffect, useState } from "react"
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";

const VerifyEmail = ()=>{

    const {loading,signupData} = useSelector( (state)=> state.auth)

    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData){
            navigate("/signup");
        }
    },[])

    function handleOnSubmit(event){

        event.preventDefault();
        
        const {
            accountType, firstName, lastName, email, password, confirmPassword,
        } = signupData;
        
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return(
        <div className="max-w-maxContent h-screen mx-auto flex justify-center items-center">
            
                {
                    loading 
                    ? (<div className="spinner">Loading...</div>)
                    : (
                        <div className="text-white flex flex-col gap-3 w-[320px] h-[400px]"> 
                            <h1 className="text-2xl">Verify Email</h1>
                            <p className="text-richblack-300 text-sm">A verification code has been send to you. Ente the code below</p>
                            <form onSubmit={handleOnSubmit} className="mt-3 mb-2">
                                
                                <OTPInput

                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => <input {...props} placeholder="-" />}
                                    inputStyle={{
                                        background:"#161d29",
                                        hover:{border: "2px solid #cfab08"},
                                        borderRadius: "8px",
                                        width: "46px",
                                        height: "46px",
                                        fontSize: "16px",
                                        color: "#afb2bf",
                                        fontWeight: "400",
                                        caretColor: "blue",
                                        marginRight:"8px",
                                      }}                        
                                />
                                
                                <button type="submit"
                                className="rounded-md bg-yellow-50 text-black text-sm py-2 w-full mt-4"
                                >
                                    Verify Email
                                </button>
                            </form >
                            <div className="flex justify-between px-2">
                                <div>     
                                    <Link to={"/login"} className="flex items-center gap-2">
                                        <FaArrowDownLong className="rotate-90"/>
                                        <p className="text-sm">Back to Login</p>
                                    </Link> 
                                </div>
                                <button 
                                className="text-sm text-richblue-300"
                                onClick={() => dispatch(sendOtp(signupData.email))}>
                                    Resend it
                                </button>
                            </div>

                        </div>
                    ) 
                }
            
        </div>
    )
}

export default VerifyEmail