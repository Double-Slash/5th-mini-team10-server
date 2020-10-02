const router = require('express').Router();
const userRoutes = require('./userRoutes');
const challengeRoutes = require('./challengeRoutes');
const feedRoutes = require('./feedRoutes');
const rankRoutes = require('./rankRoutes');
const errorRoutes = require("./errorRoutes");
const { route } = require('./userRoutes');

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);
router.use('/feed', feedRoutes);
router.use('/rank', rankRoutes);
router.user('/', errorRoutes);



module.exports = router;
