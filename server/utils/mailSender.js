// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (email, title, body) => {
//   try {
//     const response = await resend.emails.send({
//       from: process.env.RESEND_FROM_EMAIL,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("EMAIL SENT:", response);
//     return response;
//   } catch (error) {
//     console.error("RESEND ERROR:", error);
//     throw error;
//   }
// };

// module.exports = mailSender;

const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (to, subject, html) => {
  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL,
      subject,
      html,
    };
    await sgMail.send(msg);
    console.log("EMAIL SENT:", to);
  } catch (error) {
    console.error("SENDGRID ERROR:", error);
    throw error;
  }
};

module.exports = mailSender;

