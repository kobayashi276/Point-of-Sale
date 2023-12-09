const express = require('express')
const router = express.Router()
const {createUser, authUserLogin} = require('../database/database')

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/login',(req,res) =>{
    const {email,psw} = req.body

    const user = authUserLogin(email)

    if (user){
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

router.get('/register',(req,res) => {
    res.render('register')
})

router.post('/register',async (req,res) =>{
    const {fullname, email, psw, pswrepeat} = req.body

    console.log(fullname,email,psw,pswrepeat)

    const user = await createUser(fullname,email,psw)

    if (user){
        res.redirect('/login')
    }
    else{
        res.redirect('/register')
    }
})

module.exports = router;