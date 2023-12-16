const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { getAllOrderByEmail } = require('../database/database')
require('dotenv/config')

router.get('/' , async (req,res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const orders = await getAllOrderByEmail(decoded.email)

    res.render('seller',{orders})
})

router.get('/new-order', async (req,res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const email = decoded.email
    res.render('new-order',{email})
})

module.exports = router