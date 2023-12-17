const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { getUser, getAllOrderByEmail } = require('../database/database')
const order = require('../database/model/order')
require('dotenv/config')

router.get('/', async (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const orders = await getAllOrderByEmail(decoded.email)



    if (orders == null) {
        res.render('seller', {
            email: decoded.email
        })
    }
    else {
        res.render('seller', {
            orders: orders,
            email: decoded.email
        })
    }




})

router.get('/new-order', async (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const email = decoded.email
    res.render('new-order', { email })
})

module.exports = router