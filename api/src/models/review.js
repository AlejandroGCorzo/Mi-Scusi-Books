const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  text: String,
  votes: {
    upvotes: Number,
    downvotes: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})


module.exports = mongoose.model("Review", reviewSchema)