const sendEmail =
require('../utils/sendEmail');

const verifyEmailTemplate =
require('../templates/email/verifyEmailTemplate');

const resetPasswordTemplate =
require('../templates/email/resetPasswordTemplate');

const welcomeTemplate =
require('../templates/email/welcomeTemplate');

const loginAlertTemplate =
require('../templates/email/loginAlertTemplate');

const accountBlockedTemplate =
require('../templates/email/accountBlockedTemplate');

class EmailService {

  static async sendVerificationEmail({
    email,
    name,
    verificationUrl,
  }) {

    return sendEmail({

      to: email,

      subject:
        'Verify Your Email',

      html:
        verifyEmailTemplate({
          name,
          verificationUrl,
        }),

    });

  }

  static async sendWelcomeEmail({
    email,
    name,
  }) {

    return sendEmail({

      to: email,

      subject:
        'Welcome to Devad Group',

      html:
        welcomeTemplate({
          name,
        }),

    });

  }

  static async sendPasswordResetEmail({
    email,
    name,
    resetUrl,
  }) {

    return sendEmail({

      to: email,

      subject:
        'Reset Your Password',

      html:
        resetPasswordTemplate({
          name,
          resetUrl,
        }),

    });

  }

  static async sendLoginAlertEmail({
    email,
    name,
    ip,
    location,
    time,
  }) {

    return sendEmail({

      to: email,

      subject:
        'New Login Alert',

      html:
        loginAlertTemplate({
          name,
          ip,
          location,
          time,
        }),

    });

  }

  static async sendAccountBlockedEmail({
    email,
    name,
  }) {

    return sendEmail({

      to: email,

      subject:
        'Account Blocked',

      html:
        accountBlockedTemplate({
          name,
        }),

    });

  }

}

module.exports =
EmailService;