const clearAuthCookies =
(res) => {

  res.clearCookie(
    'refreshToken'
  );
};

module.exports =
clearAuthCookies;