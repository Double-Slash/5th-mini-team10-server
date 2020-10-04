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
      nickname: {
          type: String,
          trim: true
      },
      password : {
          type : String
      },
      weekChallengeCount: { 
          type: Number, 
          default: 0 
      },
      id: mongoose.Schema.Types.ObjectId
    },
    {
      timestamps: true
    }
  );

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);