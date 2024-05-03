const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    imageUrl: { type: String, required: false }, 
    genre: { type: String, required: true }, 
    ratings: { type: Object, required: true },
    averageRating: { type: Number, required: true }
})

module.exports = mongoose.model('Book', bookSchema);