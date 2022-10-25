const { Router } = require("express");
const books = require('../models/books');
const Review = require("../models/review");
const { protect } = require("../middleware/protect");const user = require('../models/user');
const User = require('../models/user');

const reviewRouter = Router();

reviewRouter.post('/', async (req, res) => {
  const { text, idUser, idBook, rating } = req.body;

  try {
    const review = await Review.create({
      text,
      votes: {
        upvotes: 0,
        downvotes: 0
      },
      user: idUser,
      book: idBook
    })
    const user = await User.findById(idUser)
    if(user.votedBooks.includes(idBook)){
      return res.status(400).send('Already reviewed!')
    }
    const votedBooks = user.votedBooks
    votedBooks.push(idBook)
    await user.updateOne({votedBooks : votedBooks})

    const book = await books.findById(idBook)
    
    const bookRating = book.rating
    bookRating.push(rating)

    const bookReviews = book.reviews
    bookReviews.push(review)
    await book.updateOne({rating : bookRating, reviews : bookReviews})

    res.status(200).json(review);
  } catch (e) {
    res.status(400).json({ msg: "No se pudo cargar la review" });
  }
});

reviewRouter.get("/", async (req, res) => {
  try {
    const rev = await Review.find().populate("user");
    const reviews = rev.map((el) => {
      return {
        _id: el._id,
        votes: el.votes,
        text: el.text,
        user: el.user.name,
      };
    });

    res.status(200).json(reviews);
  } catch (e) {
    res.status(400).json({ msg: e });
  }
});

reviewRouter.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    try {
      const deleted = await Review.deleteOne({ _id: id });
      res.status(200).json({ msg: "Review deleted" });
    } catch (e) {
      res.status(400).json({ msg: "something went wrong" });
    }
  } else {
    res.status(400).json({ msg: "Not authorized" });
  }
});

reviewRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ book: id }).populate("User");

    return res.status(200).json(reviews);
  } catch (e) {
    return res.status(400).json({ msg: "This books has no reviews" });
  }
});
module.exports = reviewRouter;
