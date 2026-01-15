const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const fileName= Date.now() + '-' + Math.round(Math.random())+path.extname(file.originalname);
    cb(null, fileName)
  }

})

const upload = multer({ storage: storage })

module.exports = upload;