const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/images');
    },
    filename: (req, file, cb) => {
        const suffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '_' + suffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

module.exports = upload;