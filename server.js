require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 4000

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.5hhu8qz.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => console.log(`MongoDB Connected.`))
    .catch(err => console.log(err))

// Middleware
app.use(cors())                                     //enable cors
app.use(express.static('public'))                   //serve static files
app.use(express.urlencoded({extended: false}))      //parse incoming requests
app.use(express.json())

//Set EJS as templating engine
app.set('view engine', 'ejs')

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
