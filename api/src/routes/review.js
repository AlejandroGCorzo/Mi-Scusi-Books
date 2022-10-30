const { Router } = require("express");
const books = require("../models/books");
const Review = require("../models/review");
const { protect } = require("../middleware/protect");
const User = require("../models/user");

const reviewRouter = Router();

reviewRouter.post("/", async (req, res) => {
  const { text, idUser, idBook, rating } = req.body;
  try {
    const user = await User.findById(idUser)
    console.log(user.username);
    const review = await Review.create({
      text : text,
      votes: {
        upvotes: 0,
        downvotes: 0,
      },
      user: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      book: idBook,
      rating : rating
    })
    console.log('llegue');
    if(user.votedBooks.includes(idBook)){
      return res.status(400).send('Already reviewed!')
    }
    const votedBooks = user.votedBooks;
    votedBooks.push(idBook);
    await user.updateOne({ votedBooks: votedBooks });

    const book = await books.findById(idBook);

    const bookRating = book.rating;
    bookRating.push(rating);

    const bookReviews = book.reviews;
    bookReviews.push(review);
    await book.updateOne({ rating: bookRating, reviews: bookReviews });

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

//Elimina completamente una review -> protegida, solo admin o seller pueden eliminar reviews
reviewRouter.put("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { bookId, rating, userEmail } = req.body;
  

  if (req.user && (req.user.type === "admin" || req.user.type === "seller")) {
    try {
      const deleted = await Review.deleteOne({ _id: id });
      const book = await books.findById(bookId);
      const user = await User.findOne().where({email: userEmail});
    
      user.votedBooks = user.votedBooks.filter(el => el.valueOf() !== bookId)
      await user.save()
   
      const idx = book.rating.indexOf(rating);
      book.rating = [...book.rating.slice(0, idx), ...book.rating.slice(idx+1)]
      book.reviews = book.reviews.filter(el => el.valueOf() !== id)
      await book.save()

      res.status(200).json({ msg: "Review deleted" });
    } catch (e) {
      res.status(400).json({ msg: "something went wrong" });
    }
  } else {
    res.status(400).json({ msg: "Not authorized" });
  }
});

//Vota de forma positiva o negativa una review -> protegida, solo usuario logueado puede votar
reviewRouter.put("/vote/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;

  if (req.user) {
    try {
      
      let voteReview;
      if (vote === "1") {
        voteReview = await Review.findByIdAndUpdate(id, {
          $inc: { "votes.upvotes": + 1 },
        });
        const user = await User.findByIdAndUpdate(req.user._id, {$push: { votedReviews: {review: id, vote: "upvote"} }});
      } else {
        voteReview = await Review.findByIdAndUpdate(id, {
          $inc: { "votes.downvotes": + 1 },
        });
        const user = await User.findByIdAndUpdate(req.user._id, {$push: { votedReviews: {review: id, vote: "downvote"} }});
      }
      return res.send("Review voted");
    } catch (e) {
      return res.status(400).json({msg: "Try again later"})
    }
  } else {
    return res.status(400).json({ msg: "Not authorized" });
  }
});

reviewRouter.put("/vote/remove/:id", protect, async(req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  if(req.user){
    try{
      // const updateUser = await User.findByIdAndUpdate(req.user_id, {$pull: { votedReviews: {review: id}}})
      const updateUser = await User.findById(req.user._id)
      updateUser.votedReviews = updateUser.votedReviews.filter(el => el.review.valueOf() !== id)
      
      await updateUser.save()
      if(vote === "1"){
        const updateReview = await Review.findByIdAndUpdate(id, { $inc: { "votes.upvotes": -1 }})
      } else {
        const updateReview = await Review.findByIdAndUpdate(id, { $inc: { "votes.downvotes": -1 }})
      }
      return res.send('Review updated')
    } catch(e){
      return res.status(400).json({msg: "Something went wrong, try again later"})
    }
  } else {
    return res.status(400).json({msg: "Please log in"})
  }
})

//es probable que no se use
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
