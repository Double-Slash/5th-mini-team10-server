const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subchallenge = require("./subchallenge");
const User = require("./user");

const userchallengeSchema = new Schema(
    {
        count: {
          type: Number,
          default : 0
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      subChallenge: { type: Schema.Types.ObjectId, ref: "Subchallenge" },
    }
);

module.exports = mongoose.model("Userchallenge", userchallengeSchema);