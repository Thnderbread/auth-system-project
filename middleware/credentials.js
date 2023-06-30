const allowedOrigins = [
    'http://127.0.0.1:8080',
    'http://localhost:8080'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;