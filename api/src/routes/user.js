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

// // // // // FUNCION GENERAR TOKEN // // // //

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const generateResetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_RESET, {
    expiresIn: "30m",
  });
};

//Enviar link de resetear contraseña
userRouter.put("/forgot_password", async (req, res) => {
  const { email } = req.body;
  const error = "Something goes wrong";
  const message = "Check your email for instructions!";
  try {
    // const user = await User.findOneAndUpdate(query, {$set:{ resetToken: resetToken }} );
    const user = await User.findOne().where({ email: email });
    // user.resetToken = resetToken
    if (!user) return res.send("Something goes wrong!");
    const resetToken = generateResetToken(email);
    await user.updateOne({ resetToken: resetToken });
    const verificationLink = `${process.env.FRONT_URL}/newPassword/?reset=${resetToken}`;
    transporter.sendMail({
      from: `"Mi Scusi Books!" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Change your password!",
      html: `
      <h4>Please click on the following link to reset your password!</h4>
      <br>
      <a href=${verificationLink}>Change your password!</a>
      <br>
      <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' width= '200px'/>
      <br>
      <p>Mi Scusi Books staff.</p>
      `,
    });
    res.send(message);
  } catch (e) {
    res.status(400).send(error);
  }
});

userRouter.put("/new_password", async (req, res) => {
  const { newPassword } = req.body;
  const { reset } = req.headers;
  const error = "Something goes wrong";
  if (!newPassword || !reset) return res.status(400).send("Missing data!");
  try {
    const jwtPayload = jwt.verify(reset, process.env.JWT_SECRET_RESET);
    const user = await User.findOne().where({ resetToken: reset });
    if (!user) return res.status(400).send(error);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await user.updateOne({ password: hashPassword, resetToken: "" });
    res.send("Password successfully changed!");
  } catch (e) {
    console.log(e);
    res.status(400).send(error);
  }
});

//Mantener usuario logueado -> potegida
userRouter.get("/keepLog", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const formatUser = {
      id: user._id,
      type: user.type,
      picture: user.image,
      userName: user.username,
      state: user.state,
      favorites: user.favorites,
      cart: user.cart,
      votedBooks: user.votedBooks,
      votedReviews: user.votedReviews,
      loyaltyPoint: user.loyaltyPoint,
    };
    res.status(200).json(formatUser);
  } catch (e) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

//Loguear usuario local -> publica
userRouter.post("/login", async (req, res) => {
  const { email, password, cart, amounts } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });

    if (user.state === "pending") {
      return res.status(200).json({ msg: "Pleace validate your account" });
    }

    let formatUser;
    if (cart?.length > 0) {
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
      const total = extension.concat(user.cart);
      const newCart = [];
      for (const book of total) {
        if (newCart.some((b) => b.id === book.id)) continue;
        newCart.push(book);
      }
      await user.updateOne({ cart: newCart });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      formatUser = {
        token: generateToken(user._id),
      };
    }
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
  const { cart, amounts } = req.body;
  console.log("cart en back", cart);
  try {
    let user = await User.findOne({ email: tokenDecode.email });

    let newCart = [];
    if (cart?.length > 0) {
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
      const total = user ? extension.concat(user.cart) : extension;
      for (const book of total) {
        if (newCart.some((b) => b.id === book.id)) continue;
        newCart.push(book);
      }
      console.log(newCart);
    }
    if (!user) {
      console.log(newCart);
      const newUser = {
        firstName: tokenDecode.given_name.toLowerCase(),
        lastName: tokenDecode.family_name.toLowerCase(),
        email: tokenDecode.email,
        state: "active",
        image: tokenDecode.picture.slice(0, tokenDecode.picture.length - 6),
        cart: newCart,
      };
      const googleUser = await User.create(newUser);
      const formatUser = {
        token: generateToken(googleUser._id),
      };

      return res.status(200).json(formatUser);
    } else {
      if (newCart.length > 0) {
        await user.updateOne({ $set: { cart: newCart } });
      }
      const formatUser = {
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

//Registrar nueva cuenta -> publica
userRouter.post("/signup", async (req, res) => {
  const { name, lastName, password, email, cart, amounts } = req.body;

  if (!name || !lastName || !password || !email) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const userFoundByMail = await User.findOne({ email });
    if (userFoundByMail)
      return res.status(400).json({ email: "Email already in use." });

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
        newCart.push(book);
      }
    }

    const newUser = {
      firstName: name,
      lastName,
      password: hashPassword,
      email,
      loyaltyPoint: 0,
      state: "pending",
      type: "normal",
      votedBooks: [],
      votedReviews: [],
      favorites: [],
      cart: newCart,
      image: "http://cdn.onlinewebfonts.com/svg/img_568656.png",
      resetToken: "",
    };
    const user = await User.create(newUser);

    await transporter.sendMail({
      from: `"Miscusi Mail Verification" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Mail Verification",
      html: `
      <h2>Welcome to Miscusi Books.</h2>
      <p>Click the link below to verify your e-mail and start browsing our web !</p>
      <br>
      <a href=${process.env.FRONT_URL}/activation-mail/${user._id}> Verify e-mail </a>
      <br>
      <p>Mi Scusi Books staff.</p>
      `,
    });

    return res.status(200).json({
      msg: "Thank you for signing up with us. Please check your email",
    });
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "Something went wrong creating the user, try again later" });
  }
});

//Validate user email -> publico
userRouter.put("/activation-mail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: {
        state: "active",
      },
    });

    if (user) {
      return res.status(200).json({ msg: "Mail activated" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "Try again later" });
  }
});

//Conseguir todos los usuarios activos -> protegida
userRouter.get("/", protect, async (req, res) => {
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
  console.log('ENTRREEEEE');
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
        <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' />
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
        <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' />
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
  const { shipp } = req.body;
  const reduceStock = async (id, amount) => {
    try {
      const book = await bookSchema.findById(id);
      const stock = book.stock - amount < 0 ? 0 : book.stock - amount;
      const unitSold = book.unitSold + amount;
      await book.updateOne({
        $set: { stock, unitSold },
      });
    } catch (e) {
      res.status(400).send("error substracting stock");
    }
  };

  if (req.user) {
    try {
      const user = await User.findById(req.user._id);
      let points;
      if(user.discount === 0) points = 0
      else if(user.discount == 0.1) points = 1000
      else if(user.discount == 0.2) points = 2000
      else if(user.discount == 0.3) points = 3000
      const substractStock = [];
      for (let i = 0; i < user.cart.length; i++) {
        substractStock.push(reduceStock(user.cart[i].id, user.cart[i].amount));
      }
      await Promise.all(substractStock);

      const books = [];
      const booksNames = [];
      const booksAmount = [];
      for (const book of user.cart) {
        books.push(book.id);
        booksNames.push(book.name);
        booksAmount.push(book.amount);
      }

      const price = [];
      for (const book of user.cart) {
        price.push(book.price);
      }
      let total = 0;
      for (let i = 0; i < price.length; i++) {
        const subTotal = price[i] * booksAmount[i];
        total = total + subTotal;
      }

      // // // // // // // // // // // // // //
      // Discount
      if (points && user.loyaltyPoint < points)
        return res.status(400).send("Not enough points!");

      const discount = points ? points / 10000 : 0; //Pueden ser numeros tipo 0.1, 0.2, 0.3

      // // // // // // // // // // // // // //
      // Loyalty Points
      const loyaltyPoint = points ? -points : Math.floor(total) * 10; //Para la factura (Puede ser negativo o positivo)
      const newLoyaltyPoint = user.loyaltyPoint + loyaltyPoint; //Para acutalizar el usuario

      total -= total * discount; //Si no hay descuento se le resta 0

      const date = new Date().toDateString();

      const bill = await billsSchema.create({
        books: books,
        amountBooks: booksAmount,
        price: price,
        total: shipp ? total + Number(shipp) : total,
        date: date,
        user: user._id,
        discount: discount * 100,
        loyaltyPoint,
        shipp,
      });

      let newBuyedBooks = books.concat(user.buyedBooks)
      const buyedBooks = []
      for(const idBook of newBuyedBooks){
        if(buyedBooks.some(id => id === idBook)) continue
        buyedBooks.push(idBook)
      }

      await user.updateOne({
        $set: { buyedBooks : buyedBooks, cart: [], loyaltyPoint: newLoyaltyPoint },
      });
      await transporter.sendMail({
        from: `"Mi Scusi Books" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Thanks for shopping!",
        html: `
      <h2>Thanks for buying</h2>
      <br>
      <p>Date: ${date}</p>
      <p>Books: ${booksNames}</p>
      <p>Amounts: ${booksAmount}</p>
      <p>Price p/u: $${price}</p>
      <p>Discount: ${discount * 100}%</p>
      <p>Loyalty Points: ${loyaltyPoint}</p>
      <p>Total: ${total}</p>
      <br>
      <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' />
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

userRouter.get("/buyedBooks/:idBook",protect, async (req,res) => {
  const {idBook} = req.params;
  if (req.user) {
    try {
      const user = await User.findById(req.user._id)
      console.log(idBook);
      console.log(user.buyedBooks);
      if(!user.buyedBooks.some(id => id.valueOf() === idBook)) return res.status(400).send('No lo tiene!')
      const book = await bookSchema.findById(idBook)
      if(!book) return res.status(400).send('Something goes wrong!')
      res.send(book.url)
    } catch (error) {
      res
        .status(400)
        .send({ msg: error, otherMsg: "algo fallo en get a favorite" });
    }
  } else {
    return res.status(400).json({ msg: "Not authorized to see buyed books" });
  }
})

module.exports = userRouter;
