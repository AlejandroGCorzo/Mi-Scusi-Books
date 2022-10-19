const User = require("../models/user.js");
const axios = require("axios");
const jwt = require("jsonwebtoken")
require('dotenv').config()


const protect = async (req, res, next) => {
  console.log('headers', req.headers)
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
   
    try {
      accessToken = req.headers.authorization.split(" ")[1];
      console.log('token protect', accessToken);
      // const response = await axios.get(
      //   "https://miscusibooks.us.auth0.com/userinfo",
      //   {
      //     headers: {
      //       authorization: `Bearer ${accesToken}`,
      //     },
      //   }
      // );
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
      console.log('dec', decoded)

      //Get all user info
      req.user = await User.findOne({
        _id: decoded.id
      }).select("-password");
      console.log('user protect', req.user.id)
      next();
    } catch (e) {
      res.status(302).json({ msg: "Not authorized protect" });
      next()
    }
  } else {
    return res.status(302).json({ msg: "Log in required" });
  }
};

module.exports = { protect };
