const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  text: {
    type:String,
    required: true
  },
  votes: {
    upvotes: Number,
    downvotes: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: Number
})


module.exports = mongoose.model("Review", reviewSchema)