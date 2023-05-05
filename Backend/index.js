const express = require('express')
// const server = require('dotenv').config()
const server = require('../Backend/server.env')
const connectToMongo = require('./db')
const router = require('./Routes/auth')
const app = express()
const port = server.env.PORT || 5000 // Use the PORT environment variable if it exists


var cors = require('cors');
connectToMongo()

app.use(cors());
app.use(express.json());
app.use('/api/auth', require("./Routes/auth"))
app.use('/api/foodDisplay', require("./Routes/foodDisplay"))
app.use('/api/Order', require("./Routes/Order"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router