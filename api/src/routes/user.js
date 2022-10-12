const { Router } = require("express");
const User = require("../models/user");
const axios = require("axios");


const userRouter = Router();

//create user

userRouter.get("/protected", async (req,res) => {
  try{
    const accesToken = req.headers.authorization.split(' ')[1]
    console.log(accesToken)
    const response = await axios.get('https://miscusibooks.us.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${accesToken}`
      }
    })
    const userInfo = response.data
    console.log(userInfo);
    res.send(userInfo)
  } catch(e){
    res.send(e.message)
  }
})

userRouter.post("/", async (req, res) => {
  try {
    const {
      userName,
      password,
      firstName,
      lastName,
      email,
      dni,
      phone,
      address,
      birthdate,
    } = req.body;

    if (
      !userName ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      !dni ||
      !birthdate
    )
      return res.status(400).send("necessary data missing!");

    const repeatedUsername = await User.findOne({ userName: userName });
    if (repeatedUsername) return res.status(400).send("Username alredy exist!");

    const newUser = await User.create(req.body);
    res.send("User created successfully!");
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ msg: "Id not found!" });
  try {
    const searchedUser = await User.findById(id);
    if (!searchedUser) return res.status(400).send({ msg: "User not found!" });
    res.send(searchedUser);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ msg: "Not id found!" });
  try {
    const userDeleted = await User.deleteOne({ _id: id });
    if (!userDeleted.deletedCount) return res.send("User not found!");
    res.send({msg:"User deleted successfully!"});
  } catch (e) {
    res.status(400).send({ msg: e });
  }
});

userRouter.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ msg: "Not id found!" });
  try {
    const deletedUser = await User.updateOne({ _id: id }, { $set: {state : "Inactive"} });
    if(!deletedUser.matchedCount) return res.send("User not found!");
    res.send({msg:"User deleted successfully!"});
  } catch (e) {
    res.status(400).send({ msg: e });
  }
});

userRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (!id) return res.status(400).send({ msg: "Not id found!" });
  try {
    const updatedUser = await User.updateOne({ _id: id }, { $set: update });
    res.send({msg : "User updated successfully!"});
  } catch (e) {
    res.status(400).send({ msg: e });
  }
});




module.exports = userRouter;
