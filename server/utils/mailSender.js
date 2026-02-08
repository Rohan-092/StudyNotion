const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: "practiceuse2002@gmail.com", // must be verified in Brevo
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("EMAIL SENT:", response.data);
    return response.data;

  } catch (error) {
    console.log(
      "EMAIL API ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = mailSender;
