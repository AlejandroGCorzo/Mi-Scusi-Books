const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
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
    },
    address: {
      street: String,
      number: Number,
      floor: Number,
    },
    birthdate: {
      type: String,
      required: true,
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
