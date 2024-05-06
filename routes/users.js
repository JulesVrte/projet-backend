const express = require('express');
const userContronller = require('../controllers/users');
const router = express.Router();

router.post('/signup', userContronller.signUp);

router.post('/login', userContronller.login);

module.exports = router;