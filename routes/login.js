const express = require('express');
const router = express.router();
const userLogin = require('../helpers/authHelper');

router.post('/login', userLogin);