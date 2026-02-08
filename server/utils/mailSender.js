const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  console.log("MAIL FUNCTION STARTED");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 20000,
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
