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