const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mailsTemplates/passwordUpdate");
require("dotenv").config();

// send otp
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        //check if the user is already present 
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: `User is already registered`,
            });
        }
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated", otp);

        //check unique otp 
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        //create an entry in DB
        await OTP.create(otpPayload);
        console.log(otpPayload);

        return res.status(200).json({
            success: true,
            message: `Otp sent successfully`,
            otp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//sign up
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }
        
        // Find the most recent OTP
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);
        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) { // FIX: response is an array, so accessing otp correctly
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }
        
        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create profile entry in DB
        const profileDetails = await Profile.create({
            gender: null,
            dateofBirth: null,
            about: null,
            contactNumber: null,
        });
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: false, // FIX: assigned a default value for 'approved' as it was undefined
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};
//login

exports.login = async(req,res) =>{
  try{
    //get email and passowrd from req.body
    const{email,password} = req.body;

    if(!email ||!password){
      return res.status(400).json({
        success:false,
        message:`Please Fill up All the Required Fields`,
      })
    }
    //find user with provided email
    const user = await User.findOne({email}).populate("additionalDetails")
        // If user not found with provided email

    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }
      // Generate JWT token and Compare Password

      if(await bcrypt.compare(password, user.password)){

        const payload = {
          email:user.email,
          id:user._id,
          accountType:user.accountType,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"2h",
        });
        user.token = token;
        user.password = undefined;

        const options = {
          httpOnly: true,
          secure: true, // Use this in production
          expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        };
        

        //create cookie and send response 
        res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"Logged in successfully",
          
        })
      }
      else{
        return res.status(401).json({
          success:false,
            message:'password is incorrect',
        })
      }



  }
  catch(error){
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })

  }
}

//Todo => changePassword 
exports.changePassword = async(req,res)=>{
  try{
       // Get user data from req.user
       const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
          oldPassword,
          userDetails.password
        )

        if (!isPasswordMatch) {
          // If old password does not match, return a 401 (Unauthorized) error
          return res
            .status(401)
            .json({ success: false, message: "The password is incorrect" })
        }

            // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

       // Send notification email
       try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse?.messageId || emailResponse)

    } catch (emailError) {
      console.error("Error occurred while sending email:", emailError)
      // Don't return error response here, just log it
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}