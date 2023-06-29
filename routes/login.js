const express = require('express');
const router = express.Router();
const userLogin = require('../helpers/authHelper');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

router.route('/')
    .get((req, res) => {
        res.render('./login');
        res.end();
    })
    .post(userLogin);

module.exports = router;