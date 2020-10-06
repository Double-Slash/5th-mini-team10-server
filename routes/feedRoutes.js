const router = require('express').Router();
const feedController = require('../controllers/feedController');
const userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'images/feed/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname)) 
    }
  });

const upload = multer({storage: storage});
  
router.get('/',feedController.show);
router.post('/upload', userController.verifyJWT, upload.single('image'), feedController.uploadFile); 
router.get("/detail/:id", feedController.showDetail);

module.exports = router;