require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item')

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

// Set EJS as the templating engine
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/item', async (req, res) => {
    const items = await Item.find({})
    res.render('item', {items})
})

// Create
app.post('/item', async (req, res) => {
    const newItem = new Item(req.body)
    try {
        await newItem.save()
        res.redirect('/item')
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
})

// Update
app.post('/item/update/:id', async (req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        await Item.findByIdAndUpdate(id, {name, description})
        res.redirect('/item')
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
})

// Delete
app.delete('/item/delete/:id', async (req, res) => {
    const {id} = req.params
    try {
        await Item.findByIdAndDelete(id)
        res.status(200).json({message: 'Item deleted successfully'});
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
