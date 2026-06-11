const baseTemplate =
require('./baseTemplate');

const welcomeTemplate = ({
  name,
}) => {

  return baseTemplate({

    title:
      'Welcome',

    subtitle:
      'Your account is ready',

    content: `

      <p>
        Hello <strong>${name}</strong>,
      </p>

      <p>
        Welcome to Devad Group.
      </p>

      <p>
        Your account has been
        successfully created.
      </p>

      <p>
        We are excited to have you
        on board.
      </p>

    `,
  });

};

module.exports =
welcomeTemplate;