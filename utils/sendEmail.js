const nodemailer = require('nodemailer');

const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  console.log(
    'COMPANY_LOGO:',
    process.env.COMPANY_LOGO
  );

  console.log(
    'EMAIL_FROM:',
    process.env.EMAIL_FROM
  );

  const transporter =
    nodemailer.createTransport({

      host:
        process.env.EMAIL_HOST,

      port:
        Number(
          process.env.EMAIL_PORT
        ),

      secure: false,

      auth: {

        user:
          process.env.EMAIL_USER,

        pass:
          process.env.EMAIL_PASS,

      },

    });

  console.log(html);

  return transporter.sendMail({

    from:
      process.env.EMAIL_FROM,

    to,

    subject,

    html,

  });
};

module.exports =
  sendEmail;
  