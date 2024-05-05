const Book = require('../models/books');

async function createBooks(req, res, next) {
    try {
        const book = new Book({
            ...req.body
        });
        await book.save();
        res.status(201).json({ message: 'Objet enregistré !'});
    } catch (error) {
        throw res.status(400).json({ error });
    }
}

async function modifyBooks(req, res, next) {
    try {
        await Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
        res.status(200).json({ message: 'Objet modifié !'});
    } catch (error) {
        throw res.status(400).json({ error });
    }
}

async function deleteBooks(req, res, next) {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Objet supprimé !'});
    } catch (error) {
        throw res.status(400).json({ error });
    }
}

async function getOneBook(req, res, next) {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        res.status(200).json(book);
    } catch (error) {
        throw res.status(404).json({ error });
    }
}

async function getAllBooks(req, res, next) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        throw res.status(400).json({ error });
    }
}

exports.createBooks = createBooks;
exports.modifyBooks = modifyBooks;
exports.deleteBooks = deleteBooks;
exports.getOneBook = getOneBook;
exports.getAllBooks = getAllBooks;