const mailgun = require("mailgun-js");
require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const mailSender = async (email, subject, html) => {
  const data = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    const body = await mg.messages().send(data);
    console.log("EMAIL SENT:", body);
    return body;
  } catch (error) {
    console.error("MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;
