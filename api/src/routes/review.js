const { Router } = require('express');
const Review = require('../models/review');

const reviewRouter = Router();

reviewRouter.post('/', async (req, res) => {
  const { text, user } = req.body;

  try{
    const review = await Review.create({
      text,
      votes: {upvotes: 0, downvotes: 0},
      user: user
    })

    res.status(200).json(review)
  } catch(e){
    res.status(400).json({msg: "No se pudo cargar la review"})
  } 
})

reviewRouter.get('/', async(req,res) => {
  try{
    const rev = await Review.find().populate("user")
    console.log(rev)
    const reviews = rev.map(el => {
      return {_id: el._id, votes: el.votes, text: el.text, user : el.user.name}
    })
    
    res.status(200).json(reviews);
  } catch(e){
    res.status(400).json({msg: e})
  }
})

reviewRouter.delete('/:id', async(req, res) => {
  const { id } = req.params
  
  try{
    const deleted = await Review.deleteOne({_id : id});
    res.status(200).json({msg: 'Review deleted'})
  } catch(e){
    res.status(400).json({msg: "something went wrong"})
  }
})


module.exports = reviewRouter;