const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./index', {"message": "Logged in!"})
});

module.exports = router;