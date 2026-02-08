import React from "react";
import Logo1  from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2  from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3  from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4  from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage from "../../../assets/images/TimelineImage.png"

const timeLine = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully commited to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibiliity",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    },
]

const TimeLineSection = ()=>{
    return(
        <div className="flex w-full gap-10 justify-between items-center mb-20 mt-16">
            <div className="flex flex-col gap-10">
                {
                    timeLine.map( (data) =>{ 
                        return(
                            <div className="flex p-1 gap-8">
                                <div className="flex px-[11px] bg-white rounded-full">
                                    <img src={data.Logo}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold">{data.heading}</p>
                                    <p className="text-sm text-richblack-600">{data.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="p-5 relative ml-20 border border-richblack-50">
                <img src={timeLineImage} className="w-[650px] h-[550px]"/>

                <div className="absolute bottom-[-35px] left-[160px] bg-caribbeangreen-700 text-white w-[420px] h-[100px] flex justify-evenly gap-10 px-8">
                    <div className="w-[50%] flex gap-5 items-center ">
                        <p className="text-[35px]  font-bold">10</p>
                        <p className="flex flex-col flex-wrap text-caribbeangreen-300 text-[12px]">YEARS OF EXPERIENCES</p>
                    </div>
                    <div className="w-[50%] flex gap-5 items-center">
                        <p className="text-[35px]  font-bold">250</p>
                        <p className="flex flex-col flex-wrap text-caribbeangreen-300 text-[12px]">TYPES OF COURSES</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimeLineSection