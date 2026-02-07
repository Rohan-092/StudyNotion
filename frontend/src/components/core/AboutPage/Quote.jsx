import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = ()=>{
    return(
        <div className="flex flex-col items-center text-[32px] font-bold leading-10">
            <p>We are passionate about revolutionizing the way we learn. Our</p>
            <p>innovative platform
            <HighlightText text={" combines technology"} />
            {", "}
            <span className="text-yellow-300">expertise</span> 
            , and community</p> 
            <p>to create an <span className="text-yellow-300">unparalleled educational experience.</span></p>
        </div>
    )
}

export default Quote