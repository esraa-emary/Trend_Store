const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});


async function sendEmail (to,subject,html,text="") {
    try {
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL, 
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
        console.error("Error while sending mail:", err);
        }
}

module.exports = sendEmail