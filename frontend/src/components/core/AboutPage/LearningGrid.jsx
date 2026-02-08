import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../../core/HomePage/CTAButton"

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/"
    },
    {
      order: 1, 
      heading: "Curriculum Based on Industry Needs",
      description: 
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description: 
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description: 
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description: 
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description: 
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = ()=>{
    return(
        <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
            {
                LearningGridArray.map( (data,index ) =>{
                    return (
                        <div key={index} className={`${index===0 && "lg:col-span-2"}
                                                    ${
                                                        data.order % 2 === 1 ? "bg-richblack-700 h-[294px]" : "bg-transparent"
                                                    }
                                                    ${
                                                        data.order === 3 && "lg:col-start-2"  
                                                    }
                        `}>
                            {
                                data.order < 0 
                                ? (
                                    <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                        <h1 className="text-4xl font-semibold">
                                            {data.heading}
                                            <HighlightText text={data.highlightText} />
                                        </h1>
                                        <p className="text-richblack-300 font-medium">
                                            {data.description}
                                        </p>
                                        <CTAButton active={true} linkto={data.BtnLink}>
                                            {data.BtnText}
                                        </CTAButton>
                                    </div>
                                )   
                                : (
                                    <div className="p-8 flex flex-col gap-8">
                                        <h1 className="text-richblack-5 text-lg">
                                            {data.heading}
                                        </h1>
                                        <p className="text-richblack-300 font-medium">
                                            {data.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid