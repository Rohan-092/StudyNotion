import React from "react";
import { TbHierarchy3 } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";

const CourseCard = ({currentCard,setCurrentCard,cardData})=>{
    return(
        <div className={`flex flex-col justify-between gap-2 px-5 pt-5 w-[28%] ${currentCard===cardData.heading ? "bg-puregrey-5 text-black shadow-[14px_14px_0px_0px_#ffd60a] " : "bg-richblack-800"  }`}
            onClick={()=>{setCurrentCard(cardData.heading)}}
        >
            <p className="text-[19px]">{cardData.heading}</p>
            <p className="text-[16px] text-richblack-500">{cardData.description}</p>
            <div className="flex justify-between mt-24 mb-2">
                <div className="flex gap-2 items-center text-blue-100">
                    <IoMdPeople/>
                    {cardData.level}
                </div>
                <div className="flex gap-2 items-center text-blue-100">
                    <TbHierarchy3/>
                    <p>{cardData.lessonNumber} Lessons</p>
                </div>
            </div>
        </div>
             
    )
}

export default CourseCard

