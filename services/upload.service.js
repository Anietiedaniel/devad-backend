const cloudinary =
require('../config/cloudinary');



const uploadAvatarService =
async (file) => {

  if (!file) {

    throw new Error(
      'No file uploaded'
    );
  }



  const base64 =
  `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;



  const result =
  await cloudinary.uploader.upload(
    base64,
    {

      folder:
      'academy/avatars',

    }
  );



  return result.secure_url;
};

module.exports = {

  uploadAvatarService,

};