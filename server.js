require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const connectDB = require('./config/connection');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const app = express();
const port = 8080;

// Connect to MongoDBk
connectDB();

app.use(credentials);
app.use(cors(corsOptions));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses url payloads
app.use(cookieParser()); // parses cookies
app.use(express.json()); // parses json paylods
app.use(session({
    secret: process.env.SESSION_KEY_SECRET, // secret key for signing the session ID cookie.
    resave: false,  //> 
    saveUninitialized: false //>>
}));
//> determines if the session should be saved (back to the session store) even if it wasn't modified. false improves performance by preventing unnecessary writes.

//>> determines whether unitialized sessions (if i never use a req.session item) should be saved to the session store. 
    //>> false is good for privacy & best practices. true is good for default or empty session data.

// routes
app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/forgot', require('./routes/forgot'));
app.use('/reset', require('./routes/reset'));
app.use('/refresh', require('./routes/refresh'));
app.use((req, res, next) => {
    res.status(404).render('404');
})

// since order matters, and we verify jwts before access is allowed to this route, we put it last.
// app.use(verifyJWT);



mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB successful.');
    app.listen(port, () => console.log(`Application now listening on http://localhost:${port}/.`));
})


// test stuff 

// const http = require('http'); more test stuff
// const hostname = '127.0.0.1';
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });


// server.listen(port, hostname, () => {console.log(`Server running att http://${hostname}:${port}/`);
// });

// first should learn how to create a db (mongoose) & connect to app
// then should learn how to do all the node stuff with app routing etc
// then front-end nonsense