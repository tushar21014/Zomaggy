const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    email:{
        type: String,
        required : true,
        unique: true
    },
    orderData:{
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const orderData = mongoose.model('orderData', orderSchema)
module.exports = orderData;