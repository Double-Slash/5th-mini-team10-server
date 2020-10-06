const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const feedRoutes = require('./feedRoutes');
const errorRoutes = require("./errorRoutes");

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);
router.use('/feed', feedRoutes);
//router.use('/', errorRoutes);

module.exports = router;
