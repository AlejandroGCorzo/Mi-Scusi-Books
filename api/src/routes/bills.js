const { Router } = require("express");
const User = require("../models/user");
const Books = require("../models/books");
const billsSchema = require("../models/bills");
const { transporter } = require("../mailer/mailer");
const { protect } = require("../middleware/protect");

const billsRouter = Router();

billsRouter.post("/", protect, async (req, res) => {
  const { id, books, amountBooks, send, shipp = 0, points = 0 } = req.body;
  try {
    const user = await User.findById(id);

    if (points && user.loyaltyPoint < points)
      return res.status(400).send("Not enough points!");

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

    const loyaltyPoint = points ? -points : Math.floor(total * 10); //Calculamos los puntos de lealtad
    const discount = points ? total * (points / 10000) : 0;

    const userLoyaltyPoint = points //Actualizamos los puntos de lealtad
      ? user.loyaltyPoint - loyaltyPoint //Si pasaron puntos es que los utilizo asique se los restamos
      : user.loyaltyPoint + loyaltyPoint; //Sino, le sumamos los puntos generados
    await user.updateOne({
      $set: { loyaltyPoint: userLoyaltyPoint },
    });

    const date = new Date();

    const bill = await billsSchema.create({
      books: books,
      amountBooks: amountBooks,
      price: price,
      total: total + Number(shipp) - discount,
      date: date,
      user: user,
      status: "Approved",
      loyaltyPoint,
      discount,
      shipp,
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
            <p>Price p/u: $${price}</p>
            <p>Loyalty Points: ${loyaltyPoint}</p>
            <p>Discount: ${discount * 100}%</p>
            <p>Shipp: ${shipp}%</p>
            <p>Total: $${total}</p>
            <br>
            <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' />
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
        loyaltyPoint: b.loyaltyPoint,
        discount: b.discount,
        shipp: b.shipp,
        total: b.total,
        date: b.date.toDateString(),
        user: {
          firstName: b.user.firstName,
          lastName: b.user.lastName,
          email: b.user.email,
          phone: b.user.phone,
        },
        status: b.status || "approved",
      };
    });
    res.send(allBills);
  } catch (error) {
    res.status(400).send({ msg: "Algo fallo en get a bills", error });
  }
});

billsRouter.put("/status/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const bill = await billsSchema.findByIdAndUpdate(id, { status });
    const user = await User.findById(bill.user.valueOf());
    if (status === "cancelled") {
      //si se cancela le quito al usuario los puntos de lealtad
      await user.updateOne({
        $inc: { loyaltyPoint: -bill.loyaltyPoint },
      });
    } else {
      await user.updateOne({
        //Si se vuelve a aprobar, se los vuelvo a sumar
        $inc: { loyaltyPoint: bill.loyaltyPoint },
      });
    }
    if (!bill) return res.status(404).send("Bill not found!");
    await transporter.sendMail({
      from: `"Mi Scusi Books" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: "Bill status!",
      html: `
            <h2>Your bill status is now: ${bill.status}</h2>
            <br>
            <img src='https://res.cloudinary.com/scusi-books/image/upload/v1666567325/zlxizult0udht9jweypx.png' alt='MiScusi.jpeg' />
            <br>
            <p>Mi Scusi Books staff.</p>
            `,
    });
    res.send("Status changed!");
  } catch (error) {
    res.status(400).send({ msg: "Algo fallo en put a bills", error });
  }
});

billsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bills = await billsSchema
      .find()
      .where({ user: id })
      .populate("books")
      .populate("user");
    if (!bills) return res.status(400).send("User not found");
    const allBills = bills.map((b) => {
      return {
        _id: b._id,
        books: b.books.map((book) => {
          return {
            id: book._id.valueOf(),
            name: book.name,
            format: book.format,
          };
        }),
        amountBooks: b.amountBooks,
        price: b.price,
        loyaltyPoint: b.loyaltyPoint,
        discount: b.discount,
        shipp: b.shipp,
        total: b.total,
        date: b.date.toDateString(),
        user: {
          firstName: b.user.firstName,
          lastName: b.user.lastName,
          email: b.user.email,
          phone: b.user.phone,
        },
        status: b.status || "approved",
      };
    });
    return res.send(allBills);
  } catch (error) {
    res.status(400).send({ msg: "Algo fallo en put a bills", error });
  }
});

module.exports = billsRouter;
