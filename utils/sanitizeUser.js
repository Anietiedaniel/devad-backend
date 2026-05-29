const sanitizeUser =
(user) => {

  return {

    id: user._id,

    name: user.name,

    username:
    user.username,

    email: user.email,

    avatar: user.avatar,

    role: user.role,

    isVerified:
    user.isVerified,

  };
};

module.exports =
sanitizeUser;