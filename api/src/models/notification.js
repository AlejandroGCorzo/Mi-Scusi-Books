const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    type: String ,
    user: {
      type: mongoose.Schema.Types.Mixed
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    date: {
      type: Date,
    },
    admin: {
      type: Array,
      default: []
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Notification", notificationSchema);
