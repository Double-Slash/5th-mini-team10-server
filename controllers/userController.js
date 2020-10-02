const User = require("../models/user");
const passport = require("passport");
const jsonWebToken = require("jsonwebtoken");

const getUserParams = body => {
    return {
      email: body.email,
      nickname : body.nickname,
      passwd: body.password
    };
};

module.exports = {
  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        //success
        next();
      } else {
        //error 
        next();
      }
    });
  },


  validate: (req, res, next) => {
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("password", "Password cannot be empty").notEmpty();

    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        req.skip = true;
        next();
      } else {
        next();
      }
    });
  },


  logout: (req, res, next) => {
    req.logout();
    next();
  },


  apiAuthenticate: (req, res, next) => {
    passport.authenticate("local", (errors, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign(
          {
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1)
          },
          "secret_encoding_passphrase"
        );
        res.json({
          success: true,
          token: signedToken
        });
      } else
        res.json({
          success: false,
          message: "Could not authenticate user."
        });
    })(req, res, next);
  },

  
  verifyJWT: (req, res, next) => {
    let token = req.headers.token;
    if (token) {
      jsonWebToken.verify(token, "secret_encoding_passphrase", (errors, payload) => {
        if (payload) {
          User.findById(payload.data).then(user => {
            if (user) {
              next();
            } else {
              res.status(httpStatus.FORBIDDEN).json({
                error: true,
                message: "No User account found."
              });
            }
          });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: "Cannot verify API token."
          });
          next();
        }
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: true,
        message: "Provide Token"
      });
    }
  }
};