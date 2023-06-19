require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./connection');
const app = express();
const port = 8080;

// Connect to MongoDB
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/index', require('./routes/index'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'))
app.use('/forgot', require('./routes/forgot'));

mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB successful.');
    app.listen(port, () => console.log(`Appplication now listening on port ${port}.`));
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