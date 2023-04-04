const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});
cloudinary.image({
  secure: true,
  transformation: [
    { width: 150, height: 150, gravity: 'face', crop: 'thumb' },
    { radius: 20 },
    { effect: 'sepia' },
    {
      overlay: 'cloudinary_icon_blue',
      gravity: 'south_east',
      x: 5,
      y: 5,
      width: 50,
      opacity: 60,
      effect: 'brightness:200',
    },
    { angle: 10 },
  ],
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'avatars',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  transformation: [
    { width: 150, height: 150, gravity: 'face', crop: 'thumb' },
    { radius: 20 },
  ],
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
