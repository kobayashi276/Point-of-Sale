const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session');
const logincheck = require('./middleware/logincheck')
const adminpermission = require('./middleware/adminpermission')
const sellerpermission = require('./middleware/sellerpermission')
const flash = require('express-flash')
const jwt = require('jsonwebtoken')
require('dotenv/config')

const user = require('./controller/user')
const admin = require('./controller/admin')
const api = require('./controller/api')
const seller = require('./controller/seller')


app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET, // You should set a secret to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
}));
app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views/css'))
app.use(express.static(__dirname + '/views/img'))
app.use(express.static(__dirname + '/views/js'))
app.use('/', user)
app.use('/admin', adminpermission, admin)
app.use('/api', api)
app.use('/seller', seller)
app.set('view engine', 'ejs')



app.get('/', logincheck, (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    if (decoded.permission === 'admin'){
        res.redirect('/admin')
    }
    else if (decoded.permission === 'seller'){
        res.redirect('/seller')
    }
    else{
        res.send('index')
    }
})


app.listen(3000, () => {
    console.log('server run')
})
