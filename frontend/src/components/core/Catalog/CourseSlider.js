import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode,Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  console.log("courseSliderrrrrr",Courses);
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay , Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] "
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider

// import React from 'react'
// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import FreeMode  from 'swiper'
// import Pagination  from 'swiper'

// import Course_Card from './Course_Card'

// const CourseSlider = ({Courses}) => {
//   console.log( "Coursesssssss",Courses);
//   return (
//     <>
//       {Courses?.length ? (
//           Courses.map((course, i) => (
            
//               <Course_Card course={course} Height={"h-[250px]"} />
            
//           ))
//         //
//       ) : (
//         <p className="text-xl text-richblack-5">No Course Found</p>
//       )}
//     </>
//   )
// }

// export default CourseSlider