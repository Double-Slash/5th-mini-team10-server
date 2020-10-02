const mongoose = require("mongoose");
const { Schema } = mongoose;
const Challenge = require("./challenge");

const challengesSchema = new Schema(
    {
      title: {
          type: String
      },
      image: {
        type: String
      },
      text: {
        type: String
      },
      challenge: [{ type: Schema.Types.ObjectId, ref: "Challenge" }]
    }
);

module.exports = mongoose.model("Challenges", challengesSchema);