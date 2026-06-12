const nodemailer = require('nodemailer');

const sendEmailGmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log('===== GMAIL START =====');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      family: 4,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('GMAIL TRANSPORT CREATED');

    await transporter.verify();

    console.log('GMAIL VERIFIED');

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('GMAIL SENT');
    console.log(info);

    return info;
  } catch (error) {
    console.error('GMAIL ERROR');
    console.error(error);
    throw error;
  }
};

module.exports = sendEmailGmail;