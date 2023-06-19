const express = require('express');
const router = express.router();
const registerUser = require('../helpers/registerHelper/')

router.post('/register', registerUser)