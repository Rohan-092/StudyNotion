const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS, // app password
      },
    });
  
    const info = await transporter.sendMail({
      from: `"my app" <${process.env.MAIL_USER}>,
      to: email,
      subject: title,
      html: body,
    });

    console.log("EMAIL SENT:", info.messageId);
    return info;

  } catch (error) {
    console.log("MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;
