const upload =
require(
  '../middlewares/upload.middleware'
);


const passport =
require('passport');

const express =
require('express');

const router =
express.Router();


// CONTROLLERS
const {

  register,

  login,

  googleAuth,

  refreshToken,

  logout,

  forgotPassword,

  resetPassword,

  verifyEmail,

  getMe,

  updateProfile,

  uploadAvatar,

  changePassword,

} = require(
  '../controllers/auth.controller'
);



// VALIDATORS
const {

  registerValidator,

  loginValidator,

  forgotPasswordValidator,

  resetPasswordValidator,

  googleAuthValidator,

  updateProfileValidator,

  changePasswordValidator,

} = require(
  '../validators/auth.validator'
);



// MIDDLEWARES
const validate =
require(
  '../middlewares/validate.middleware'
);

const protect =
require(
  '../middlewares/auth.middleware'
);

const verifiedUser =
require(
  '../middlewares/verified.middleware'
);

const activeUser =
require(
  '../middlewares/activeUser.middleware'
);





/*
=====================================
REGISTER
=====================================
*/

router.post(

  '/register',

  registerValidator,

  validate,

  register
);





/*
=====================================
LOGIN
=====================================
*/

router.post(

  '/login',

  loginValidator,

  validate,

  login
);





/*
=====================================
GOOGLE AUTH
=====================================
*/

router.post(

  '/google',

  googleAuthValidator,

  validate,

  googleAuth
);


/*
=====================================
GOOGLE LOGIN REDIRECT
=====================================
*/

router.get(

  '/google/login',

  passport.authenticate(

    'google',

    {
      scope: [
        'profile',
        'email',
      ],
    }

  )
);


/*
=====================================
GOOGLE CALLBACK
=====================================
*/

router.get(

  '/google/callback',

  passport.authenticate(

    'google',

    {

      session: true,

      failureRedirect:
      '/login',

    }

  ),

  async (
    req,
    res
  ) => {

    res.redirect(

      process.env
      .FRONTEND_URL
    );
  }
);


/*
=====================================
REFRESH TOKEN
=====================================
*/

router.get(

  '/refresh-token',

  refreshToken
);





/*
=====================================
LOGOUT
=====================================
*/

router.post(

  '/logout',

  logout
);





/*
=====================================
FORGOT PASSWORD
=====================================
*/

router.post(

  '/forgot-password',

  forgotPasswordValidator,

  validate,

  forgotPassword
);





/*
=====================================
RESET PASSWORD
=====================================
*/

router.put(

  '/reset-password/:token',

  resetPasswordValidator,

  validate,

  resetPassword
);





/*
=====================================
VERIFY EMAIL
=====================================
*/

router.get(

  '/verify-email/:token',

  verifyEmail
);





/*
=====================================
GET CURRENT USER
=====================================
*/

router.get(

  '/me',

  protect,

  activeUser,

  verifiedUser,

  getMe
);


router.put(

  '/update-profile',

  protect,

  activeUser,

  verifiedUser,

  updateProfileValidator,

  validate,

  updateProfile
);


router.put(

  '/upload-avatar',

  protect,

  activeUser,

  verifiedUser,

  upload.single('avatar'),

  uploadAvatar
);

router.put(

  '/change-password',

  protect,

  activeUser,

  verifiedUser,

  changePasswordValidator,

  validate,

  changePassword
);



module.exports =
router;