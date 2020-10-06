const router = require("express").Router();
const challengeController = require("../controllers/challengeController");
const userController = require('../controllers/userController');

router.get("/all", challengeController.showAll);
router.get("/detail/:id",userController.verifyJWT, challengeController.showDetail); // :id는 challengeId 
router.put("/do/subchallenge/:id", userController.verifyJWT, challengeController.doChallenge);

module.exports = router;