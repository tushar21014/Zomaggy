
const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb+srv://tusharlps31:JHGP1NHFvhsenu0E@zomaggy.bqfatbu.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Zomaggy Server');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

connectToMongo();

module.exports = connectToMongo;