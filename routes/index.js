const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

router.get('/', verifyJWT, (req, res) => {
    res.render('./index', {"message": "Logged in!"})
});

module.exports = router;