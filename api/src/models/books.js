const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  name: String,
  author: [String],
  editorial: String,
  price: Number,
  categroy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Category
  },
  synopsis: String,
  format: String,        //posibles valores -> digital, hard cover, paperback
  edition: Number,
  language: String,
  ISBN: Number,
  rating: Number,
  stock: Number,
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Reviews
  },
  image: String
})

module.exports = mongoose.model("Books", booksSchema)
