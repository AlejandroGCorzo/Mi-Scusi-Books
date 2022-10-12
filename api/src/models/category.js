const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  theme: {
    type: {},
    required: true
  }
})

module.exports = mongoose.model("Category", categorySchema)