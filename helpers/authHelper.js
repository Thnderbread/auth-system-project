require('dotenv').config()
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            return res.status(401).json({ 'error': 'User not found. Check credentials or create a new account.' });
        } 

        bcrypt.compare(password, user.password, async (error, data) => {
            if (error) throw error

            if (data) {
                // log in
                // res.status(200).json({ "message": "Login successful." });
                const accessToken = jwt.sign(
                    { "email": user.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                const refreshToken = jwt.sign(
                    { "email": user.email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                user.refreshToken = refreshToken; // store refresh token in user database.
                await user.save();
                console.log(user.refreshToken);

                // store refresh token and give access token
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ accessToken });
                // sessionStorage.setItem('accessToken', accessToken); // store access token in browser memory
            
            } else {
                return res.status(401).json({ "message": "Invalid password." });
            }
        })

    } catch (error) {
        console.error(error); // error.stack prints more detailed information
        return res.status(500).json({'error': error.message});
    }
}

module.exports = userLogin;