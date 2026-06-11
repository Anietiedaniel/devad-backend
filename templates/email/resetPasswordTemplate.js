const baseTemplate =
require('./baseTemplate');

const resetPasswordTemplate = ({
  name,
  resetUrl,
}) => {

  return baseTemplate({

    title:
      'Reset Password',

    subtitle:
      'Password Recovery Request',

    content: `

      <p>
        Hello <strong>${name}</strong>,
      </p>

      <p>
        We received a request
        to reset your password.
      </p>

      <div
        style="
        text-align:center;
        margin:35px 0;
        "
      >

        <a
          href="${resetUrl}"
          style="
          background:#dc2626;
          color:white;
          text-decoration:none;
          padding:14px 28px;
          border-radius:8px;
          font-weight:bold;
          display:inline-block;
          "
        >
          Reset Password
        </a>

      </div>

      <p>
        This link expires
        in 10 minutes.
      </p>

      <p>
        If you didn't request this,
        ignore this email.
      </p>

    `,
  });

};

module.exports =
resetPasswordTemplate;