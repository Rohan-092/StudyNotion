const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        requires:true,
        ref:"User"
    },
    whatYouWillLearn:{
        type:String,
    },
    ratingAndReview: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    thumbnail:{
        type:String,
    },
    price:{
        type:String,
    },
    tag:{
        type:[String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    instructions: {
        type: [String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
});

module.exports = mongoose.model("Course",courseSchema);