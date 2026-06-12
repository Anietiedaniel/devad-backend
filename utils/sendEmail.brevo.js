const nodemailer = require('nodemailer');

const sendEmailBrevo = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log('===== BREVO START =====');

    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      family: 4,

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    console.log('BREVO TRANSPORT CREATED');

    await transporter.verify();

    console.log('BREVO VERIFIED');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('BREVO SENT');
    console.log(info);

    return info;
  } catch (error) {
    console.error('BREVO ERROR');
    console.error(error);
    throw error;
  }
};

module.exports = sendEmailBrevo;