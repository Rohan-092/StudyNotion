import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/RevierSlider";

const Home = () =>{
    return(
        <div>

            {/* section 1 */}
            <div className="relative mx-auto flex flex-col items-center w-11/12 max-w-maxContent text-white ">

                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
                        <div className="flex gap-3 items-center rounded-full px-8 py-[10px] transition-all duration-200
                                        group-hover:bg-richblack-900">
                            <p className="text-[18px]">Become an instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
            
                <div className="font-semibold text-4xl mt-9">
                    Empower Your Future With 
                    <HighlightText text={" Coding Skills"} />
                </div>

                {/* <div>     */}
                    <p className="w-7/11 mt-4 mx-auto items-center text-center text-richblack-300">With our online coding courses, you can learn at your own pace, 
                    from anywhere in the world, and get access to a wealth of  </p> 
                    <p className="w-[55%] mx-auto items-center text-center text-richblack-300">resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                {/* </div> */}
                
                <div className="flex gap-4 mt-10">
                    <CTAButton linkto={"/signup"} active={true}>
                        Learn More
                    </CTAButton>
                    <CTAButton linkto={"/signup"} active={false}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="shadow-blue-200  my-10">
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>    

                <div>
                    <CodeBlocks 
                        position={"lg:flex:row"}
                        heading={
                            <div className="text-4xl font-bold">
                                Unlock Your 
                                <HighlightText text={" Coding Potential "} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                active:true,
                                linkto:"/signup",
                                btnText:"Try it Yourself"
                            }
                        }
                        ctabtn2={
                            {
                                active:false,
                                linkto:"/signup",
                                btnText:"Learn More"
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codecolor={"text-yellow-25"}
                        // backgroundGradient={"codeblock1"} 
                    />
                </div>

                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-bold">
                                Start 
                                <HighlightText text={" Coding In Seconds "} />
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codecolor={"text-[red]"}
                        // backgroundGradient={"codeblock1"} 
                    />
                </div>

                <ExploreMore/>

            </div>

            {/* section 2 */}
            <div className="bg-puregrey-5 text-richblack-700">
                <div className=" relative w-11/12 max-w-maxContent mx-auto flex flex-col items-center">
                    <div className="flex items-center gap-4 font-bold h-[220px] mt-28 text-white">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex gap-2 items-center">
                                <p>Explore Full Catalog</p>
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            Learn More
                        </CTAButton>
                    </div>

                    <div className="flex mt-10 justify-between">
                        <div className="w-[50%] flex p-2">
                            <p className="text-[32px] w-[80%] font-bold leading-10">Get the skills you need for a <HighlightText text={" job that is in demand."} /> </p>
                        </div>
                        <div className="w-[50%] flex flex-col gap-8 p-2">
                            <p className="text-md text-richblack-800 w-[80%]">The modern StudyNotion is the dictated is own terms. Today to be a competite specialist requiter more than professional skills.</p>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    <TimeLineSection/>

                    <LearningLanguageSection/>

                </div>
            </div>

            {/* section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
                
                <InstructorSection/>

                <h2 className="text-center text-4xl font-semibold mt-10">Review from other learners</h2>
                <ReviewSlider/>
            </div>

            {/* section 4 */}
            <Footer/>

        </div>
    )
}

export default Home