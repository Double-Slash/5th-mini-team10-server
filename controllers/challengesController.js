const Challenges = require("../models/challenges");

module.exports = {
 showAll: (req, res, next) => {
    Subscriber.find({})
      .then(subscribers => {
        res.json = subscribers;
        next();
      })
      .catch(error => {
        console.log(`Error : ${error.message}`);
        next(error);
      });
  },

  showDetail: (req, res, next) => {
    let challengesId = req.params.id;
    Challenges.findById(challengesId)
      .then(Challenge => {
        res.json = Challenge;
        next();
      })
      .catch(error => {
        console.log(`Error fetching challenge by ID: ${error.message}`);
        next(error);
      });
  },

  doChallenge: (req, res, next) => {
      challengeParams = {
        challengesId: req.body.id,
        participate: req.body.participate,
      };

    Challenges.findByIdAndUpdate(challengesId, {
      $set: challengeParams
    })
      .then(challenge => {
        //success
        next();
      })
      .catch(error => {
        console.log(`Error counting challenge: ${error.message}`);
        next(error);
      });
  },
};