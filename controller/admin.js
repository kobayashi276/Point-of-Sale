const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, getProductListByOrder, getAllUser, getAllProduct, getAllOrder } = require('../database/database')


router.get('/', async (req, res) => {
    const users = await getAllUser()
    const products = await getAllProduct()
    const orders = await getAllOrder()
    // console.log(users)
    res.render('admin', { users, products, orders })
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



module.exports = router;