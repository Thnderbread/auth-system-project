const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./reset')
    res.end();
})

module.exports = router;