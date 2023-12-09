const express = require('express')
const router = express.Router()
const {createUser, authUserLogin} = require('../database/database')
const jwt = require('jsonwebtoken');
const adminpermission = require('../middleware/adminpermission')

router.get('/login',(req,res) => {
    res.render('login')
})

router.post('/login', async (req,res) =>{
    const {email,psw} = req.body

    const user = await authUserLogin(email,psw)
    
    const payload = {
        email: user.email, 
        permission: user.permission
    }

    if (user){
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        req.session.access_token = token
        console.log(token)
        res.redirect('/')
    }
    else{
        res.redirect('/login')
    }
})

router.get('/register',adminpermission,(req,res) => {
    res.render('register')
})

router.post('/register',adminpermission,async (req,res) =>{
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