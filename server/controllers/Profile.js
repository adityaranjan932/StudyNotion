const Profile = require("../models/Profile");
const User = require("../models/User");

//update profile beacuse we have created profile before in signup controller where we marked all the things null

exports.updateProfile = async(req,res)=>{
    try{
        //get data
        const{dateOfBirth="",about="",contactNumber,gender} = req.body;

        //get User id
        const id = req.user.id;
        //validation
        if(!contactNumber||!gender||!id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //find Profile {id = user me padi hui hai decode.user me daala hua hai}
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileID);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
        })

    }
    catch(error){
        return res.status.json({
            success:false,
           error:error.message,
        })

    }
}

// delete Account 
//explain how can we schedule this deletion operation
exports.deleteAccount = async(req,res)=>{
    try{
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                meessage:"user not found",

            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //Todo : unerool user from all enrooled courses 
        //delete user 
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:"user deleted Successfully",
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User can not be deleted successfully",
        })

    }
}
//get all user 

exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
      const id = req.user.id

      //validation and get user details
      const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
      console.log(userDetails)
      //return response 
      res.status(200).json({
        success: true,
        message: "User Data fetched successfully",
        data: userDetails,
      });

    }
     catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }