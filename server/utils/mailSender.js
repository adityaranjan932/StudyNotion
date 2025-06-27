const nodemailer = require("nodemailer");

const mailSender = async (email,title,body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }

        })

        let info = await transporter.sendMail({
            from:'StudyNotion || CodeHelp - by Ranjan',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info; // Return the info object

    }
    catch(error){
        console.log(error.message);
        throw error; // Throw error so it can be caught by calling function
    }
}
module.exports = mailSender;