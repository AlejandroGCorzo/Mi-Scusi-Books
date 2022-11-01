const mongoose = require("mongoose");

const billsSchema = mongoose.Schema({
  books: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Books",
  },
  amountBooks: [Number],
  price: {
    type: [Number],
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
  },
  discount: {
    type: Number,
  },
  loyaltyPoint: {
    type: Number,
  },
  shipp: {
    type: Number
  },
  address: Object
});

module.exports = mongoose.model("Bills", billsSchema);
