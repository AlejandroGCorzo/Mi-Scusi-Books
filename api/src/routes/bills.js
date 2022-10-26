const { Router } = require("express");
const User = require("../models/user");
const Books = require("../models/books");
const billsSchema = require("../models/bills");
const axios = require("axios");
const { transporter } = require("../mailer/mailer");
const { protect } = require("../middleware/protect");

const billsRouter = Router();

billsRouter.post("/", protect, async (req, res) => {
  const { id, books, amountBooks, send } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).send({ msg: "User not found!" });

    const booksDB = [];
    for (const id of books) {
      const book = await Books.findById(id);
      booksDB.push(book);
    }

    const price = [];
    for (const book of booksDB) {
      price.push(book.price);
    }

    let total = 0;
    for (let i = 0; i < price.length; i++) {
      total = total + price[i] * amountBooks[i];
    }

    const date = new Date()

    const bill = await billsSchema.create({
      books: books,
      amountBooks: amountBooks,
      price: price,
      total: total,
      date: date,
      user: user,
    });
    if (send) {
      await transporter.sendMail({
        from: `"Mi Scusi Books" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Thanks for shopping!",
        html: `
            <h2>Here is your bill! Dont demand us!</h2>
            <br>
            <p>Date: ${date}</p>
            <p>Books: ${books.map((b) => b.name)}</p>
            <p>Amounts: ${amountBooks}</p>
            <p>Price p/u: ${price}</p>
            <p>Total: ${total}</p>
            <br>
            <img src='https://images-ext-1.discordapp.net/external/G8qNtU8aJFTwa8CDP8DsnMUzNal_UKtyBr9EAfGORaE/https/ih1.redbubble.net/image.2829385981.5739/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.jpg?width=473&height=473' alt='MiScusi.jpeg' />
            <br>
            <p>Mi Scusi Books staff.</p>
            `,
      });
    }
    res.send(bill);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

billsRouter.get("/", protect, async (req, res) => {
  try {
    const bills = await billsSchema.find().populate("books").populate("user");
    const allBills = bills.map((b) => {
      return {
        _id: b._id,
        books: b.books.map((book) => {
          return {
            name: book.name,
            format: book.format,
          };
        }),
        amountBooks: b.amountBooks,
        price: b.price,
        total: b.total,
        date: b.date.toDateString(),
        user: {
          username: b.user.username,
          firstName: b.user.firstName,
          lastName: b.user.lastName,
          email: b.user.email,
          phone: b.user.phone,
          address: b.user.address,
        },
      };
    });
    res.send(allBills);
  } catch (error) {
    res.status(400).send({ msg: "Algo fallo en get a bills", error });
  }
});

module.exports = billsRouter;
