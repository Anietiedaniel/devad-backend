const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  console.log("--> [VALIDATOR] Incoming request body:", req.body);
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    console.log("❌ [VALIDATOR] Validation failed! Errors found:", errors.array());
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  
  console.log("✅ [VALIDATOR] Validation passed cleanly. Proceeding to controller.");
  next(); 
};

module.exports = validate;
