const express = require('express');
const app = express();
const port = 3000;


// sign-in page. get requests should render page
// post request should advance to logged in page.
app.route('/')
    .get((req, res) => {
        res.sendFile('index.html', {root: './templates'})
    });


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});




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