const express = require('express');
const router = express.Router();
const registerUser = require('../helpers/registerHelper')

router.route('/register')
    .get((req, res) => {
        res.render('./register')
        res.end();
    })
    .post(registerUser)

module.exports = router;