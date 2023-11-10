const path = require('path');
const multer = require('multer');

//multer store file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('لطفا یک عکس با فرمت jpg/jpeg/png انتخاب کتید');
  },
}).single('image');

module.exports = uploadImage;
