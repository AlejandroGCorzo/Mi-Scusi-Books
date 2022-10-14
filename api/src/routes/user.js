const { Router } = require("express");
const User = require("../models/user");
const axios = require("axios");
const { transporter } = require("../mailer/mailer");;
const { protect } = require("../middleware/protect");

const userRouter = Router();

//create user
// {
//   sub: 'auth0|63474946bce9a900112d95f3',
//   nickname: 'nanzerjano',
//   name: 'nanzerjano@hotmail.com',
//   picture: 'https://s.gravatar.com/avatar/3caa95d2ff0861b0f2235c0e3ff9deb4?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fna.png',
//   updated_at: '2022-10-13T12:57:47.498Z',
//   email: 'nanzerjano@hotmail.com'
// }

userRouter.get("/test", protect, async(req, res) => {
  console.log(req)
})

// {
//   sub: 'google-oauth2|104303008364141128609',
//   given_name: 'Juan Franco',
//   family_name: 'Ledesma',
//   nickname: 'juanfledesma18',
//   name: 'Juan Franco Ledesma',
//   picture: 'https://lh3.googleusercontent.com/a/ALm5wu1jcBn1YNLdkNcMJkDoc3beLt4cOiWPqJHi9bBYug=s96-c',
//   locale: 'es-419',
//   updated_at: '2022-10-14T13:17:19.982Z',
//   email: 'juanfledesma18@gmail.com',
//   email_verified: true
// }

userRouter.get("/detail", async (req, res) => {
  try {
    const accesToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://miscusibooks.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accesToken}`,
        },
      }
    );
    const userInfo = response.data;
    if (userInfo.sub.includes("google")) {
      let user = await User.findOne({ email: userInfo.email });
      if (!user) {
        user = await User.create({
          email : userInfo.email,
          userName : userInfo.nickname,
          firstName : userInfo.given_name,
          lastName : userInfo.family_name
        });
      }
      const formatUser = {
        id: user._id,
        sub: userInfo.sub,
        email: user.email,
        picture: userInfo.picture,
        nickname: userInfo.nickname,
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        phone: user.phone,
        address: user.address,
        birthdate: user.birthdate,
        type: user.type,
        bills: user.bills ? user.bills : "empty",
        state: user.state,
      };
      return res.send(formatUser)
    }
    console.log("entraste con correo");
    // console.log(userInfo);
    const user = await User.findOne({ email: userInfo.email });
    // console.log(user);
    const formatUser = {
      id: user._id,
      sub: userInfo.sub,
      email: user.email,
      picture: userInfo.picture,
      nickname: userInfo.nickname,
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      dni: user.dni,
      phone: user.phone,
      address: user.address,
      birthdate: user.birthdate,
      type: user.type,
      bills: user.bills ? user.bills : "empty",
      state: user.state,
    };
    // console.log(formatUser);
    res.send(formatUser);
  } catch (e) {
    res.send(e.message);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    console.log(req.body);
    const repeatedUsername = await User.findOne({ username: username });
    if (repeatedUsername) return res.status(400).send("Username alredy exist!");
    console.log('llegue');
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
    res.send({ msg: "User deleted successfully!" });
  } catch (e) {
    res.status(400).send({ msg: e });
  }
});

userRouter.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ msg: "Not id found!" });
  try {
    const deletedUser = await User.updateOne(
      { _id: id },
      { $set: { state: "Inactive" } }
    );
    if (!deletedUser.matchedCount) return res.send("User not found!");
    res.send({ msg: "User deleted successfully!" });
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
    res.send({ msg: "User updated successfully!" });
  } catch (e) {
    res.status(400).send({ msg: e });
  }
});

let img =
  "https://res.cloudinary.com/teepublic/image/private/s--2KjTvJ90--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:48/co_000000,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/t_watermark_lock/c_limit,f_auto,h_630,q_90,w_630/v1633396296/production/designs/24735146_0.jpg";

userRouter.put("/sanction/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { $set: { state: state } });
    await transporter.sendMail({
      from: `"Status changed" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Status changed",
      html: `
      <h2>Your user status has been changed.</h2>
      <p>New status: ${state}</p>
      <br>
      <img src='https://images-ext-1.discordapp.net/external/G8qNtU8aJFTwa8CDP8DsnMUzNal_UKtyBr9EAfGORaE/https/ih1.redbubble.net/image.2829385981.5739/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473' alt='MiScusi.jpeg' />
      <br>
      <p>Mi Scusi Books staff.</p>
      `,
    });
    res.send({ msg: "State updated successfully!" });
  } catch (error) {
    res.status(400).send({ msg: error, otherMsg: "algo fallo en sanction" });
  }
});

module.exports = userRouter;
