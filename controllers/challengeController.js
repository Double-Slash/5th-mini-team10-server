const Challenge = require('../models/challenge');
const Userchallenge = require('../models/userchallenge');
const httpStatus = require("http-status-codes");
const User = require('../models/user');

module.exports = {
 showAll: (req, res, next) => {
  Challenge.find({})
      .then(challenges => {
        res.json({success : true, challenge : challenges});
      })
      .catch(error => {
        console.log(`Error : ${error.message}`);
        res.json({success : false})
        next(error);
      });
  },

  showDetail: (req, res, next) => {
    let challengeId = req.params.id;
    let userId = res.user._id;
    let dd;
    
    //To FIX !!! 
    Challenge.findOne({_id : challengeId}).populate('subchallenges')
      .then(data =>{
            dd = data;
            var idx = 0;
            for(let value of dd.subchallenges){
              let subchallengeId = value._id ;
              let uc = Userchallenge.findOne({'user': userId, 'subChallenge' : subchallengeId}).exec();
              uc.then(result => {
                if(result) value.participate = result.count;
                else value.participate = 0;
                idx++;
              })
              .then(()=>{
                if(idx==dd.subchallenges.length){
                  res.json(dd);
                }
              })
            }
      })
      .catch(error => {
        res.json({success : false})
        console.log(error.message);
      });
      
  },

  doChallenge: (req, res, next) => {
      let userId = res.user._id;
      let subchallengeId = req.params.id;
      let count;
      Userchallenge.findOne({'user': userId, 'subChallenge' : subchallengeId})
        .then(uchallenge => {
          if(uchallenge){
            uchallenge.count++;
            count = uchallenge.count;
            uchallenge.save();
          }else{
            Userchallenge.create({'user' : userId, 'subChallenge' : subchallengeId, 'count' : 1})
              .then(feed => {
                console.log('success');
                count = 1;
              })
              .catch(error => {
                console.log(`Error : ${error.message}`);
                res.json({success : false})
                next(error);
              });
          }
        })
        .then(
          User.findOne({'_id' : userId})
          .then(user =>{
            if(user){
              user.weekChallengeCount++;
              user.save();
              res.json({'success' : true, 'count' : count})
            }else{
              console.log('사용자가 없습니다');
            }
          })
        )
        .catch(error => {
          console.log(`Error counting challenge: ${error.message}`);
          res.json({success : false})
          next(error);
        });
  },
};
