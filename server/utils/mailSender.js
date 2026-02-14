const SibApiV3Sdk = require("sib-api-v3-sdk");

const mailSender = async (email, title, body) => {
    try {
        // Configure Brevo API key
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        const apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = {
            name: "StudyNotion",
            email: process.env.MAIL_USER,
        };
        sendSmtpEmail.to = [{ email: email }];
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;

        const info = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", info);
        return info;
    } catch (error) {
        console.log("Error sending email:", error.message);
        throw error;
    }
};

module.exports = mailSender;