import React from "react";
import Template from "../components/core/Auth/Template";
import loginImg from "../assets/images/login.webp";

const Login = () =>{
    return(
        <div>
            <Template 
                title={"Welcome Back"}
                desc1={"Build skills today, tomorrow and beyond."}
                desc2={"Education to future proof your carrer."}
                formType={"login"}
                image={loginImg}
            />
        </div>
    )
}

export default Login