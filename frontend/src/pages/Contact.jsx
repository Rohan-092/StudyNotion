import React from 'react';
import {BiWorld} from 'react-icons/bi'
import {HiChatBubbleLeftRight} from 'react-icons/hi2'
import {IoCall} from 'react-icons/io5'
import ContactForm from '../components/ContactPage/ContactForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/RevierSlider';

const Contact = () => {
    return (
        <div>

            <div className="mx-auto mt-10 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                <div className='flex flex-col h-[400px] w-[30%] gap-4 rounded-xl bg-richblack-800 p-4 lg:p-6'>

                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3'>
                            <HiChatBubbleLeftRight size={25}/>
                            <span className='text-lg font-semibold text-richblack-5'>Chat on us</span>
                        </div>
                        <p className='font-medium'>Our friendly team is reafy to help.</p>
                        <p className='font-semibold'>info@studynotion.com</p>
                    </div>

                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3'>
                            <BiWorld size={25} />
                            <span className='text-lg font-semibold text-richblack-5'>Visit us</span>
                        </div>
                        <p className='font-medium'>Our friendly team is reafy to help.</p>
                        <p className='font-semibold'>info@studynotion.com</p>
                    </div>

                    <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>
                        <div className='flex flex-row items-center gap-3'>
                            <IoCall size={25} />
                            <span className='text-lg font-semibold text-richblack-5'>Chat on us</span>
                        </div>
                        <p className='font-medium'>Our friendly team is reafy to help.</p>
                        <p className='font-semibold'lllllllzvgsgsggsfsggffgdd>info@studynotion.com</p>
                    </div>


                </div>

                <div>
                    <ContactForm/>
                </div>
            </div>

            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Review from other learners 
                </h1>
                <ReviewSlider/>
                {/* <div className="text-white">
                    <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                        
                    </div>
                </div> */}
            </div>

            <Footer/>

        </div>
    );
}

export default Contact;
