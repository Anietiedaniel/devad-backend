const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📧 Preparing Brevo API request...");

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Devad Tech Academy",
          email: "anietienteabasi123@gmail.com",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Email sent successfully");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Brevo API Error");
    console.error(error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendEmail;