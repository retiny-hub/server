const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: String,
  file: String,
  generalInformation: String,
  additionalInformation: String,
  comments: String,
  pub:Number,
  paid:false,
  price:Number,
  published:false,
  manuscript: String,
  payment:{amount:Number,date:Date},
  approved: {
    type: String,
    default: "pending",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Manuscript", schema);
