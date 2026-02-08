const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  console.log("MAIL FUNCTION STARTED");

  try {
    console.log("MAIL CONFIG:", {
      host: process.env.MAIL_HOST,
      user: process.env.MAIL_USER ? "✔ exists" : "❌ missing",
      pass: process.env.MAIL_PASS ? "✔ exists" : "❌ missing",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000, // 👈 VERY IMPORTANT
    });

    console.log("TRANSPORTER CREATED");

    await transporter.verify();
    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: `"StudyNotion" <practiceuse2002@gmail.com>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("EMAIL SENT:", info.messageId);
    return info;

  } catch (error) {
    console.log("MAIL ERROR:", error);
    throw error;
  }
};

module.exports = mailSender;
