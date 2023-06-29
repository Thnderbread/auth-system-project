const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({ 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
    type: String,
    expires: '1d'
    }
 });

 module.exports = mongoose.model('User', userSchema)