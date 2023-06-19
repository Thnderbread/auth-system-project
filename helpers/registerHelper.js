const User = require('../model/User');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    const {email, password} = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(401).json({ "message": "User found in db. Please enter a new email or sign in." })
        // user exists. check details or click here to login. should be a return statement.
    } 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ 
            email: email, 
            password: hashedPassword
        });
        console.log(`User created with email ${email} and password ${hashedPassword}.`);
        res.status(201).json({ "success": "User created successfully. Redirecting..." });
        return res.redirect('../views/login')
        // redirect user to homepage?

    } catch (error) {
        res.status(500).json({ "error": error.message });
    }

}

module.exports = registerUser;