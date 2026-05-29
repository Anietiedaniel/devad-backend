const verifiedUser =
(
  req,
  res,
  next
) => {

  if (
    !req.user.isVerified
  ) {

    return res.status(403)
    .json({

      success: false,

      message:
      'Verify your email',

    });
  }



  next();
};

module.exports =
verifiedUser;