const Book = require('../models/books');
const fs = require('fs');
const sharp = require('sharp'); 

async function createBooks(req, res, next) {
    try {
        const MIME_TYPES = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/wepb': 'wepb'
        };
        const bookObject = JSON.parse(req.body.book);
        delete bookObject.userId;
        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }); 
        await book.save();
        const { buffer } = req.file;
        const extension = MIME_TYPES[req.file.mimetype];
        const ref = req.file.originalname.split(' ').join('_') + Date.now() + '.' + extension
        const path = `images/${ref}`
        await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(path)
        res.status(201).json({ message: 'Objet enregistré !'});
    } catch (error) {
        res.status(400).json({ error });
    }
}

async function modifyBooks(req, res, next) {
    try {
        const bookObject = req.file ? {
            ...JSON.parse(req.body.book),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        delete bookObject.userId;
        const book = await Book.findOne({ _id: req.params.id })
        if (book.userId !== req.auth.userId) {
            error({message: 'Vous n\'êtes pas autorisé à effectuer cette action'})
        } else {
            if (req.file) {
                const ref = req.file.originalname.split(' ').join('_') + Date.now() + '.' + extension
                const path = `images/${ref}`
                await sharp(buffer)
                .webp({ quality: 20 })
                .toFile(path)
            }
            await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
            res.status(200).json({ message: 'Objet modifié !'});
        }
    } catch (error) {
         res.status(403).json('Vous n\'êtes pas autorisé à effectuer cette action');
    }
}

async function deleteBooks(req, res, next) {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (book.userId !== req.auth.userId) {
            return
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, async () => {
                try {
                    await Book.deleteOne({ _id: req.params.id });
                    res.status(200).json({ message: 'Objet supprimé !'});
                } catch (error) {
                     res.status(400).json({ error });
                }
            });
        }
    } catch (error) {
         res.status(403).json('Vous n\'êtes pas autorisé à effectuer cette action')
    }
}

async function getOneBook(req, res, next) {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        res.status(200).json(book);
        next();
    } catch (error) {
         res.status(404).json({ error });
    }
}

async function getAllBooks(req, res, next) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
         res.status(400).json({ error });
    }
}

async function getBestRatedBooks(req, res, next) {
    try {
        const books = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error });
    }
}

async function rateBook(req, res, next) {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        let ratingsObject = {...req.body};
        const grade = ratingsObject.rating
        delete ratingsObject.userId
        ratingsObject.userId = req.auth.userId
        delete ratingsObject.rating
        ratingsObject.grade = grade
        if (book.ratings.some(rating => rating.userId === req.auth.userId)) {
            error({ message: 'Vous avez déjà noté ce livre.' })
        }
        let ratings = book.ratings
        ratings.push({...ratingsObject})
        const averageRating = ratings.reduce((acc, curr) => acc + curr.grade, 0) / ratings.length
        await Book.updateOne({ _id: req.params.id }, { ratings, averageRating, _id: req.params.id });
        const newBook = await Book.findOne({ _id: req.params.id });
        res.status(200).json(newBook);
    } catch (error) {
         res.status(400).json({ error });
    }
}

exports.createBooks = createBooks;
exports.modifyBooks = modifyBooks;
exports.deleteBooks = deleteBooks;
exports.getOneBook = getOneBook;
exports.getAllBooks = getAllBooks;
exports.rateBook = rateBook;
exports.getBestRatedBooks = getBestRatedBooks;