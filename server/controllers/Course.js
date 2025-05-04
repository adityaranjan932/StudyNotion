const Course = require("../models/Course");
const category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//create course
exports.createCourse = async(req,res)=>{
        try{
            //fetch data
            const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

            //get thumbnail
            const thumbnail = req.files.thumbnailImage;

            //validation
            if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
                return req.status(400).json({
                    success:false,
                    message:"All filed are required",

                });
            }
            //check for the instructor
            const userId = req.user.id;
            const instructionDeatils = await User.findById(userId);
            console.log("Instructor Detail", instructionDeatils);
            //to do verify

            if(!instructionDeatils){
                return res.status(404).json({
                    success:false,
                    message:"Instructor detail not found",
                })
            }
            //check given tag is invalid or not 
            const tagDetails = await Tag.findById(tag);
            if(!tagDetails){
                return res.status(404).json({
                    success:false,
                    message:"tag details not found ",
                });
            }
            //upload Image to cloudinary (name AND FOLDER )
            const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

            //create entry for new course
            const newCourse = await Course.create({
                courseName,
                courseDescription,
                instructor:instructionDeatils._id,
                whatYouWillLearn:whatYouWillLearn,
                price,
                tag:tagDetails._id,
                thumbnail:thumbnailImage.secure_url,
            })

            //add new course to the user schema for the instructor
            await User.findByIdAndUpdate(
                {_id:instructionDetails._id},
                {
                    $push:{
                        courses:newCourse._id,
                    }
                },
                {new:true},
            );

            //upadte the tagka schema 

            //return response 

            return res.status(200).json({
                success:true,
                message:"course created Successfully",
                data:newCourse,
            });


        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"failed to create course",
                error:error.message,
            })

        }
}



//get all course 
exports.showAllCourses = async(req,res)=>{
    try{
        //todo change below
        const allCourses = await Course.find({},{courseName:true,
                                                 courseDescription:true,
                                                 thumbnail:true,
                                                 instructor:true,
                                                 ratingAndReviews:true,
                                                 studentsEnrolled:true, })
                                                 .populate("instructor")
                                                    .exec();
            return res.status(200).json({
                success:true,
                message:"data for all courses fetched suucesfully",
                data:allCourses,
            })
                                                 

    }
    catch(error){
        console.log(error);
        return res.status(500).josn({
            success:false,
            message:"can noe fetch course data",
            error:error.message,

        })

    }
}

//get course detials
exports.getCourseDetails = async(req,res)=>{
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
              select: "-videoUrl",
            },
          })
          .exec()
          //validation
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
        //return response 
        return res.status(200).json({
            success:true,
            message:"Course Details fetched Successfully",
            data:courseDetails,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            messaage:error.message,
        })


    }
}