const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    dni: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    address: {
      street: String,
      number: Number,
      floor: Number,
    },
    birthdate: {
      type: String,
    },
    loyaltyPoint: {
      type: Number,
    },
    state: {
      type: String,
      default: "Pending"
    },
    type: {
      type: String,
      default: "Normal"
    },
    bills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bills",

    },
  }, { timestamps: false }
);

module.exports = mongoose.model("User", userSchema);
