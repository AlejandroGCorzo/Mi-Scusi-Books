const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: String,
    description: String,
  },
  { timestamps: false }
);

module.exports = mongoose.model("Report", reportSchema);
