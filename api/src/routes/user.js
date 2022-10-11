const { Router } = require("express");
const userSchema = require("../models/user");
const User = require("../models/user");

const userRouter = Router();

//create user

userRouter.post("/", (req, res) => {
  const newUser = userSchema(req.body);
  newUser
    .save()
    .then((response) => res.json({ message:response}))
    .catch((error) => res.json({ message: error }));
});


//log-in
userRouter.get('/login', async(req, res) => {
  const { userName, password } = req.body

  if(!userName || !password) {
    res.status(400).json({msg: "Missing user name and/or password"})
  }

  const user = await User.findOne({userName}) 
  console.log(user)
  console.log(user.password)
  if(user.password === password) {
    return res.status(200).json({msg: "Logueo exitoso"})
  } else {
    return res.status(400).json({msg: "password or user name invalid"})
  }
})


module.exports = userRouter;
