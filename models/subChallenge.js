const mongoose = require("mongoose");
const { Schema } = mongoose;

const subchallengeSchema = new Schema(
    {
      title: {
          type: String
      },
      participate : {
          type : Number,
          default : 0
      },
      id: mongoose.Schema.Types.ObjectId //subChallengeId
    }
);

module.exports = mongoose.model("Subchallenge", subchallengeSchema);