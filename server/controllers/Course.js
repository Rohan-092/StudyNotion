const Course = require('../models/Course');
const Category = require('../models/category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUpload');
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")

// yeh nhi chl rha

// exports.createCourse = async (req,res)=>{
//     try{    
//         let {courseName, courseDescription, whatYouWillLearn, tag: _tag, instructions: _instructions, price, category, status} = req.body; 
//         // const thumbnail = req.files.thumbnailImage;
        
//         // Convert the tag and instructions from stringified Array to Array
//         const tag = JSON.parse(_tag)
//         const instructions = JSON.parse(_instructions)        
//         console.log("tag", tag)
//         console.log("instructions", instructions)

//         if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category  || !instructions.length || !tag.length){ //|| !thumbnail
//             return res.status(400).json({
//                 success:false,
//                 message:"all fields are mandatory",
//             });
//         }

//         if (!status || status === undefined) {
//             status = "Draft"
//         }
        
//         // check user is an instructor
//         const userId = req.user.id;
//         const instructorDetails = await User.findById(userId,{accountType: "Instructor"});
        
//         if(!instructorDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"instructorDetails not found",
//             });    
//         }

//         const categoryDetails = await Category.findById(category);
//         if(!categoryDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"categoryDetails not found",
//             });    
//         }

//         // console.log("thub",thumbnail);
//         // const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
//         const newCourse = await Course.create({
//             courseName:courseName,
//             courseDescription:courseDescription,
//             instructor:instructorDetails._id,
//             whatYouWillLearn:whatYouWillLearn,
//             // thumbnail:thumbnailImage.secure_url,
//             price:price,
//             category:categoryDetails._id,
//             status: status,
//             tag:tag,
//             instructions,
//         })

//         await User.findByIdAndUpdate(
//             {_id:instructorDetails._id},
//             {$push:{courses:newCourse._id}},
//             {new:true}
//         );

//         try{
//           await Category.findByIdAndUpdate(
//               {_id:category},
//               {$push:{course:newCourse._id}},
//               {new:true}
//           );
//         }
//         catch(error){
//           console.log(error);
//         return res.status(404).json({
//             success:false,
//             message:"galti",
//             error:error.message
//         })
//         }
        
//         return res.status(200).json({
//             success:true,
//             message:"Course created successfull",
//             data:newCourse,
//         });  

//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"error in creating course",
//             error:error.message
//         })
//     }
// }

exports.createCourse = async (req,res)=>{
  try{    
      let {courseName, courseDescription, whatYouWillLearn, tag: _tag, instructions: _instructions, price, category, status} = req.body; 
      const thumbnail = req.files.thumbnailImage;
      
      // Convert the tag and instructions from stringified Array to Array
      const tag = JSON.parse(_tag)
      const instructions = JSON.parse(_instructions)        
      console.log("tag", tag)
      console.log("instructions", instructions)

      if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category  || !instructions.length || !tag.length){ //|| !thumbnail
          return res.status(400).json({
              success:false,
              message:"all fields are mandatory",
          });
      }

      if (!status || status === undefined) {
          status = "Draft"
      }
      
      // check user is an instructor
      const userId = req.user.id;
      const instructorDetails = await User.findById(userId,{accountType: "Instructor"});
      
      if(!instructorDetails){
          return res.status(400).json({
              success:false,
              message:"instructorDetails not found",
          });    
      }

      const categoryDetails = await Category.findById(category);
      if(!categoryDetails){
          return res.status(400).json({
              success:false,
              message:"categoryDetails not found",
          });    
      }

      console.log("thub",thumbnail);
      const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
      console.log("thumbnailImage",thumbnailImage);
      
      const newCourse = await Course.create({
          courseName:courseName,
          courseDescription:courseDescription,
          instructor:instructorDetails._id,
          whatYouWillLearn:whatYouWillLearn,
          thumbnail:thumbnailImage.secure_url,
          price:price,
          category:categoryDetails._id,
          status: status,
          tag:tag,
          instructions,
      })

      await User.findByIdAndUpdate(
          {_id:instructorDetails._id},
          {$push:{courses:newCourse._id}},
          {new:true}
      );

      
        const cate2 = await Category.findByIdAndUpdate(
            {_id:category},
            {$push:{course:newCourse._id}},
            {new:true}
        );
        console.log("cate2",cate2);
      
      
      
      
      return res.status(200).json({
          success:true,
          message:"Course created successfull",
          data:newCourse,
      });  

  }
  catch(error){
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"error in creating course",
          error:error.message
      })
  }
}

exports.showAllCourse = async (req,res)=>{
    try{
        const allCourse = await Course.find({status: "Published"},{
                                                                    courseName: true,
                                                                    price: true,
                                                                    thumbnail: true,
                                                                    instructor: true,
                                                                    ratingAndReviews: true,
                                                                    studentsEnrolled: true,
                                                                })
                                                                .populate("instructor")
                                                                .exec();
        return res.status(200).json({
            success:true,
            message:"Data for all course fetched successfull",
            data:allCourse,
        });                                                                       
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
            error:error.message,
        })
    }
}

exports.getCourseDetails = async (req,res)=>{
    try{
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"course id is missing",
            });
        }

        const courseDetails = await Course.findById(
                                            {_id:courseId} )
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    }
                                                }
                                            )
                                            .populate("ratingAndReview")
                                            .populate("category")
                                            .populate("studentsEnrolled")
                                            .populate(
                                                {
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                }
                                            )
                                            .exec();
    
        if(!courseDetails){
            return res.status(400).json({
            success:false,
            message:`courseDetails is not found by given courseid ${courseId}`,
            });
        }

        // console.log(courseDetails);

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success:true,
            message:"Get CourseDetails successfully",
            data:{
                courseDetails,
                totalDuration
            }
        }); 

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in find courseDetails",
            error:error.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      console.log("courrrrrrrrr",courseId);
      const userId = req.user.id
      const courseDetails = await Course.findById(
        {_id:courseId},
      )
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with given id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

exports.getInstructorCourses = async (req, res) => {
  
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id
    
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
          instructor: instructorId,
        }).sort({ createdAt: -1 })
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .populate("studentsEnrolled")
        .exec();

        // console.log("wwwwwwwww",instructorCourses);
        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}


exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
    
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
    
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
            })
        }
  
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
    
            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
        
        //delete course from instructor courses
        await User.findByIdAndUpdate(course.instructor,{$pull: {courses:course._id}})

        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } 
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }  
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      console.log("updates.............",updates);
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.stack, 
      })
    }
}