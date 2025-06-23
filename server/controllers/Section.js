const  Course = require("../models/Course");
const Section = require("../models/Section");

//create a new section
exports.createSection = async(req,res)=>{
    try{
        //data fetch 
        const {sectionName,courseId} = req.body;

        //validation 
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"Missing requried Properties",
            });
        }        // create new section 
        const newSection = await Section.create({sectionName});
        // add new section to the course content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                },
            },
            {new:true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });

        // return response 
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse,
        });

    }
    catch(error){
        	// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});

    }
}

//update section 
exports.updateSection = async(req,res)=>{
    try{
        //data fetch
        const { sectionName, sectionId } = req.body;
        //validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        //return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        });
	

    }
    catch(error){
        res.status(500).json({
			success: false,
			message: "unable to update section, please try again",
			error: error.message,
		});

    }
};

//delete section
exports.deleteSection = async (req,res)=>{
    try{
        //get id - assuming it comes from request body based on frontend usage
        const {sectionId, courseId} = req.body;
        
        //find by id and delete
        await Section.findByIdAndDelete(sectionId);
        
        //remove section from course content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId,
                },
            },
            {new: true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });
        
        // return res with updated course
       return res.status(200).json({
        success:true,
        message:"Section Deleted Successfully",
        data: updatedCourse,
       });

    }
    catch(error){
        res.status(500).json({
			success: false,
			message: "unable to delete section, please try again",
			error: error.message,
		});

    }
}