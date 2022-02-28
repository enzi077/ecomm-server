const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')


const app=express()

// my middleware-- uses cors package to remove cors error and bodyparser to parse
// only json
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// app.use(cors())
app.use(bodyParser.json())

const products = require('./routes/api/products')
const signup = require('./routes/api/signup')
const login = require('./routes/api/login')

// load a particular route on hitting the mentioned path
app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/products', products)

const port = process.env.PORT || 3000

app.listen(port, ()=>console.log(`Server started at port ${port}`))
