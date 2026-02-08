const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadImageToCloudinary } = require('../utils/imageUpload');
require("dotenv").config();

exports.createSubSection = async (req,res)=>{
    try{
        const {title,description,sectionId} = req.body; //,timeDuration
        const video = req.files.videoFile;
        console.log(title,description,sectionId);
        console.log("video",video);

        if(!title  || !description || !sectionId){ //|| !timeDuration
            return res.status(400).json({
                success:false,
                message:"fill all details",
                
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        console.log("UPLOADDETAILS",uploadDetails);

        const newSubSection = await SubSection.create({
            title,
            timeDuration: `${uploadDetails.duration}`,
            description,
            videoUrl:uploadDetails.secure_url
        }); 
        
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true})
                                            .populate("subSection")
                                            .exec();
        
        console.log(updatedSection);
        return res.status(200).json({
            success:true,
            message:"subSection creating successfully",
            data:updatedSection
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error",
            error:error.message
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        const {sectionId, subSectionId, title, description} = req.body;
        console.log(sectionId, subSectionId);
        const subSection = await SubSection.findById(subSectionId);

        if (title !== undefined) {
            subSection.title = title
        }
      
        if (description !== undefined) {
            subSection.description = description
        }
        if(req.files.videoFile !== undefined){
            const uploadDetails = await uploadImageToCloudinary(req.files.videoFile,process.env.FOLDER_NAME)
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`   
        }

        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success:true,
            message:"subSection updated successfully",
            data:updatedSection,
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

exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;
        console.log(subSectionId,sectionId);
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"sectionId or subSectionId is missing"
            })
        }

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});

        console.log(updatedSection);
        
        return res.status(200).json({
            success:true,
            message:"subSection deleting successfully",
            data:updatedSection,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in deleting subSection"
        })
    }
}