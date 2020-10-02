const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const router = require('./routes/index');
const User = require("./models/user");
const app = express();

//DB Setting 
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI,
  {useNewUrlParser : true}
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", ()=> {
  console.log("successfully connected to mongoDB");
})



app.set("port", process.env.PORT || 3000);
app.set("token", process.env.TOKEN || "abc");

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(express.json());
app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);


app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});
app.use(expressValidator());

app.use("/", router);


const server = app.listen(app.get("port"), () => {
  console.log(`Server running at ${app.get("port")}`);
});


module.exports = app;
