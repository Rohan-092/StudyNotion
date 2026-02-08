import React from "react";
import Template from "../components/core/Auth/Template";
import signupImg from '../assets/images/signup.webp';

const SignUp = () =>{
    return(
        <div className="text-white">
            <Template 
                title={"Join the millions learning to code with StudyNotion for free"}
                desc1={"Build skills today, tomorrow and beyond."}
                desc2={"Education to future proof your carrer."}
                formType={"signup"}
                image={signupImg}
            />
        </div>
    )
}

export default SignUp