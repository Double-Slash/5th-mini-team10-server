const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubChallenge = require("./subChallenge");

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
      subChallenge: [{ type: Schema.Types.ObjectId, ref: "SubChallenge" }],
      id: mongoose.Schema.Types.ObjectId //chllengeId 
    }
);

module.exports = mongoose.model("Challenge", challengeSchema);