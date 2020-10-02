const router = require("express").Router();
const challengeController = require("../controllers/challengeController");

router.get("/all", challengeController.showAll);
router.get("/:id", challengeController.showDetail); // :id는 challengeId 
router.put("/", challengeController.doChallenge);

module.exports = router;