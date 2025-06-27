const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPassword TOken
exports.resetPasswordToken = async (req,res) =>{
    try{
    //get the email
    const email = req.body.email;
    //check user for the email, email validation 
    const user = await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:'Your email is not registered',
        })
    }
    //generate the token 
    const token = crypto.randomUUID();
    // update the user by adding token and expiration time 
    const updateDeatils = await User.findOneAndUpdate(
        {email:email},
        {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 5*60*1000,
        }
    )
    //create url 
    // Use environment variable for frontend URL or default to production
    const frontendUrl = process.env.FRONTEND_URL || "https://study-notion-phi-five.vercel.app";
    const url = `${frontendUrl}/update-password/${token}`
    //send mail constaining the url
    await mailSender(email,
        "Password Reset Link",
        `Password reset Link: ${url}`
    );
    //return response 
    return res.json({
        success:true,
        message:`Email sent successfully,please check email and change password`,
    });
    }
    catch(error){
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }
}

//resetPassword
exports.resetPassword = async(req,res)=>{
    try{
        //data fetch 
        const {password, confirmPassword,token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:`password not matching `
            });
        }
        //get user detail from Db using token 
        console.log("Received token:", token);
        const userDetail = await User.findOne({resetPasswordToken:token});
        console.log("User found for token:", userDetail);
        if(!userDetail){
            return res.json({
                success:false,
                message:'Token is invalid'
            })
        }
        console.log("Token in DB:", userDetail.resetPasswordToken);
        console.log("Token expiry in DB:", userDetail.resetPasswordExpires, "Current time:", Date.now());
        //token time check
        if (!(userDetail.resetPasswordExpires > Date.now())) {
            return res.status(403).json({
                success: false,
                message: `Token is Expired, Please Regenerate Your Token`,
            });
        }
        //hash paswword 
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update and clear token/expiry
        await User.findOneAndUpdate(
            {resetPasswordToken:token},
            {
                password:hashedPassword,
                resetPasswordToken: undefined,
                resetPasswordExpires: undefined,
            },
            {new:true},
        );
        //return response 
        res.json({
            success: true,
            message: `Password Reset Successful`,
        });
    }
    catch(error){
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        });
    }
}