const express = require('express');
const router = express.Router();
const userContronller = require('../controllers/users');

router.post('/signup', userContronller.signUp);

router.post('/login', userContronller.login);

module.exports = router;