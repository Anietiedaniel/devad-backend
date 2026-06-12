const sendEmailGmail = require('./sendEmail.gmail');
const sendEmailBrevo = require('./sendEmail.brevo');

const sendEmail = async (options) => {
  try {
    console.log('TRYING GMAIL');

    return await sendEmailGmail(options);
  } catch (gmailError) {
    console.error('GMAIL FAILED');
    console.error(gmailError.message);

    try {
      console.log('TRYING BREVO');

      return await sendEmailBrevo(options);
    } catch (brevoError) {
      console.error('BREVO FAILED');
      console.error(brevoError.message);

      throw brevoError;
    }
  }
};

module.exports = sendEmail;