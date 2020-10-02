const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/create', userController.validate, userController.create, userController.apiAuthenticate ); //signUp
router.post('/login', userController.apiAuthenticate); 
router.use(userController.verifyJWT);
router.get('/logout', userController.logout);

router.use(userController.errorJSON);




module.exports = router;