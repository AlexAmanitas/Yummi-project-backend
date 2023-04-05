const validateBody = require('./validateBody');
const auth = require('./auth');
const upload = require('./multer');
const jimp = require('./jimp');
const uploadAvatarCloud = require('./uploadCloudinary');
const uploadRecipeImage = require('./uploadRecipeImage');

module.exports = {
  validateBody,
  auth,
  upload,
  jimp,
  uploadAvatarCloud,
  uploadRecipeImage,
};
