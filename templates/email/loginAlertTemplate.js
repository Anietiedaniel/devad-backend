const baseTemplate =
require('./baseTemplate');

const loginAlertTemplate = ({
  name,
  ip,
  location,
  time,
}) => {

  return baseTemplate({

    title:
      'New Login Detected',

    subtitle:
      'Security Alert',

    content: `

      <p>
        Hello <strong>${name}</strong>,
      </p>

      <p>
        A new login was detected
        on your account.
      </p>

      <table
        width="100%"
        cellpadding="10"
        style="
        border:1px solid #e5e7eb;
        border-collapse:collapse;
        "
      >

        <tr>
          <td><strong>IP</strong></td>
          <td>${ip}</td>
        </tr>

        <tr>
          <td><strong>Location</strong></td>
          <td>${location}</td>
        </tr>

        <tr>
          <td><strong>Time</strong></td>
          <td>${time}</td>
        </tr>

      </table>

      <p>
        If this wasn't you,
        change your password
        immediately.
      </p>

    `,
  });

};

module.exports =
loginAlertTemplate;