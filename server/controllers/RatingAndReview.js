const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        if (!courseId || !rating || !review) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        console.log(userId,courseId);
        
        // const courseDetails = await Course.findOne({
        //     _id: courseId,
        //     studentsEnrolled: {$elemMatch: {$eq: userId} },
        // });
        
        const courseDetails = await Course.findById({
            _id: courseId,
        });

        if(!courseDetails) {
            return res.status(404).json({
                success: false,
                error: 'courseId is invalid',
            });
        }

        const uid = new mongoose.Types.ObjectId(userId)
        if (!courseDetails.studentsEnrolled.includes(uid)) {
            return res
                .status(200)
                .json({ success: false, error: "Student is not Enrolled" })
        }

        console.log("4");

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user: userId,
                course: courseId,
            }
        );
        console.log("jj");
        if(alreadyReviewed) {
            return res.status(409).json({
                success: false, 
                message: 'Course is already reviewed by the user',
            });
        }
        console.log("kk");
        //create rating and review
        const ratingReview = await RatingAndReview.create(
            {
                rating:rating, review:review, 
                course: courseId, 
                user: userId,
            }
        );
        console.log("ll");
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId}, 
            {
                $push: {
                    ratingAndReview: ratingReview._id,
                }
            },
            {new: true}
        );

        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            error: 'Rating and Reviews created successfully',
            ratingReview,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get course ID
        const courseId = req.body.courseId;
        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])
        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        // if no rating/review exists
        return res.status(200).json({
            success: true, 
            message: 'Average Rating is 0, no rating given till now',
            averageRating: 0,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//getAllRatingAndReviews
exports.getAllRatingAndReviews = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                            .sort({rating: "desc"})
                            .populate({
                                path: "user",
                                select: "firstName lastName email image",
                            })
                            .populate({
                                path: "course",
                                select: "courseName",
                            })
                            .exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}