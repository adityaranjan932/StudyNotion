const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


//auth
exports.auth = async(req,res,next) =>{    try{        //extract the jwt from request cookies, body and  header 
        const token = 
        req.cookies.token ||
        req.body.token ||
        (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        //if jwt is missing,return 401
        if(!token){
            return res.status(401).json({
                success:false,
                message:`Token Missing`,
            });
        }

      try{
        //verifying the jwt token using the secret key stored in environment variables 
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        //storing the decode jwt payload in the request object for further use 
        req.user = decode;
      }
      catch(error){
        //if jwt verification fails, return 401 unautorized response 
        return res.status(401).json({
            success:false,
            message:`token is invalid`,
        });
      }
      //if jwt is valid move on to the next middleware or request handler 
      next();


    }

    catch(error){
        //if there is an error during the authentication process,return 401 unauthorised response 
        return res.status(401).json({
            success:false,
            message:`Something Went Wrong While validating the token`,
        });
        
    }
}

//isStudent 

exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType != "Student") {
            return res.status(401).json({
                success:false,
                message:`This is a protected route for Student only`,
            })
        }
        next();

    }
    catch(error){
        return res
        .status(500)
        .json({ success: false, message: `User Role Can't be Verified` });

    }
}

//isInstructor

exports.isInstructor = async(req,res,next) =>{
    try{
        if(req.user.accountType != "Instructor") {
            return res.status(401).json({
                success:false,
                message:`This is a protected route for Instructor only`,
            })
        }
        next();

    }
    catch(error){
        return res
        .status(500)
        .json({ success: false, message: `User Role Can't be Verified` });

    }
}

//isAdmin

exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType != "Admin") {
            return res.status(401).json({
                success:false,
                message:`This is a protected route for Admin only`,
            })
        }
        next();

    }
    catch(error){
        return res
        .status(500)
        .json({ success: false, message: `User Role Can't be Verified` });

    }
}

