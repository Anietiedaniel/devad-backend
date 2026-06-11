// const nodemailer = require('nodemailer');

// const sendEmail = async ({
//   to,
//   subject,
//   html,
// }) => {

//   console.log(
//     'COMPANY_LOGO:',
//     process.env.COMPANY_LOGO
//   );

//   console.log(
//     'EMAIL_FROM:',
//     process.env.EMAIL_FROM
//   );

//   const transporter =
//     nodemailer.createTransport({

//       host:
//         process.env.EMAIL_HOST,

//       port:
//         Number(
//           process.env.EMAIL_PORT
//         ),

//       secure: false,

//       auth: {

//         user:
//           process.env.EMAIL_USER,

//         pass:
//           process.env.EMAIL_PASS,

//       },

//     });

//   console.log(html);

//   return transporter.sendMail({

//     from:
//       process.env.EMAIL_FROM,

//     to,

//     subject,

//     html,

//   });
// };

// module.exports =
//   sendEmail;
  

const nodemailer = require('nodemailer');

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log('================ EMAIL DEBUG ================');

    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

    console.log('TO:', to);
    console.log('SUBJECT:', subject);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,

      // Force IPv4
      family: 4,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('Transporter created');

    await transporter.verify();

    console.log('SMTP VERIFIED SUCCESSFULLY');

    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log('EMAIL SENT SUCCESSFULLY');
    console.log(result);

    console.log('============================================');

    return result;
  } catch (error) {
    console.error('=========== EMAIL ERROR ===========');

    console.error('MESSAGE:', error.message);
    console.error('CODE:', error.code);
    console.error('COMMAND:', error.command);
    console.error('STACK:', error.stack);

    console.error('===================================');

    throw error;
  }
};

module.exports = sendEmail;