const express = require('express');
const router = express.Router();

router.get('../views/reset', (req, res) => {
    res.render('./reset')
    res.end();
})

module.exports = router;