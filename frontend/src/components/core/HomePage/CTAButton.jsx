import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({children,active,linkto})=>{
    return(
        <Link to={linkto}>
            <button className={`px-5 py-2.5 text-center font-bold rounded-md ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
                {children}
            </button>
        </Link>
    )
}

export default CTAButton