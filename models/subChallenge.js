const mongoose = require("mongoose");
const { Schema } = mongoose;

const subChallengeSchema = new Schema(
    {
      title: {
          type: String
      },
      id: mongoose.Schema.Types.ObjectId //subChallengeId
    }
);

module.exports = mongoose.model("subChallenge", subChallengeSchema);