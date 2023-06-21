const express = require('express');
const router = express.Router();
const forgotPassword = require('../helpers/forgotHelper');

router.route('/')
    .get((req, res) => {
        res.render('./forgot')
        res.end();
    })
    .post(forgotPassword);

module.exports = router;