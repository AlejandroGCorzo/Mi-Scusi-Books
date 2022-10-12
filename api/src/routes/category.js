const { Router } = require('express');
const Category = require('../models/category.js')

const categoryRouter = Router();

categoryRouter.post('/', async(req, res) => {
  const { name } = req.body;

  try{
    const newCat = await Category.create({
      name
    })
    res.status(200).json(newCat)
  } catch(e) {
    res.status(400).json({ msg: e })
  }

})

categoryRouter.get('/', async(req, res) => {
  try{
    const categories = await Category.find().select("-_id")

    res.status(200).json(categories)
  } catch(e) {
    res.status(404).json({msg : "error"})
  }
})

module.exports = categoryRouter