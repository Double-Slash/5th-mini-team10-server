const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubChallenge = require("./subChallenge");
const User = require("./user");

const userChallengeSchema = new Schema(
    {
        participate: {
        type: Number,
        default : 0
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      subChallenge: { type: Schema.Types.ObjectId, ref: "SubChallenge" },
    }
);

module.exports = mongoose.model("userChallenge", userChallengeSchema);