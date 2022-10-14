const User = require("../models/user.js");
const axios = require("axios");

const protect = async (req, res, next) => {
  let accesToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(accesToken);
    try {
      accesToken = req.headers.authorization.split(" ")[1];
      const response = await axios.get(
        "https://miscusibooks.us.auth0.com/userinfo",
        {
          headers: {
            authorization: `Bearer ${accesToken}`,
          },
        }
      );

      //Get all user info
      req.user = await User.findOne({
        email: response.data.email,
        state: "active",
      }).select("-password");
      next();
    } catch (e) {
      res.status(302).json({ msg: "Not authorized" });
    }
  }
  if (!accesToken) {
    res.status(302).json({ msg: "Not authorized" });
  }
};

module.exports = { protect };
