const mongoose = require('mongoose');

// Define a schema for your collection
const foodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    options: {
        type: Array,
        default: [
            { name: 'half' },
            { name: 'full' }
        ]
    },
    description: {
        type: String
    },
    // define fields for your documents here...
});

// Use the defined schema to create a model
const FoodItem = mongoose.model('FoodItem', foodItemSchema, 'food_items');
module.exports = FoodItem
// Now you can use the `FoodItem` model to interact with the pre-existing `food_items` collection
