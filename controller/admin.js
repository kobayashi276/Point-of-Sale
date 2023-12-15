const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword, getAllUser } = require('../database/database')

router.get('/',async (req,res)=>{ 
    const users = await getAllUser()
    // console.log(users)
    res.render('admin', {users})
})

module.exports = router;