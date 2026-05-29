const activeUser =
(
  req,
  res,
  next
) => {

  if (
    req.user.isBlocked
  ) {

    return res.status(403)
    .json({

      success: false,

      message:
      'Account blocked',

    });
  }



  next();
};

module.exports =
activeUser;