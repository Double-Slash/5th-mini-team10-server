const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const feedSchema = new Schema(
    {
      imageUrl: {
        type: String
      },
      created: {
        type: Date,
        default: Date.now,
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      id: mongoose.Schema.Types.ObjectId //feedId 
    }
);

module.exports = mongoose.model("Feed", feedSchema);