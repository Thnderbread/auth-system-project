require('dotenv').config()
const User = require('../model/User');
const jwt = require('jsonwebtoken');

async function handleRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(`cookies: ${cookies}`);
    console.log(`jwt: ${cookies.jwt}`);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user) return res.sendStatus(403);
    console.log(user.email);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, token) => {
        if (error) return res.status(403).json({ "message": "Invalid token. Please sign in again." });
        const accessToken = jwt.sign(
            { "email": token.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        res.json({ accessToken });
    });

}

module.exports = handleRefreshToken;