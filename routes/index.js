const express = require('express');
const router = express.router();

router.get('/index', (req, res) => {
    res.render('./index', {"message": "Logged in!"})
});

module.exports = router;