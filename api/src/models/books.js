const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: [String],
    required: true
  },
  editorial: {
    type: String,
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
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Reviews"
  },
  image: {
    type: String,
    required: true
  },
  unitSold:{
    type: Number,
  }
})

//remove __v from books
booksSchema.set('toJSON', {
   transform: (document, returnedObject)=>{
     delete returnedObject.__v
   }
})

module.exports = mongoose.model("Books", booksSchema)
