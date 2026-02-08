import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword =  ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {loading} = useSelector((state)=> state.auth);

    const [formData,setFormData] = useState({
        Password:"", confirmPassword:""
    })

    const {Password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(Password,confirmPassword,token,navigate));
    }

    return(
        <div className="max-w-maxContent mx-auto flex justify-center items-center p-2 mt-20">   
            {
                loading ? (
                    <div className="spinner">Loading...</div>
                ):(
                    <div  className="text-white flex flex-col gap-3 w-[320px] h-[400px]">
                        <h1 className="text-2xl">Choose new password</h1>
                        <p className="text-richblack-300 text-sm">Almost done. Enter your new password and you are all set</p>
                        <form onSubmit={handleOnSubmit} className="mt-3 mb-2">
                            <label>
                                <p className="text-[15px] mb-1">New password <sup>*</sup></p>
                                <input
                                    className="bg-richblack-800 text-richblack-50 text-[13px] h-[40px] p-2 w-full px-2 mb-4 rounded-md"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="Password"
                                    value={Password}
                                    onChange={handleOnChange}
                                />
                            </label>
                            <label>
                                <p className="text-[15px] mb-1">Confirm new password <sup>*</sup></p>
                                <input
                                    className="bg-richblack-800 text-richblack-50 text-[13px] h-[40px] p-2 w-full px-2 mb-4 rounded-md"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                />
                            </label>
                            <button className="rounded-md bg-yellow-50 text-black text-sm py-2 w-full mt-4">
                                Reset Password
                            </button>
                            <div className="mt-4">
                                <Link to={"/"}>
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </div>
                )
            }    
        </div>
    )
}

export default UpdatePassword




