const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', (req, res, next) => {
    const books = [
        {
        id: '1',
        title: 'Harry Potter',
        author: "J.K. Rowling",
        year: 1997,
        averageRating: 4,
        genre: 'Fantasy',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg'
        }
    ];
    res.status(200).json(books);
});



    
module.exports = app;