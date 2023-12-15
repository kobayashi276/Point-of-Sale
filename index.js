const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session');
const logincheck = require('./middleware/logincheck')
require('dotenv/config')

const user = require('./controller/user')

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET, // You should set a secret to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', user)
app.set('view engine', 'ejs')

app.get('/', logincheck, (req, res) => {
    res.send('index')
})

app.listen(3000, () => {
    console.log('server run')
})
