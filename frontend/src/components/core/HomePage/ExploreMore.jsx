import React, { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = ()=>{

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return(
        <div className="w-full flex flex-col items-center mt-10">
            <div className="text-4xl font-semibold">
                Unlock the <HighlightText text={" Power of Code"} />
            </div>
            
            <p className="text-richblack-300 text-[16px] mt-3">Learn to build anything. You can imagine</p>

            <div className="mt-5 mb-60 flex justify-center rounded-full bg-richblack-800 py-1 px-1 w-fit">
                {
                    tabsName.map( (tab,index)=>{
                        return(
                            <div className={` text-[16px] flex items-center gap-2 ${currentTab === tab ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 px-7 py-2 `}
                            key={index}
                            onClick={()=>setMyCards(tab)}
                            >
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            {/* <div className="lg:h-[150px]"></div> */}

            <div className="absolute bottom-[-120px] flex gap-10 justify-center w-[85%] mx-8">
                {
                    courses.map( (element,index)=>{
                        return(
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore