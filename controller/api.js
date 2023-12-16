const express = require('express')
const router = express.Router()
const { addProduct, getUser, getProduct, unblockUser, lockUser, deleteProduct, updateProduct, updateUser, createOrder, getAllProduct } = require('../database/database')
const adminpermission = require('../middleware/adminpermission')
const jwt = require('jsonwebtoken')
const sellerpermission = require('../middleware/sellerpermission')
require('dotenv/config')

router.get('/user', async (req, res) => {
    const { email } = req.query

    const user = await getUser(email)

    res.json(user)
})

router.put('/user',sellerpermission, async (req,res) => {
    const {email} = req.query

    const {username,phone,country} = req.body

    const token = req.session.access_token
    if (token){
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if (decoded.email === email){
            const user = await updateUser(email,username,phone,country)

            if (user){
                res.json(user)
            }
            else{
                res.json(null)
            }
        }
    }
})

router.get('/addnewproduct', adminpermission, (req, res) => {
    res.render('addproduct')
})

router.get('/product', async (req, res) => {
    const { barcode } = req.query

    if (barcode){
        const product = await getProduct(barcode)
        res.json(product)
    }
    else{
        const product = await getAllProduct()

        res.json(product)
    }


})

router.get('/lock', adminpermission, async (req, res) => {
    const { email } = req.query

    const user = await lockUser(email)

    if (user) {
        res.json(user)
    }
    else {
        res.json(null)
    }
})

router.get('/unblock', adminpermission, async (req, res) => {
    const { email } = req.query

    const user = await unblockUser(email)

    if (user) {
        res.json(user)
    }
    else {
        res.json(null)
    }
})

router.post('/product', async (req, res) => {
    const { barcode, name, importprice, retailprice, category } = req.body
    try {
        const product = await addProduct(barcode, name, importprice, retailprice, category)

        if (product) {
            // res.json(product)
            res.redirect('/admin')
        }
        else {
            res.json(null)
        }
    }
    catch (err) {
        console.log(err)
        res.json(null)
    }
})

router.delete('/product', async (req, res) => {
    const { barcode } = req.query
    try {
        const product = await deleteProduct(barcode)
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.json(null)
    }
})

router.put('/product', async (req, res) => {
    const { barcode } = req.query
    const { name, importprice, retailprice, category } = req.body
    
    console.log(barcode, name,importprice)


    try {
        const product = await updateProduct(barcode, name, importprice, retailprice, category)
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.json(null)
    }
})

router.post('/order', async (req,res) => {
    const {email} = req.query
    const {customerphone} = req.body

    try{
        const order = await createOrder(email,customerphone)

        if (order){
            res.json(order)
        }
        else{
            res.json(null)
        }
    }
    catch(err){
        console.log(err)
        res.json(null)
    }

})

module.exports = router