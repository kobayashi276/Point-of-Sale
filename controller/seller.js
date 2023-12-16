const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword, getAllUser, getAllProduct } = require('../database/database')

router.get('/' , async (req,res) => {
    res.render('seller')
})

module.exports = router