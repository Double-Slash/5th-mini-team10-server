const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      // apiToken: {
      //   type: String
      // },
      nickname: {
          type: String,
          trim: true
      },
      passwd : {

      }
    },
    {
      timestamps: true
    }
  );

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);