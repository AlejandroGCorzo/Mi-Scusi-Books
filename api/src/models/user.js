const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    dni: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      street: String,
      number: Number,
      floor: Number,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    loyaltyPoint: {
      type: Number,
    },
    state: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bills",
    },
  }, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
