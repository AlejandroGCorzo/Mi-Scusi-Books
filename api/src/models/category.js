const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  theme: {
     
  }
})

module.exports = mongoose.model("Category", categorySchema)