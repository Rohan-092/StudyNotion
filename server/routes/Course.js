const express = require('express');
const router = express.Router();

const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');

const {createCourse,showAllCourse,getCourseDetails,getFullCourseDetails,editCourse,getInstructorCourses,deleteCourse} = require('../controllers/Course');
const {createSection,updateSection,deleteSection} = require('../controllers/Section');
const {createSubSection,updateSubSection,deleteSubSection} = require('../controllers/SubSection');
const {createCategory,showAllCategory,categoryPageDetails} = require('../controllers/Category');
const {createRating,getAllRatingAndReviews,getAverageRating} = require('../controllers/RatingAndReview');
const {updateCourseProgress,getProgressPercentage} = require("../controllers/CourseProgress");

router.post("/createCourse",auth,isInstructor,createCourse);
router.get("/showAllCourse",showAllCourse);
router.post("/getCourseDetails",getCourseDetails);
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
router.post("/editCourse",auth,isInstructor,editCourse);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails)

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingAndReviews);


module.exports = router;