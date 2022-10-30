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
    type: String,
  },
  userEmail: String,
  rating: Number,
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books"
  }
})


module.exports = mongoose.model("Review", reviewSchema)