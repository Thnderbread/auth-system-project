const User = require('../model/User');
const bcrypt = require('bcrypt');

async function forgotPassword(req, res) {
    const email = req.body.email;
    if (!email) return res.status(400).json({ "error": "Please enter an email." })
    
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ "error": "User not found. Check credentials or create an account." })
    }

    // res.status(200).json({ "message": "Found user." }); // send to login?
    return res.redirect(200, '../views/reset')
}

module.exports = forgotPassword;