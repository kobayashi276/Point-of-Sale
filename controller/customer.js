const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { getUser, getOrderByCustomerPhone } = require('../database/database')
const order = require('../database/model/order')
require('dotenv/config')

router.get('/', async (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const orders = await getOrderByCustomerPhone(decoded.username)
    const email = decoded.email

    res.render('customer',{orders, email})
})

module.exports = router