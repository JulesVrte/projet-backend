const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/books');

router.post('/', bookControllers.createBooks);

router.put('/:id', bookControllers.modifyBooks);

router.delete('/:id', bookControllers.deleteBooks);

router.get('/:id', bookControllers.getOneBook);

router.get('/', bookControllers.getAllBooks);

module.exports = router;