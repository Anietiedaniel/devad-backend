const User =
require('../models/User');

const sanitizeUser =
require('../utils/sanitizeUser');

const comparePassword =
require('../utils/comparePassword');

const hashPassword =
require('../utils/hashPassword');

const {

  registerService,

  loginService,

  googleAuthService,

  refreshTokenService,

  logoutService,

  forgotPasswordService,

  resetPasswordService,

  verifyEmailService,

  getCurrentUserService,

} = require(
  '../services/auth.service'
);

const {
  uploadAvatarService,
} = require(
  '../services/upload.service'
);

const setAuthCookies =
require(
  '../utils/setAuthCookies'
);

const clearAuthCookies =
require(
  '../utils/clearAuthCookies'
);




/*
=====================================
REGISTER
=====================================
*/

const register =
async (
  req,
  res,
  next
) => {

  try {

    const result =
    await registerService(
      req.body
    );



    setAuthCookies(

      res,

      result.refreshToken
    );



    res.status(201).json({

      success: true,

      message:
      'User registered successfully',

      accessToken:
      result.accessToken,

      user:
      result.user,

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
LOGIN
=====================================
*/

const login =
async (
  req,
  res,
  next
) => {

  try {

    const {
      email,
      password,
    } = req.body;



const result = await loginService(
  email,
  password,
);



    setAuthCookies(

      res,

      result.refreshToken
    );



    res.status(200).json({

      success: true,

      message:
      'Login successful',

      accessToken:
      result.accessToken,

      user:
      result.user,

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
GOOGLE AUTH
=====================================
*/

const googleAuth =
async (
  req,
  res,
  next
) => {

  try {

    const {
      token,
    } = req.body;



    const result =
    await googleAuthService(
      token
    );



    setAuthCookies(

      res,

      result.refreshToken
    );



    res.status(200).json({

      success: true,

      message:
      'Google login successful',

      accessToken:
      result.accessToken,

      user:
      result.user,

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
REFRESH TOKEN
=====================================
*/

const refreshToken =
async (
  req,
  res,
  next
) => {

  try {

    const refreshToken =
    req.cookies
    .refreshToken;



    const result =
    await refreshTokenService(
      refreshToken
    );



    res.status(200).json({

      success: true,

      accessToken:
      result.accessToken,

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
LOGOUT
=====================================
*/

const logout =
async (
  req,
  res,
  next
) => {

  try {

    const refreshToken =
    req.cookies
    .refreshToken;



    await logoutService(
      refreshToken
    );



    clearAuthCookies(
      res
    );



    res.status(200).json({

      success: true,

      message:
      'Logged out successfully',

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
FORGOT PASSWORD
=====================================
*/

const forgotPassword =
async (
  req,
  res,
  next
) => {

  try {

    const result =
    await forgotPasswordService(
      req.body.email
    );



    res.status(200).json({

      success: true,

      message:
      'Reset token generated',

      resetToken:
      result.resetToken,

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
RESET PASSWORD
=====================================
*/

const resetPassword =
async (
  req,
  res,
  next
) => {

  try {

    await resetPasswordService(

      req.params.token,

      req.body.password
    );



    res.status(200).json({

      success: true,

      message:
      'Password reset successful',

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
VERIFY EMAIL
=====================================
*/

const verifyEmail =
async (
  req,
  res,
  next
) => {

  try {

    await verifyEmailService(
      req.params.token
    );



    res.status(200).json({

      success: true,

      message:
      'Email verified successfully',

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
GET CURRENT USER
=====================================
*/

const getMe =
async (
  req,
  res,
  next
) => {

  try {

    const user =
    await getCurrentUserService(
      req.user._id
    );



    res.status(200).json({

      success: true,

      user,

    });

  } catch (error) {

    next(error);
  }
};



const updateProfile =
async (
  req,
  res,
  next
) => {

  try {

    const user =
    await User.findById(
      req.user._id
    );



    if (!user) {

      return res.status(404)
      .json({

        success: false,

        message:
        'User not found',

      });
    }



    user.name =
    req.body.name ||
    user.name;



    user.bio =
    req.body.bio ||
    user.bio;



    user.phone =
    req.body.phone ||
    user.phone;



    user.country =
    req.body.country ||
    user.country;



    user.website =
    req.body.website ||
    user.website;



    user.username =
    req.body.username ||
    user.username;



    await user.save();



    res.status(200).json({

      success: true,

      message:
      'Profile updated',

      user:
      sanitizeUser(user),

    });

  } catch (error) {

    next(error);
  }
};





/*
=====================================
UPLOAD AVATAR
=====================================
*/

const uploadAvatar =
async (
  req,
  res,
  next
) => {

  try {

    const avatarUrl =
    await uploadAvatarService(
      req.file
    );



    const user =
    await User.findById(
      req.user._id
    );



    user.avatar =
    avatarUrl;



    await user.save();



    res.status(200).json({

      success: true,

      message:
      'Avatar uploaded',

      avatar:
      avatarUrl,

    });

  } catch (error) {

    next(error);
  }
};




/*
=====================================
CHANGE PASSWORD
=====================================
*/

const changePassword =
async (
  req,
  res,
  next
) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;



    const user =
    await User.findById(
      req.user._id
    );



    const isMatch =
    await comparePassword(

      currentPassword,

      user.password
    );



    if (!isMatch) {

      return res.status(400)
      .json({

        success: false,

        message:
        'Current password incorrect',

      });
    }



    user.password =
    await hashPassword(
      newPassword
    );



    await user.save();



    res.status(200).json({

      success: true,

      message:
      'Password updated',

    });

  } catch (error) {

    next(error);
  }
};







module.exports = {

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

};