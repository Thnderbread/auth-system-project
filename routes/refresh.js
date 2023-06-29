const express = require('express');
const router = express.Router();
const refreshTokenHelper = require('../helpers/refreshTokenHelper')

router.get('/', refreshTokenHelper);

module.exports = router;