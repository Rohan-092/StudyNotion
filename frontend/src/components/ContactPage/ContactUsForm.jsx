import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../services/apiconnector";
import Countrycode from "../../data/countrycode.json";
import {contactusEndpoint} from "../../services/api";
import { toast } from "react-hot-toast"

const ContactUsForm = ()=>{

    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const submitContactForm = async (data) =>{
        console.log("Login Data", data);
        setLoading(true);
        try{
            const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API, data);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // const response = {status:"OK"};
            console.log("Logging Response: ",response);
            toast.success("Send Message Successfully")
            reset({
                firstname:"",
                lastname:"",
                email:"",
                phoneNo:"",
                message:"",
                countrycode:""
            })
        }
        catch(error){
            console.log("error: ", error.message);
            toast.error("Failed to send message")
        }
        setLoading(false);
    }

    return(
        <>
        {loading ? (<div className="text-center text-white text-4xl">Loading...</div>) : (
        <form 
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
                <div className="flex flex-col gap-5 lg:flex-row">

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                name="firstname"
                                id="firstname"
                                className="form-style"
                                {...register("firstname", {required:true})}
                            />
                        
                            {
                                errors.firstname && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your name
                                    </span>
                                )
                            }
                    </div> 

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                name="lastname"
                                id="lastname"
                                className="form-style"
                                {...register("lastname")}
                            />
                    </div> 
                     
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        className="form-style"
                        {...register("email", {required:true})}
                    />
                        {
                            errors.email && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your email
                                </span>
                            )
                        }
                </div>   
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="phonenumber">
                        Phone Number
                    </label>

                    <div className="flex gap-5">

                        <div className="flex w-[81px] flex-col gap-2">
                            <select
                                name="dropdown"
                                id="dropdown"
                                className="form-style"
                                {...register("countrycode", { required: true })}
                            >
                                {
                                    Countrycode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.code}>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            <input 
                                type="tel"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="1234567890"
                                className="form-style"
                                {...register("phoneNo", 
                                    {
                                        required: {
                                            value: true,
                                            message: "Please Enter Your Phone Number.",
                                        },
                                        maxLength: { value: 12, message: "Invalid Phone Number"},
                                        minLength: { value: 10, message: "Invalid Phone Number"},
                                    })
                                }
                            />
                        </div>
                        
                    </div>

                    {errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        cols="35"
                        rows="5"
                        placeholder="Enter your message here"
                        className="form-style"
                        {...register("message", {required:true})}
                    />
                        {
                            errors.message && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your message
                                </span>
                            )
                        }
                </div>

                <button type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                    ${
                        !loading && 
                        "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    } disabled:bg-richblack-500 sm:text-[16px] `}
                > 
                    Send Message
                </button>
        </form>
        )}
        </>
    )
}

export default ContactUsForm