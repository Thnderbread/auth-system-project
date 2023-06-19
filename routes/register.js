const express = require('express');
const router = express.Router();
const registerUser = require('../helpers/registerHelper')

router.route('/')
    .get((req, res) => {
        res.render('../views/register')
        res.end();
    })
    .post(registerUser)

module.exports = router;

/**
 * think of this as routing FROM / (root page.)
 * since we get to register from root page, doing
 * /register or /otherURL will tell express to search
 * for another root page that is /otherURL
 * 
 * using .route('/specificRoute') results in a cannot
 * GET or POST /spcificRoute
 */