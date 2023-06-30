const User = require('../model/User');

async function forgotPassword(req, res) {
    const email = req.body.email;
    if (!email) return res.status(400).json({ "error": "Please enter an email." })
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ "error": "User not found. Check credentials or create an account." })
    }

    // redirect syntax: res.redirect('./login');
    res.status(200).json({ "message": "Found user.", "email": user.email }); // send to login?
}

module.exports = forgotPassword;