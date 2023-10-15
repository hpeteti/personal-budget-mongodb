const mongoose = require('mongoose')

const nameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      budget: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        unique: true,
        required: true
      },
}, {collection: 'part2'})

module.exports = mongoose.model('part2',nameSchema)