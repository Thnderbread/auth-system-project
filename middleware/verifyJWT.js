require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    // app doesn't have an auth header. need to check somewhere else for jwt.
    // jwt is not given until login is allowed. atp, it is stored as a json. 
    // search there.
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(authHeader);
    console.log(token);

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
        if (error) return res.sendStatus(403);
        req.email = token.email; //*
        next();
   })
}

module.exports = verifyJWT;

//* This could be username in an alternate application. we pass in the username
// to the request body and can use that later in the applilcation.
// for instance, we could search the database for req.user and load some settings 
// for that specific user.

//** would use this if this application had a more traditional API-like structure.
// The front end would send the access token along with the request via fetch and
// do something with the response. but since JWTs are used to verify access to home 
// page and not to access certain specific resources, just store it in session storage
// for this application so it can be grabbed and verified.