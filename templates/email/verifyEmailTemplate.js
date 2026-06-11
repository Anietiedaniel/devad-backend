const baseTemplate =
require('./baseTemplate');

const verifyEmailTemplate = ({
  name,
  verificationUrl,
}) => {

  return baseTemplate({

    title:
      'Verify Your Email',

    subtitle:
      'Activate your account',

    content: `

      <p>
        Hello <strong>${name}</strong>,
      </p>

      <p>
        Thank you for creating an account.
        Please verify your email address
        to activate your account.
      </p>

      <div
        style="
        text-align:center;
        margin:35px 0;
        "
      >

        <a
          href="${verificationUrl}"
          style="
          background:#2563eb;
          color:white;
          text-decoration:none;
          padding:14px 28px;
          border-radius:8px;
          font-weight:bold;
          display:inline-block;
          "
        >
          Verify Email
        </a>

      </div>

      <p>
        If the button does not work,
        copy and paste the link below:
      </p>

      <p>
        ${verificationUrl}
      </p>

    `,
  });

};

module.exports =
verifyEmailTemplate;