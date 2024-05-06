const express = require('express');
const mongoose = require('mongoose');
const API_KEY = require('./.env');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const path = require('path');
const app = express();

function connectToDataBase () {
    try {
        mongoose.connect(API_KEY, {useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connexion à MongoDB réussie !')
    } catch {
        console.log('Connexion à MongoDB échouée !')
    }
}

connectToDataBase();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', bookRoutes);

app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;