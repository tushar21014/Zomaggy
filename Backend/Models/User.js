const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        // required: true
    },
    verify_token: {
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const user = mongoose.model('Users', userSchema)
module.exports = user;