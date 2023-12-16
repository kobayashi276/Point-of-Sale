const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword } = require('../database/database')
const jwt = require('jsonwebtoken');
const adminpermission = require('../middleware/adminpermission')
const logincheck = require('../middleware/logincheck')
const logoutcheck = require('../middleware/logoutcheck')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generatePassword = () => {
    return crypto.randomBytes(8).toString('hex');
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
});


router.get('/login', logoutcheck, (req, res) => {
    res.render('login')
})


router.post('/login', logoutcheck, async (req, res) => {
    const { username, psw } = req.body

    // console.log(username)

    const user = await authUserLogin(username, psw)

    if (user) {
        if (user.active === 'false') {
            res.send('Please login via the link was given from the email!')
        }
        else {
            const payload = {
                email: user.email,
                username: user.fullname,
                permission: user.permission
            }
            if (user.active === 'true') {
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                req.session.access_token = token
                res.redirect('/') //phan quyen cho
            }
            else {
                res.redirect('/login')
            }
        }
    }
    else {
        // req.flash('success','Wrong username or password!')
        res.redirect('/login')
    }
})

router.get('/register', adminpermission, (req, res) => {
    res.render('register')
})

router.post('/register', adminpermission, async (req, res) => {
    const { email } = req.body

    const password = generatePassword();
    const payload = {
        fullname: password,
        email: email,
        password: password,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    console.log(token)
    const loginLink = `${req.protocol}://${req.get('host')}/firstlogin?token=${token}`;
    const mailOptions = {
        from: 'yuokawaii84@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Your account has been created. Please login at ${loginLink} for verification. This will expire about 1 minute \n User: ${password}, Password: ${password}`,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            const user = await createUser(password, email, password)

            if (user) {
                console.log(user)
                res.redirect('/admin')
                // await createAuthStatus(user.id, token)
            }

            console.log('Verification email sent')
        }
    });
    res.redirect('/login')
})

router.get('/firstlogin', async (req, res) => {
    const { token } = req.query
    if (!token) {
        res.redirect('/login')
    }
    let verify = null
    try {
        verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.session.access_token = token
        res.redirect('/change-password')
    }
    catch {
        res.send('Your link has been expired, please contract to the admin to give a new link')
    }
})

router.get('/change-password', logincheck, async (req, res) => {
    const token = req.session.access_token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await getUser(decoded.email)
    let isnew = 0
    if (user.active === 'false') {
        isnew = 1
    }
    res.render('change_password', { isnew })
})

router.post('/change-password', logincheck, async (req, res) => {
    const token = req.session.access_token
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }
    catch (err) {
        console.log(err)
        res.redirect('/login')
    }
    const user = await getUser(decoded.email)
    if (user.active === 'true') {
        const { pswcurrent } = req.body

        const user = await authUserLogin(user.fullname, pswcurrent)
        if (!user) {
            res.redirect('/change-password')
        }
    }

    const { psw, pswrepeat } = req.body

    if (psw === pswrepeat) {
        const usernewpassword = await changeUserPassword(decoded.email, psw)

        if (usernewpassword) {
            console.log(usernewpassword)
            if (user.active === 'false') {
                await changeUserActiveStatus(user.id)
            }
        }

        req.session.destroy()

        res.redirect('/login')
    }
})

router.get('/logout', logincheck, (req, res) => {
    req.session.destroy()

    res.redirect('/login')
})

module.exports = router;