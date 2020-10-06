const User = require("../models/user");
const passport = require("passport");
const jsonWebToken = require("jsonwebtoken");
const httpStatus = require("http-status-codes");
require('dotenv').config({path : '../process.env'});

const getUserParams = body => {
    return {
      email: body.email,
      nickname : body.nickname,
      password: body.password
    };
};

module.exports = {
  
  signUp: (req, res, next) => {
    //if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => { 
      if (user) {
        res.json({ success: true});
      } else {
        console.log(error);
        res.json({success: false});
        next();
      }
    });
  },

  authSignIn: (req, res, next) => {
    passport.authenticate("local", (errors, user) => { 
      if (user) {
        let signedToken = jsonWebToken.sign(
          {
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 7)
          },
          'aa'
        );
        res.json({
          success: true,
          token: signedToken,
          nickname : user.nickname
        });
      } else
        res.json({
          success: false,
          message: "로그인 실패"
        });
    })(req, res, next);
  },

  
  verifyJWT: (req, res, next) => {
    let token = req.headers.token;
    if (token) {
      jsonWebToken.verify(token, 'aa', (errors, payload) => {
        if (payload) {
          User.findById(payload.data).then(user => {
            if (user) {
              res.user = user;
              next();
            } else {
              res.status(httpStatus.FORBIDDEN).json({
                success: false,
                message: "회원 계정을 찾을 수 없습니다."
              });
            }
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: "토큰을 확인할 수 없습니다."
          });
          next();
        }
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "토큰이 없습니다."
      });
      next();
    }
  },

  getRank : (req,res) =>{
    User.find({},{nickname:1, weekChallengeCount:1})
      .sort('-weekChallengeCount')
      .limit(10)
      .then(users =>{
        res.json({ 
          success : true,
          user : users
        });
      })
      .catch(error => {
        console.log(`Error : ${error.message}`);
      });
  }

};


