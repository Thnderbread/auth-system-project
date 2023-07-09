const User = require('../model/User');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {    
    // const email = req.body.email;
    // const password = req.body.password;
    
    const { email, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(401).json({ "message": "User found in db. Please try a new email or sign in." })
        // user exists. check details or click here to login. should be a return statement.
    } 

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ 
            email: email, 
            password: hashedPassword
        });
        console.log(`User created with email ${email} and password ${hashedPassword}.`);
        // res.status(201).json({ "success": "User created successfully. Redirecting..." });
        return res.redirect(201, '../views/index')
        // redirect user to homepage?

    } catch (error) {
        console.error(error); // error.stack prints more detailed information
        res.status(500).json({ "error": error.message });
    }

}

module.exports = registerUser;