const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      family: 4, // 🔥 IMPORTANT (forces IPv4)
    },
  });

  const info = await transporter.sendMail({
    from: `"StudyNotion" <${process.env.MAIL_USER}>`,
    to: email,
    subject: title,
    html: body,
  });

  return info;
};

module.exports = mailSender;
