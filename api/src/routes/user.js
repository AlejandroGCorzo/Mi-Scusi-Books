const { Router } = require("express");
const userSchema = require("../models/user");

const userRouter = Router();

//create user

userRouter.post("/", (req, res) => {
  const newUser = userSchema(req.body);
  newUser
    .save()
    .then((response) => res.json({ message:response}))
    .catch((error) => res.json({ message: error }));
});

module.exports = userRouter;
