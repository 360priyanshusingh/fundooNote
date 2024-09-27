// emailService.js
const nodemailer = require("nodemailer");
const dotenv= require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail', // Specify Gmail service
    auth: {
      user: process.env.USER_EMAIL,  
      pass: process.env.PASS,         
    },
});

// Email sending function
async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.USER_NAME}" <${process.env.USER_EMAIL}>`, // Sender's name and address
      to: to,  // Recipient(s)
      subject: subject,  // Subject line
      // text: text,  // Plain text body
      html: html,  // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error };
  }
}

module.exports = sendEmail;

