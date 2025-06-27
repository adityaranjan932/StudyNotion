const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payment');
const courseRoutes = require('./routes/Course');
const contactUsRoute = require("./routes/Contact");
const chatBotRoutes = require("./routes/ChatBot");

const database = require('./config/dataBase');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {cloudinaryConnect} = require('./config/cloudinary');

const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  Helps in parsing form data

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",  //ye react ki port hai jahan se request aayegi
        credentials: true,
    }


));
app.use(
    fileUpload(
        {useTempFiles: true,
            tempFileDir: '/tmp/',
        }
    ));
    
    app.use((req, res, next) => {
        console.log("Request Received:", req.method, req.url);
        console.log("Request Body:", req.body);
        next();
    });
    

    //cloudinary connection
    cloudinaryConnect();

    //routes
   app.use('/api/v1/auth',userRoutes);
   app.use('/api/v1/profile',profileRoutes);
   app.use('/api/v1/payment',paymentRoutes);
   app.use('/api/v1/course',courseRoutes);
   app.use("/api/v1/reach", contactUsRoute);
   app.use("/api/v1/chat", chatBotRoutes);
 
   //default routes 
   app.get('/',(req,res)=>{
       return res.json({
        success: true,
        message: "your server is running",
       })
   });

   app.listen(PORT,()=>{
       console.log(`server is running on port ${PORT}`);
   })