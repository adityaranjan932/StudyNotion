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
        }
        // create new section 
        const newSection = await Section.create({sectionName});
        // add new section to the coure content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                },
            },
            {new:true}
        )
      //Todo use path replace section and subsection
        // return response 
        return res.status(200).json({
            sucess:true,
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
        //get id
        const {sectionId} = req.params;
        //find by id and delete
        await Section.findByIdAndDelete(sectionId);
        //todo{testing} : do we need to delete fromn the course Scherma ?
        // return res
       return res.status(200).json({
        success:true,
        message:"Section Deleted Successfully",
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