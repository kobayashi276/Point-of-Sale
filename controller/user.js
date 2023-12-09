const express = require('express')
const router = express.Router()
const {createUser} = require('../database/database')

router.get('/login',(req,res) => {
    res.render('login')
})

router.get('/register',(req,res) => {
    res.render('register')
})

router.post('/register',async (req,res) =>{
    const {fullname, email, psw} = req.body

    console.log(fullname,email,psw)

    await createUser(fullname,email,psw)
})

module.exports = router;