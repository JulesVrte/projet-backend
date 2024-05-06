const express = require('express');
const bookControllers = require('../controllers/books');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.post('/', auth, multer, bookControllers.createBooks);

router.put('/:id', auth, multer, bookControllers.modifyBooks);

router.delete('/:id', auth, bookControllers.deleteBooks);

router.get('/:id', bookControllers.getOneBook);

router.get('/', bookControllers.getAllBooks);

module.exports = router;