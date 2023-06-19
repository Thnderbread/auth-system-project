require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('config.js');
const app = express();
const port = 8080;

// Connect to MongoDB
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// sign-in page. get requests should render page
// post request should advance to logged in page.
app.route('./index')
    .get((req, res) => {
        res.sendFile('index.html', {root: './views'})
    })
    .post((req, res) => {
        // compare email and password with database. if matched, sign in
        // if not, throw an error. (re-render page?
        // maybe some small pop-up text?)
        const email = req.body.email;
        const password = req.body.password;

        const userExists = (email, password) {
            const schema = new mongoose.Schema({  })
            const user = mongoose.model('User') 
        }

        if (!email || !password) {
            // pop up for user not found.
            // check credentials or create a new account.
        } else {
            // send user to new page - they are signed in
            // check for remember me? should we do something here?
        }
    })


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Now listening on port ${port}`));
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