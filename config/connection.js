const mongoose = require('mongoose');

async function connectDB() {
    try {
       await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
       });
    } catch (error) {
        console.error(error); // error.stack prints more detailed information
    }
}

module.exports = connectDB;