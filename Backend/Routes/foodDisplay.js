const express = require('express');
const FoodItem = require('../Models/Food_items');
const router = express.Router();
const app = express();
// const Food = mongoose.model('Food', foodSchema);


app.use(express.json());

router.post('/foodData',async (req,res) => {
    try {
        let data = await FoodItem.find({});
        res.send(data);
        console.log("Food server working properly")
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;