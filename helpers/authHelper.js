const User = require('../model/User');
const bcrypt = require('bcrypt');

async function userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    // compare entered email & password with email and pass in db
    // if we cannot find the user in db:
        // we tell user they aren't found. ask to re-enter 
        // or ask to make a new account
    // if user is found, we log them in.
        // stuff w/ cookies/sessions? keep them logged in
        // for x amount of time?
    if (!email || !password) {
        return res.status(400).json({ 'message': 'Please ensure both username and password fields are filled.' })
        
    }

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ 'error': 'User not found. Check credentials or create a new account.' });
        } 

        bcrypt.compare(password, user.password, (error, data) => {
            if (error) throw error

            if (data) {
                // log in
                res.status(200).json({ "message": "Login successful." });
                return res.redirect('../views/index')
            } else {
                return res.status(401).json({ "message": "Invalid password." });
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(404).json({'error': error.message});
    }
}

module.exports = userLogin;