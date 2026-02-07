const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const Course = require('../models/Course');
const { json } = require('express');
const { default: mongoose } = require('mongoose');

//create Section 
exports.createSection = async (req,res)=>{
    try{
        const {sectionName,courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })
        }

        try{
            const course = await Course.findById(courseId);
            console.log(course);
        }
        catch(error){
            return res.status(400),json({
                success:false,
                message:"courseid is invalid"
            })
        }

        const newSection = await Section.create({sectionName:sectionName});
        // console.log(newSection);
        
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true})
                                                                        .populate({
                                                                            path: "courseContent",
                                                                            populate: {
                                                                            path: "subSection",
                                                                            },
                                                                        })
                                                                        .exec();
        // console.log(updatedCourseDetails);

        return res.status(200).json({
            success:true,
            message:"section creating successfully",
            updatedCourse,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in creating section",
            error:error.message
        })
    }
}

//update Section
exports.updateSection = async (req,res)=>{
    try{
        const { courseId, sectionId, sectionName} = req.body;
        console.log("sectionID",sectionId);
        console.log("sectionName",sectionName);
        console.log("courseId",courseId);

        if(!sectionId || !sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
        // console.log(updatedSection);
        let course;
        try{
            course = await Course.findById(courseId)
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();
            if(!course){
                return res.status(200).json({
                    success:true,
                    message:"course is not present courseId is invalid",
                })
            }

            return res.status(200).json({
                success:true,
                message:"section updated successfully",
                data:course,
            })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"error in finding course",
                error:error.message
            })
        }

        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

//Delete Section
exports.deleteSection = async (req,res)=>{
    try{
        const {sectionId,courseId} = req.body;
        console.log(sectionId,courseId);

        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })
        }

        const section = await Section.findById(sectionId)
        if (!section) {
        return res.status(404).json({
            success: false,
            message: "Section not found",
        })
        }

        await SubSection.deleteMany({ _id: { $in: section.subSection } })

        await Section.findByIdAndDelete(sectionId);

        await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:sectionId}})
        
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        
        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
            data:course,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}