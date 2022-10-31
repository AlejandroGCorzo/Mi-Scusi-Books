const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  author: {
    type: [String],
    lowercase: true,
    required: true
  },
  editorial: {
    type: String,
    lowercase: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  format: {
    type: String,  //posibles valores -> digital, hard cover, paperback
    required: true
  },       
  edition:{
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  ISBN: {
    type: Number,
    required: true
  },
  rating: {
    type: [Number],
  },
  stock: {
    type: Number,
    required: true
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Review"
  },
  image: {
    type: String,
    required: true
  },
  unitSold:{
    type: Number
  },
  deleted: {
    type: Boolean
  },
  url:{
    type: String
  }
})

//remove __v from books
booksSchema.set('toJSON', {
   transform: (document, returnedObject)=>{
     delete returnedObject.__v
   }
})

module.exports = mongoose.model("Books", booksSchema)
