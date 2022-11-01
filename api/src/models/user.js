const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    password: {
      type: String,
    },
    firstName: {
      type: String,
      default: "empty",
    },
    lastName: {
      type: String,
      default: "empty",
    },
    email: {
      type: String,
    },
    dni: {
      type: String,
      default: "0",
    },
    phone: {
      type: Number,
      default: 0,
    },
    birthdate: {
      type: String,
      default: "empty",
    },
    loyaltyPoint: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
      default: "pending",
    },
    type: {
      type: String,
      default: "normal",
    },
    buyedBooks: {
      type: Array,
    },
    votedBooks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Books",
    },
    votedReviews: [
      {
        review: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
        vote: String,
      },
    ],
    favorites: {
      type: Array,
    },
    cart: {
      type: Array,
    },
    image: String,
    resetToken: String,
  },
  { timestamps: false }
);

module.exports = mongoose.model("User", userSchema);
