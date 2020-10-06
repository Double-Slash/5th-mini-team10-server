const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subchallenge = require("./subchallenge");

const challengeSchema = new Schema(
    {
      title: {
          type: String
      },
      imageUrl: {
        type: String
      },
      text: {
        type: String
      },
      subchallenges: [{ type: Schema.Types.ObjectId, ref: "Subchallenge" }],
      id: mongoose.Schema.Types.ObjectId //chllengeId 
    }
);

module.exports = mongoose.model("Challenge", challengeSchema);