const User = require("../models/user.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = async (req, res, next) => {
//  console.log('headers', req.headers.authorization)

  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      accessToken = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      //Get all user info
      req.user = await User.findOne({
        _id: decoded.id,
      }).select("-password");
      next();
    } catch (e) {
      return res.status(302).json({ msg: "Not authorized protect" });
    }
  } else {
    return res.status(302).json({ msg: "Log in required" });
  }
};

module.exports = { protect };
