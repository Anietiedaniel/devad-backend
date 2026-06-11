const baseTemplate =
require('./baseTemplate');

const accountBlockedTemplate = ({
  name,
}) => {

  return baseTemplate({

    title:
      'Account Blocked',

    subtitle:
      'Security Notification',

    content: `

      <p>
        Hello <strong>${name}</strong>,
      </p>

      <p>
        Your account has been
        blocked due to suspicious
        activity or policy violations.
      </p>

      <p>
        If you believe this is
        a mistake, contact support.
      </p>

      <div
        style="
        background:#fef2f2;
        border-left:4px solid #dc2626;
        padding:15px;
        margin-top:20px;
        "
      >

        Access to your account
        is currently restricted.

      </div>

    `,
  });

};

module.exports =
accountBlockedTemplate;