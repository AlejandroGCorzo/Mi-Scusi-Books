const { Router } = require("express");
const User = require("../models/user");
const axios = require("axios");
const { transporter } = require("../mailer/mailer");
const { protect } = require("../middleware/protect");
const bookSchema = require("../models/books");
const billsSchema = require("../models/bills");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
//create user

// {
//   sub: 'auth0|63474946bce9a900112d95f3',
//   nickname: 'nanzerjano',
//   name: 'nanzerjano@hotmail.com',
//   picture: 'https://s.gravatar.com/avatar/3caa95d2ff0861b0f2235c0e3ff9deb4?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fna.png',
//   updated_at: '2022-10-13T12:57:47.498Z',
//   email: 'nanzerjano@hotmail.com'
// }

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

// // // // // FUNCION GENERAR TOKEN // // // //

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Mantener usuario logueado -> potegida
userRouter.get("/keepLog", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log('user keeplog', user)
    // console.log("back", user);
    const formatUser = {
      id: user._id,
      type: user.type,
      picture: user.image,
      userName: user.username,
      state: user.state,
      favorites: user.favorites,
      cart: user.cart,
    };
    res.status(200).json(formatUser);
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

//Loguear usuario local -> publica
userRouter.post("/login", async (req, res) => {
  const { email, password, cart, amounts } = req.body; //cart es un array
  try {
    const user = await User.findOne({ email });
    let formatUser;
    if (cart?.length) {
      const extension = [];
      for (const idBook of cart) {
        let book = await bookSchema.findById(idBook);
        book = {
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          amount: amounts[cart.indexOf(idBook)],
        };
        extension.push(book);
      }
      console.log("nuevo carro : ", extension);
      console.log("viejo carro : ", user.cart);
      const total = extension.concat(user.cart);
      const newCart = [];
      for (const book of total) {
        if (newCart.some((b) => b.id === book.id)) continue;
        newCart.push(book);
      }
      console.log("carro final: ", newCart);
      await user.updateOne({ cart: newCart });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      formatUser = {
        // id: user._id,
        // picture: user.picture,
        // userName: user.username,
        // type: user.type,
        // state: user.state,
        token: generateToken(user._id),
      };
    }
    // console.log(user);
    if (!formatUser)
      return res
        .status(400)
        .json({ msg: "Your password or email is incorrect." });
    res.status(200).json(formatUser);
  } catch (e) {
    res.status(400).json({ msg: "Your password or email is incorrect." });
  }
});

//Loguear cuenta de google -> publica
userRouter.post("/login_google", async (req, res) => {
  const accesToken = req.headers.authorization.split(" ")[1];
  const tokenDecode = jwt.decode(accesToken);
  const {cart, amounts} = req.body;
 
  try {
    let user = await User.findOne({ email: tokenDecode.email });
    
    let newCart = [];
    if (cart?.length) {
      const extension = [];
      for (const idBook of cart) {
        let book = await bookSchema.findById(idBook);
        book = {
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          amount: amounts[cart.indexOf(idBook)],
        };
        extension.push(book);
      }
      // console.log("nuevo carro : ", extension);
      // console.log("viejo carro : ", user.cart);
      const total = user ? extension.concat(user.cart) : extension;
      for (const book of total) {
        if (newCart.some((b) => b.id === book.id)) continue;
        newCart.push(book);
      }
      // console.log("carro final: ", newCart);
      console.log(newCart)
    }
    if (!user) {
      const newUser = {
        firstName: tokenDecode.given_name,
        lastName: tokenDecode.family_name,
        email: tokenDecode.email,
        state: "active",
        image: tokenDecode.picture.slice(0, tokenDecode.picture.length - 6),
        cart: newCart
      };
      // console.log('newUser')
      const googleUser = await User.create(newUser);
      const formatUser = {
        // id: googleUser._id,
        // type: googleUser.type,
        // picture: googleUser.image,
        // userName: googleUser.username,
        // state: googleUser.state,
        token: generateToken(googleUser._id),
      };

      return res.status(200).json(formatUser);
    } else {
      await user.updateOne({ cart: newCart });
      // console.log('existe')
      const formatUser = {
        // id: user._id,
        // type: user.type,
        // picture: user.image,
        // userName: user.username,
        // state: user.state,
        token: generateToken(user._id),
      };

      return res.status(200).json(formatUser);
    }
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Something went wrong, try again later" });
  }
});

//VIEJO, ESPERAR PARA BORRARLO
// userRouter.get("/login_google", async (req, res) => {
//   try {
//     const accesToken = req.headers.authorization.split(" ")[1];
//     const response = await axios.get(
//       "https://miscusibooks.us.auth0.com/userinfo",
//       {
//         headers: {
//           authorization: `Bearer ${accesToken}`,
//         },
//       }
//     );
//     const userInfo = response.data;
//     if (userInfo.sub.includes("google")) {
//       let user = await User.findOne({ email: userInfo.email });
//       if (!user) {
//         user = await User.create({
//           email: userInfo.email,
//           userName: userInfo.nickname,
//           firstName: userInfo.given_name,
//           lastName: userInfo.family_name,
//           image: userInfo.picture,
//         });
//       }
//       const formatUser = {
//         id: user._id,
//         type: user.type,
//         picture: user.image,
//         userName: user.username,
//         state: user.state,
//         token: generateToken(user._id),
//       };
//       return res.status(200).json(formatUser);
//     }
//   } catch (e) {
//     return res.status(400).json({ msg: e.message });
//   }
// });

// userRouter.get("/detail", async (req, res) => {
//   try {
//     const accesToken = req.headers.authorization.split(" ")[1];
//     const response = await axios.get(
//       "https://miscusibooks.us.auth0.com/userinfo",
//       {
//         headers: {
//           authorization: `Bearer ${accesToken}`,
//         },
//       }
//     );
//     const userInfo = response.data;
//     if (userInfo.sub.includes("google")) {
//       let user = await User.findOne({ email: userInfo.email });
//       if (!user) {
//         user = await User.create({
//           email: userInfo.email,
//           userName: userInfo.nickname,
//           firstName: userInfo.given_name,
//           lastName: userInfo.family_name,
//           image: userInfo.picture
//         });
//       }
//       const formatUser = {
//         id: user._id,
//         sub: userInfo.sub,
//         email: user.email,
//         picture: user.image,
//         nickname: userInfo.nickname,
//         userName: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         dni: user.dni,
//         phone: user.phone,
//         address: user.address,
//         birthdate: user.birthdate,
//         type: user.type,
//         state: user.state,
//         loyaltyPoint: user.loyaltyPoint,
//       };
//       return res.send(formatUser);
//     }
//   // console.log("entraste con correo");
//     // console.log(userInfo);
//     const user = await User.findOne({ email: userInfo.email });
//     // console.log(user);
//     const formatUser = {
//       id: user._id,
//       sub: userInfo.sub,
//       email: user.email,
//       picture: userInfo.picture,
//       nickname: userInfo.nickname,
//       userName: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       dni: user.dni,
//       phone: user.phone,
//       address: user.address,
//       birthdate: user.birthdate,
//       type: user.type,
//       state: user.state,
//       loyaltyPoint: user.loyaltyPoint,
//     };
//     // console.log(formatUser);
//     res.send(formatUser);
//   } catch (e) {
//     res.send(e.message);
//   }
// });

//Registrar nueva cuenta -> publica
userRouter.post("/signup", async (req, res) => {
  // console.log("entre");
  const {
    name,
    lastName,
    username,
    password,
    email,
    // dni,
    // phone,
    // address,
    // birthdate,
    cart,
    amounts,
  } = req.body;

  if (
    !name ||
    !lastName ||
    !username ||
    !password ||
    !email
    // || !dni ||
    // !phone ||
    // !address.street ||
    // !address.number ||
    // !birthdate
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const userFoundByMail = await User.findOne({ email });
    const userFoundByUserName = await User.findOne({ username });
    if (userFoundByMail && userFoundByUserName)
      return res.status(400).json({
        email: "Email already in use",
        username: "Username already in use",
      });
    if (userFoundByMail)
      return res.status(400).json({ email: "Email already in use." });
    if (userFoundByUserName)
      return res.status(400).json({ username: "Username already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newCart = [];
    if (cart?.length) {
      for (const idBook of cart) {
        let book = await bookSchema.findById(idBook);
        book = {
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          amount: amounts[cart.indexOf(idBook)],
        };
        newCart.push(book)
      }
    }

    const newUser = {
      username,
      firstName: name,
      lastName,
      password: hashPassword,
      email,
      // dni,
      // phone,
      // address: {
      //   street: address.street,
      //   number: address.number,
      //   floor: address.floor || 0,
      // },
      // birthdate,
      loyaltyPoint: 0,
      state: "pending",
      type: "normal",
      votedBooks: [],
      favorites: [],
      cart: newCart,
      image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
    };
    const user = await User.create(newUser);
    formatUser = {
      id: user._id,
      picture: user.picture,
      userName: user.username,
      type: user.type,
      state: user.state,
      token: generateToken(user._id),
    };

    return res.status(200).json(formatUser);
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Something went wrong creating the user, try again later" });
  }
  // try {
  //   const { username } = req.body;
  // // console.log(req.body);
  //   const repeatedUsername = await User.findOne({ username: username });
  //   if (repeatedUsername) return res.status(400).send("Username alredy exist!");
  // // console.log("llegue");
  //   const newUser = await User.create(req.body);
  //   res.send("User created successfully!");
  // } catch (e) {
  //   res.status(400).send({ error: e });
  // }
});

//Conseguir todos los usuarios activos -> protegida
userRouter.get("/", protect, async (req, res) => {
  // (req.user && req.user.type === "admin")
  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    try {
      const allUsers = await User.find().where({ state: { $ne: "inactive" } });
      res.send(allUsers);
    } catch (e) {
      res.status(400).send({ error: e });
    }
  } else {
    return res.status(400).json({ msg: "Not Authorized" });
  }
});

// Detalles del usuario -> protegida, solo usuario logueado puede pedir sus detalles
userRouter.get("/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(400).send("Not authorized");
  }
  // console.log("user id", req.user.id);
  // console.log("query id", id);
  if (id === req.user.id) {
    try {
      const searchedUser = await User.findById(id).select(
        "-password -type -cart -tenant -client_id -connection -transaction"
      );
      if (!searchedUser)
        return res.status(400).send({ msg: "User not found!" });
      res.send(searchedUser);
    } catch (e) {
      res.status(400).send({ error: e });
    }
    if (!id) return res.status(400).send({ msg: "Id not found!" });
  } else {
    res.status(400).json({ msg: "Not authorized" });
  }
});

//Borra completamente al usuario -> SOLO PARA PRUEBAS EN DEV
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

//Borra de forma logica al usuario -> protegida, solo usuario puede borrar su propia cuenta (admin y vendedor borran en otra ruta)
userRouter.put("/delete/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.id === id) {
    if (!id) return res.status(400).send({ msg: "Not id found!" });
    try {
      const deletedUser = await User.updateOne(
        { _id: id },
        { $set: { state: "inactive" } }
      );
      if (!deletedUser.matchedCount) return res.send("User not found!");
      res.send({ msg: "User deleted successfully!" });
    } catch (e) {
      res.status(400).send({ msg: e });
    }
  }
});

//Actualiza los datos del usuasrio -> protegida, solo usuario puede actualizar sus propios datos
userRouter.put("/update/:id", protect, async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (req.user && req.user.id === id) {
    if (!id) return res.status(400).send({ msg: "Not id found!" });
    try {
      const updatedUser = await User.updateOne({ _id: id }, { $set: update });
      res.send({ msg: "User updated successfully!" });
    } catch (e) {
      res.status(400).send({ msg: e });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to update this user" });
  }
});

//Sanciona al usuario -> protegida, solo admin y seller pueden sancionar usuarios
userRouter.put("/sanction/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
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
      res.send({ msg: `State updated successfully to ${state} !` });
    } catch (error) {
      res.status(400).send({ msg: error, otherMsg: "algo fallo en sanction" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to sanction users" });
  }
});

//Cambia el tipo de cuenta de usuario -> protegida, solo admin puede cambar el tipo de cuenta
userRouter.put("/type/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  if (req.user && req.user.type === "admin") {
    try {
      const user = await User.findByIdAndUpdate(id, { $set: { type: type } });
      await transporter.sendMail({
        from: `"Rol changed" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Rol changed",
        html: `
        <h2>Your user rol has been changed.</h2>
        <p>New rol: ${type}</p>
        <br>
        <img src='https://images-ext-1.discordapp.net/external/G8qNtU8aJFTwa8CDP8DsnMUzNal_UKtyBr9EAfGORaE/https/ih1.redbubble.net/image.2829385981.5739/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473' alt='MiScusi.jpeg' />
        <br>
        <p>Mi Scusi Books staff.</p>
        `,
      });
      res.send({ msg: `Type updated successfully to ${type} !` });
    } catch (error) {
      res.status(400).send({ msg: error, otherMsg: "algo fallo en type" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Not authorized to change account type" });
  }
});

//Actualiza el carrito de compras -> protegida, solo el usuario logueado puede modificar su carrito
//Recibe el id de un libro y su cantidad. Si el libro ya existe, va a modificar la cantidad.
userRouter.put("/cart/:idUser", protect, async (req, res) => {
  const { idUser } = req.params;
  const { idBook, amount } = req.body;
  if (req.user && req.user.id === idUser) {
    try {
      const user = await User.findById(idUser);
      // if (user.cart.some((b) => b.id === idBook)) {
      const b = user.cart.find((b) => b.id === idBook);
      if (b) {
        console.log(b);
        let book = b;
        book.amount = amount;
        const newCart = user.cart.filter((b) => b.id !== idBook);
        newCart.push(book);
        await user.updateOne({ cart: newCart });
        return res.send(newCart);
      }
      let book = await bookSchema.findById(idBook);
      book = {
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        amount: amount,
      };
      const newCart = [...user.cart, book];
      await user.updateOne({ cart: newCart });
      res.send(newCart);
    } catch (error) {
      res.status(400).send({ msg: error, otherMsg: "algo fallo en cart" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Not authorized to update shopping cart" });
  }
});

//Elimina un libro del carrito de compras -> protegida, solo el usuario logueado puede modificar su carrito
//Recibe el id de un libro y lo elimina del carrito.
userRouter.put("/cart/delete/:idUser", protect, async (req, res) => {
  const { idUser } = req.params;
  const { idBook } = req.body;
  if (req.user && req.user.id === idUser) {
    try {
      const user = await User.findById(idUser);
      const newCart = user.cart.filter((b) => b.id !== idBook);
      await user.updateOne({ cart: newCart });
      res.send(newCart);
    } catch (error) {
      res
        .status(400)
        .send({ msg: error, otherMsg: "algo fallo en cart/delete" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Not authorized to delete a book of the shopping cart" });
  }
});

//Devuelve el carrito completo del usuario logueado -> PROTEGIDA, SOLO USUARIO LOGUEADO PUEDE PEDIR EL CARRITO
userRouter.get("/cart/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.id === id) {
    try {
      const user = await User.findById(id).populate("cart.books");
      res.send(user.cart);
    } catch (error) {
      res.status(400).send({ msg: error, otherMsg: "algo fallo en cart" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to see shopping cart" });
  }
});

//Registra el pago de la compra -> PORTEGIDA, SOLO USUSARIO LOGUEADO PUEDE PAGAR
userRouter.put("/pay", protect, async (req, res) => {
 
  const reduceStock = async (id, amount) => {
    try{
      const reduce = await bookSchema.findByIdAndUpdate(id, {
        $inc: {
          stock: - amount
        }
      })
    } catch(e){
      console.log('error substracting stock')
    }
  }

  console.log('inicio pay', req.user._id)
  if (req.user) {
    try {
      const user = await User.findById(req.user._id);
      // if (!user.cart.books.length || !user.cart.amounts.length){
      //   return res.status(400).send({ msg: "dangerous car" });
      // }
      const substractStock = [];
      for(let i = 0; i < user.cart.length; i++){
         substractStock.push(reduceStock(user.cart[i].id, user.cart[i].amount))
      }
      await Promise.all(substractStock)
    

      const books = [];
      const booksNames = [];
      const booksAmount = [];
      for (const book of user.cart) {
        books.push(book.id);
        booksNames.push(book.name)
        booksAmount.push(book.amount)
      }

      const price = [];
      for (const book of user.cart) {
        price.push(book.price);
      }
      console.log('antes del total', booksAmount, price)
      let total = 0;
      for(let i = 0; i < price.length; i++){
        const subTotal = price[i] * booksAmount[i];
        total = total + subTotal
      }
      // const total = price.reduce((acc, curr) => acc + curr, 0);
      const date = new Date().toDateString();
      const bill = await billsSchema.create({
        books: books,
        amountBooks: booksAmount,
        price: price,
        total: total + 8,
        date: date,
        user: user._id,
      });
      
      await User.findByIdAndUpdate(user._id, {
        $set: { cart: [] },
      });

      await transporter.sendMail({
        from: `"Mi Scusi Books" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Thanks for shopping!",
        html: `
      <h2>Here is your bill! Dont demand us!</h2>
      <br>
      <p>Date: ${date}</p>
      <p>Books: ${booksNames.map((b) => b)}</p>
      <p>Amounts: ${booksAmount(e => e)}</p>
      <p>Price p/u: ${price.map(e => e)}</p>
      <p>Total: ${total}</p>
      <br>
      <img src='https://images-ext-1.discordapp.net/external/G8qNtU8aJFTwa8CDP8DsnMUzNal_UKtyBr9EAfGORaE/https/ih1.redbubble.net/image.2829385981.5739/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473' alt='MiScusi.jpeg' />
      <br>
      <p>Mi Scusi Books staff.</p>
      `,
      });

      res.send(bill);
    } catch (error) {
      res.status(400).send({ msg: error, otherMsg: "algo fallo en pay" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to pay" });
  }
});

//Añade libros favoritos al usuario -> protegido, solo el usuario logueado puede agregar favoritos
//Recibe el id de un usuario y el id de un libro, lo agrega a sus favoritos si es que aun no existe
userRouter.put("/favorites/:idUser", protect, async (req, res) => {
  const { idUser } = req.params;
  const { idBook } = req.body;
  if (!idUser || !idBook) return res.status(400).send({ msg: "Missing data!" });
  try {
    const user = await User.findById(idUser);
    if (user.favorites.some((b) => b.id === idBook))
      return res.send({ msg: "Already exist!" });
    let book = await bookSchema.findById(idBook);
    book = {
      id: book.id,
      name: book.name,
      price: book.price,
      image: book.image,
    };
    const newFavorites = [...user.favorites, book];
    await user.updateOne({ favorites: newFavorites });
    res.send(newFavorites);
  } catch (error) {
    res
      .status(400)
      .send({ msg: error, otherMsg: "algo fallo en put a favorite" });
  }
});

userRouter.put("/favorites/delete/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { idBook } = req.body;
  if (req.user && req.user.id === id) {
    if (!id || !idBook) return res.status(400).send("Missing data!");
    try {
      const user = await User.findById(id);
      // console.log(user);
      const newFavorites = user.favorites.filter((b) => b.id !== idBook);
      await user.updateOne({ favorites: newFavorites });
      res.send(newFavorites);
    } catch (error) {
      res
        .status(400)
        .send({ msg: error, otherMsg: "algo fallo en put a favorite/delete" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to delete a favorite" });
  }
});

userRouter.get("/favorites/:id", protect, async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.id === id) {
    try {
      if (!id) return res.status(400).send("Missing data!");
      const user = await User.findById(id);
      // console.log(user);
      if (!user) return res.status(404).send("User not found!");
      return res.send(user.favorites);
    } catch (error) {
      res
        .status(400)
        .send({ msg: error, otherMsg: "algo fallo en get a favorite" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to see favorites" });
  }
});

module.exports = userRouter;
