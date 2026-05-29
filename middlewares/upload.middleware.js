const multer = require('multer');


// ===============================
// STORAGE (memory for cloud upload)
// ===============================
const storage = multer.memoryStorage();


// ===============================
// FILE FILTER (optional but recommended)
// ===============================
const fileFilter = (req, file, cb) => {

  // allow only images
  if (
    file.mimetype.startsWith('image/')
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Only image files are allowed'),
      false
    );
  }

};


// ===============================
// MULTER CONFIG
// ===============================
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },

});


// ===============================
// EXPORT (IMPORTANT)
// ===============================
module.exports = upload;