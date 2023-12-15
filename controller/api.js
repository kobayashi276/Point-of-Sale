const express = require('express')
const router = express.Router()
const { getUser, getProduct, unblockUser, lockUser } = require('../database/database')
const adminpermission = require('../middleware/adminpermission')

router.get('/user', async (req,res) => {
    const {email} = req.query

    const user = await getUser(email)

    res.json(user)
})

router.get('/product', async (req,res) => {
    const {barcode} = req.query

    const product = await getProduct(barcode)

    res.json(product)
})

router.get('/lock', adminpermission, async (req,res) => {
    const {email} = req.query

    const user = await lockUser(email)

    if (user){
        res.json(user)
    }
    else{
        res.json(null)
    }
})

router.get('/unblock',adminpermission, async (req,res) => {
    const {email} = req.query

    const user = await unblockUser(email)

    if (user){
        res.json(user)
    }
    else{
        res.json(null)
    }
})

module.exports = router