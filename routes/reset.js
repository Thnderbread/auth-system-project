const express = require('express');
const router = express.router();

router.get('../views/reset', (req, res) => {
    res.render('./reset', {'message': 'Waiting for user reset.'})
})