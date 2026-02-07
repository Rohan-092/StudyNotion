import React from "react"
import HighlightText from "./HighlightText"
import know_your_progress from "../../../assets/images/Know_your_progress.png"
import compare_with_others from "../../../assets/images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/images/Plan_your_lessons.png"
import CTAButton from "./CTAButton"

const LearningLanguageSection = ()=>{
    return(
        <div className="mt-28 mb-28">
            <div className="flex flex-col gap-5">
                <div className="text-4xl font-semibold text-center">
                    Your swiss knife for <HighlightText text={" learning any language"} />
                </div>
                <div className="text-center font-medium text-richblack-600 mx-auto text-base w-[70%]">
                    Using spin making learning multiple languages easy with 20+ languages realistics voice-over,
                    progress tracking, custom schedule and more. 
                </div>
                <div className="flex items-center justify-center mt-[-15px]">
                    <img 
                        className= "object-contain -mr-32" 
                        src={know_your_progress} 
                        alt=""
                    />
                    <img 
                        className= "object-contain" 
                        src={compare_with_others} 
                        alt=""
                    />
                    <img 
                        className= "object-contain -ml-32" 
                        src={plan_your_lesson} 
                        alt=""
                    />
                </div>
                <div className="text-center mt-[-18px]">
                    <CTAButton active={true} linkto={"/signup"} >
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection