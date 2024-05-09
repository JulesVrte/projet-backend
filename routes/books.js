const express = require('express');
const bookControllers = require('../controllers/books');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.get('/', bookControllers.getAllBooks);

router.get('/bestrating', bookControllers.getBestRatedBooks);

router.get('/:id', bookControllers.getOneBook);

router.post('/', auth, multer, bookControllers.createBooks);

router.post('/:id/rating', auth, bookControllers.rateBook);
 
router.put('/:id', auth, multer, bookControllers.modifyBooks);

router.delete('/:id', auth, bookControllers.deleteBooks);

module.exports = router;