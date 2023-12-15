const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword, getAllUser, getAllProduct } = require('../database/database')


router.get('/',async (req,res)=>{ 
    const users = await getAllUser()
    const products = await getAllProduct()
    // console.log(users)
    res.render('admin', {users,products})
})

module.exports = router;