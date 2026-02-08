import React from "react"
import Instructor from "../../../assets/images/Instructor.png"
import HighlightText from "./HighlightText"
import CTAButton from "./CTAButton"
import { FaArrowRight } from "react-icons/fa";


const InstructorSection = ()=>{
    return(
        <div className="mt-16">
            <div className="flex flex-row gap-20 items-center">

                <div className="w-[50%]">
                    <img
                        className="shadow-white"
                        src={Instructor}
                        alt=""
                    />
                </div>

                <div className="w-[50%] flex flex-col gap-10">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an <HighlightText text={"Instructor"} />
                    </div>
                    <p className="text-richblack-300 font-medium text-[16px]">
                        instructors from around the world 
                        teach millions of students on StudyNotion. We provide the tools and skills to teach what
                        you love.
                    </p>
                    <CTAButton active={true} linkto={"/signup"}> 
                        <div className="flex gap-4 items-center">
                            <p>Start Teaching today</p>
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default InstructorSection