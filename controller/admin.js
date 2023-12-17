const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword, getAllUser, getAllProduct, getAllOrder } = require('../database/database')


router.get('/', async (req, res) => {
    const users = await getAllUser()
    const products = await getAllProduct()
    const orders = await getAllOrder()
    // console.log(users)
    res.render('admin', { users, products, orders })
})



module.exports = router;