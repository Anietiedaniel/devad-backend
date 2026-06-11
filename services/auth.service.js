// services/auth.service.js

const jwt =
require('jsonwebtoken');

const User =
require('../models/User');

const hashPassword =
require('../utils/hashPassword');

const comparePassword =
require('../utils/comparePassword');

const generateAccessToken =
require('../utils/generateAccessToken');

const generateRefreshToken =
require('../utils/generateRefreshToken');

const generateVerificationToken =
require('../utils/generateVerificationToken');

const generateResetToken =
require('../utils/generateResetToken');

const sanitizeUser =
require('../utils/sanitizeUser');

const generateUsername =
require('../utils/generateUsername');

const verifyGoogleToken =
require('../utils/verifyGoogleToken');

const EmailService =
require('./email.service');



/*
=====================================
REGISTER
=====================================
*/

/*
=====================================
REGISTER SERVICE (FIXED)
=====================================
*/
const registerService = async (userData) => {
  const { name, email, password } = userData;

  // CHECK EXISTING USER
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // HASH PASSWORD
  const hashedPassword = await hashPassword(password);

  // USERNAME
  const username = generateUsername(name);

  // EMAIL TOKEN
  const verificationToken = generateVerificationToken();

  // 1. Instantiate the user model in memory instead of creating it in the DB yet
  const user = new User({
    name,
    username,
    email,
    password: hashedPassword,
    verificationToken,
  });

  // 2. Generate tokens using the pre-constructed user._id
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // 3. Assign the refresh token to the in-memory document
  user.refreshToken = refreshToken;

  // 4. Save to the database exactly ONCE. This will cleanly pass validation.
  await user.save();

  await EmailService.sendVerificationEmail({

    email:
    user.email,

    name:
    user.name,

    verificationUrl:
    `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`,

  });

  return {
    accessToken,
    refreshToken,
    user: sanitizeUser(user),
  };
};


/*
=====================================
LOGIN
=====================================
*/

const loginService =
async (
  email,
  password
) => {

  // FIND USER
  const user =
  await User.findOne({
    email,
  });



  if (!user) {

    throw new Error(
      'Invalid credentials'
    );
  }



  // BLOCK CHECK
  if (
  user.isBlocked
) {

  await EmailService
  .sendAccountBlockedEmail({

    email:
    user.email,

    name:
    user.name,

  });

  throw new Error(
    'Account blocked'
  );
}

  // LOCK CHECK
  if (

    user.lockUntil &&

    user.lockUntil >
    Date.now()

  ) {

    throw new Error(
      'Account temporarily locked'
    );
  }



  // PASSWORD CHECK
  const isMatch =
  await comparePassword(

    password,

    user.password
  );



  if (!isMatch) {

    user.loginAttempts += 1;



    if (
      user.loginAttempts >= 5
    ) {

      user.lockUntil =
      Date.now() +
      15 * 60 * 1000;
    }



    await user.save();



    throw new Error(
      'Invalid credentials'
    );
  }



  // RESET ATTEMPTS
  user.loginAttempts = 0;

  user.lockUntil = null;

  user.lastLogin =
  new Date();



  // TOKENS
  const accessToken =
  generateAccessToken(
    user._id
  );



  const refreshToken =
  generateRefreshToken(
    user._id
  );



  user.refreshToken =
  refreshToken;



  await user.save();

  await EmailService
.sendLoginAlertEmail({

  email:
  user.email,

  name:
  user.name,

  ip:
  'Unknown',

  location:
  'Unknown',

  time:
  new Date()
  .toLocaleString(),

});



  return {

    accessToken,

    refreshToken,

    user:
    sanitizeUser(user),

  };
};





/*
=====================================
REFRESH TOKEN
=====================================
*/

const refreshTokenService =
async (
  refreshToken
) => {

  if (!refreshToken) {

    throw new Error(
      'No refresh token'
    );
  }



  const decoded =
  jwt.verify(

    refreshToken,

    process.env
    .JWT_REFRESH_SECRET
  );



  const user =
  await User.findById(
    decoded.id
  );



  if (
    !user ||

    user.refreshToken !==
    refreshToken
  ) {

    throw new Error(
      'Invalid refresh token'
    );
  }



  const newAccessToken =
  generateAccessToken(
    user._id
  );



  return {
    accessToken:
    newAccessToken,
  };
};





/*
=====================================
LOGOUT
=====================================
*/

const logoutService =
async (
  refreshToken
) => {

  if (!refreshToken)
  return;



  const user =
  await User.findOne({

    refreshToken,
  });



  if (user) {

    user.refreshToken =
    null;

    await user.save();
  }



  return true;
};





/*
=====================================
FORGOT PASSWORD
=====================================
*/

const forgotPasswordService =
async (
  email
) => {

  const user =
  await User.findOne({
    email,
  });



  if (!user) {

    throw new Error(
      'User not found'
    );
  }



  const resetToken =
  generateResetToken();



  user.resetPasswordToken =
  resetToken;

  user.resetPasswordExpire =
  Date.now() +
  10 * 60 * 1000;



  await user.save();

  await EmailService
.sendPasswordResetEmail({

  email:
  user.email,

  name:
  user.name,

  resetUrl:
  `${process.env.CLIENT_URL}/reset-password/${resetToken}`,

  });

  return {
    resetToken,
  };
};





/*
=====================================
RESET PASSWORD
=====================================
*/

const resetPasswordService =
async (
  token,
  password
) => {

  const user =
  await User.findOne({

    resetPasswordToken:
    token,

    resetPasswordExpire: {
      $gt: Date.now(),
    },

  });



  if (!user) {

    throw new Error(
      'Invalid or expired token'
    );
  }



  const hashedPassword =
  await hashPassword(
    password
  );



  user.password =
  hashedPassword;

  user.resetPasswordToken =
  null;

  user.resetPasswordExpire =
  null;



  await user.save();

  await EmailService
.sendPasswordChangedEmail({

  email:
  user.email,

  name:
  user.name,

});



  return true;
};





/*
=====================================
VERIFY EMAIL
=====================================
*/

const verifyEmailService =
async (
  token
) => {

  const user =
  await User.findOne({

    verificationToken:
    token,

  });



  if (!user) {

    throw new Error(
      'Invalid token'
    );
  }



  user.isVerified =
  true;

  user.verificationToken =
  null;



  await user.save();

  await EmailService
.sendWelcomeEmail({

    email:
    user.email,

    name:
    user.name,

  });

  return true;
};





/*
=====================================
GET CURRENT USER
=====================================
*/

const getCurrentUserService =
async (
  userId
) => {

  const user =
  await User.findById(
    userId
  ).select('-password');



  if (!user) {

    throw new Error(
      'User not found'
    );
  }



  return sanitizeUser(
    user
  );
};


/*
=====================================
GOOGLE AUTH
=====================================
*/

const googleAuthService =
async (
  googleToken
) => {

  // VERIFY GOOGLE TOKEN
  const payload =
  await verifyGoogleToken(
    googleToken
  );



  const {
    email,
    name,
    picture,
    sub,
  } = payload;



  // FIND USER
  let user =
  await User.findOne({
    email,
  });



  // CREATE USER
  if (!user) {

    const username =
    generateUsername(
      name
    );



    user =
    await User.create({

      name,

      username,

      email,

      avatar:
      picture,

      googleId:
      sub,

      isVerified:
      true,

    });
  }



  // BLOCK CHECK
if (
  user.isBlocked
) {

  await EmailService
  .sendAccountBlockedEmail({

    email:
    user.email,

    name:
    user.name,

  });

  throw new Error(
    'Account blocked'
  );
}



  // UPDATE LOGIN
  user.lastLogin =
  new Date();



  // TOKENS
  const accessToken =
  generateAccessToken(
    user._id
  );



  const refreshToken =
  generateRefreshToken(
    user._id
  );



  user.refreshToken =
  refreshToken;



  await user.save();

  await EmailService
.sendLoginAlertEmail({

  email:
  user.email,

  name:
  user.name,

  ip:
  'Google Login',

  location:
  'Unknown',

  time:
  new Date()
  .toLocaleString(),

});

  return {

    accessToken,

    refreshToken,

    user:
    sanitizeUser(user),

  };
};





module.exports = {

  registerService,

  loginService,

  refreshTokenService,

  logoutService,

  forgotPasswordService,

  resetPasswordService,

  verifyEmailService,

  getCurrentUserService,

  googleAuthService

};