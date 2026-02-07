const Category = require("../models/category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req,res) =>{

    //remaining either category is made already or not
    try{
        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"fill all details"
            })    
        }

        try{
            const CategoryDetails = await Category.create(
                {name: name,
                description: description},
            )
            console.log(CategoryDetails)
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"error while db call",
            }) 
        }

        return res.status(200).json({
            success:true,
            message:"category create successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in create category"
        })
    }
}


exports.showAllCategory = async (req,res)=>{
    try{
        const allTags = await Category.find({},{name:true,description:true}) 
        return res.status(200).json({
            success:true,
            message:"get all category successfully",
            allTags,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in get all category"
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
    
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate({
                                            path:"course",
                                            match: {status:"Published"},
                                            populate: "ratingAndReview"
                                        })
                                        .exec();
                                        
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            });
        }
        
        // get courses for different categories
        // const categoriesExceptSelected = await Category.find({
        //             _id: { $ne: categoryId },
        //           })
        //           let differentCategory = await Category.findOne(
        //             categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        //               ._id
        //           )
        //             .populate({
        //               path: "course",
        //               match: { status: "Published" },
        //             })
        //             .exec()
        const differentCategory = await Category.find({
                                    _id:  {$ne: categoryId},
                                    })
                                    .populate({
                                        path:"course",
                                        match: {status:"Published"},
                                        populate: "ratingAndReview"
                                    })
                                    .exec();

        //get top selling courses 
        const allCategories = await Category.find()
                                            .populate({
                                                path: "course",
                                                match: { status: "Published" },
                                                populate:{
                                                    path:"instructor"
                                                }
                                            })
                                            .exec();

        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        
        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            }
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Internal server error",
            error: error.message,
        });
    }
}