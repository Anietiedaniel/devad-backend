const {
  body,
} = require(
  'express-validator'
);





/*
=====================================
REGISTER VALIDATOR
=====================================
*/

const registerValidator = [

  body('name')

  .trim()

  .notEmpty()

  .withMessage(
    'Name is required'
  )

  .isLength({
    min: 2,
    max: 50,
  })

  .withMessage(
    'Name must be between 2 and 50 characters'
  ),



  body('email')

  .trim()

  .notEmpty()

  .withMessage(
    'Email is required'
  )

  .isEmail()

  .withMessage(
    'Invalid email address'
  )

  .normalizeEmail(),



  body('password')

  .notEmpty()

  .withMessage(
    'Password is required'
  )

  .isLength({
    min: 6,
  })

  .withMessage(
    'Password must be at least 6 characters'
  )

  .matches(/[A-Z]/)

  .withMessage(
    'Password must contain uppercase letter'
  )

  .matches(/[a-z]/)

  .withMessage(
    'Password must contain lowercase letter'
  )

  .matches(/[0-9]/)

  .withMessage(
    'Password must contain a number'
  ),

];





/*
=====================================
LOGIN VALIDATOR
=====================================
*/

const loginValidator = [

  body('email')

  .trim()

  .notEmpty()

  .withMessage(
    'Email is required'
  )

  .isEmail()

  .withMessage(
    'Invalid email'
  ),



  body('password')

  .notEmpty()

  .withMessage(
    'Password is required'
  ),

];





/*
=====================================
FORGOT PASSWORD VALIDATOR
=====================================
*/

const forgotPasswordValidator = [

  body('email')

  .trim()

  .notEmpty()

  .withMessage(
    'Email is required'
  )

  .isEmail()

  .withMessage(
    'Invalid email'
  ),

];





/*
=====================================
RESET PASSWORD VALIDATOR
=====================================
*/

const resetPasswordValidator = [

  body('password')

  .notEmpty()

  .withMessage(
    'Password is required'
  )

  .isLength({
    min: 6,
  })

  .withMessage(
    'Password must be at least 6 characters'
  ),

];





/*
=====================================
GOOGLE AUTH VALIDATOR
=====================================
*/

const googleAuthValidator = [

  body('token')

  .notEmpty()

  .withMessage(
    'Google token required'
  ),

];





/*
=====================================
UPDATE PROFILE VALIDATOR
=====================================
*/

const updateProfileValidator = [

  body('name')

  .optional()

  .isLength({
    min: 2,
    max: 50,
  })

  .withMessage(
    'Name must be between 2 and 50 characters'
  ),

];





/*
=====================================
CHANGE PASSWORD VALIDATOR
=====================================
*/

const changePasswordValidator = [

  body('currentPassword')

  .notEmpty()

  .withMessage(
    'Current password required'
  ),



  body('newPassword')

  .isLength({
    min: 6,
  })

  .withMessage(
    'Password must be at least 6 characters'
  ),

];





module.exports = {

  registerValidator,

  loginValidator,

  forgotPasswordValidator,

  resetPasswordValidator,

  googleAuthValidator,

  updateProfileValidator,

  changePasswordValidator,

};