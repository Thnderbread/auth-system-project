const express = require('express');
const router = express.Router();
const userLogin = require('../helpers/authHelper');

router.route('/')
    .get((req, res) => {
        res.render('./index');
        res.end();
    })
    .post(userLogin);

module.exports = router;