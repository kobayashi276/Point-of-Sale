const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { getUser, getAllOrderByEmail,getProductListByOrder, getQuantityOfProductByOrderIdAndBarCode } = require('../database/database')
require('dotenv/config')

router.get('/', async (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const orders = await getAllOrderByEmail(decoded.email)


    if (typeof orders == 'undefined') {
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

router.get('/invoice', async (req,res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const email = decoded.email

    const {orderid} = req.query
    const rest = await getProductListByOrder(orderid)
    const products = rest.product
    const orders = rest.order

    let productQuantity = []

    for (const p of products){
        const quantity = await getQuantityOfProductByOrderIdAndBarCode(orderid,p.barcode)
        console.log(quantity)
        productQuantity.push(quantity)
    }

    console.log(productQuantity)

    res.render('invoice',{products, productQuantity, orders})
})

module.exports = router