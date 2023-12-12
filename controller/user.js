const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, getTokenVerifyAuthStatus, createAuthStatus, changeUserActiveStatus } = require('../database/database')
const jwt = require('jsonwebtoken');
const adminpermission = require('../middleware/adminpermission')
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


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req, res) => {
    const { username, psw } = req.body

    console.log(username)

    const user = await authUserLogin(username, psw)

    if (user) {
        if (user.active === 'true') {
            const payload = {
                email: user.email,
                username: user.fullname,
                permission: user.permission
            }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            req.session.access_token = token
            console.log(token)
            res.redirect('/')
        }
        else if (user.active === 'false') {
            const token = await getTokenVerifyAuthStatus(user.id)
            let verify = null
            try{
                verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            }
            catch{
                //token het han, can phai send mail lai
                return res.status(401).json({ error: 'Your login has been expired. Please contact to admin' });
            }

            if (verify){
                changeUserActiveStatus(user.id)
                const payload = {
                    email: user.email,
                    username: user.fullname,
                    permission: user.permission
                }
                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                req.session.access_token = token
                console.log(token)
                res.redirect('/')
            }
        }
    }
    else {
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
    const loginLink = `${req.protocol}://${req.get('host')}/login`;
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
                await createAuthStatus(user.id, token)
            }

            console.log('Verification email sent')
        }
    });
    res.redirect('/login')
})

// router.get('/verify', (req, res) => {
//     const { token } = req.query;
//     if (!token) {
//         res.redirect('/login')
//     }

//     let verify = null;
//     try {
//         verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     }
//     catch {
//         return res.status(400).json({ error: 'Token expire' });
//     }
//     // Find the user in the database based on the verification token
//     // const verify = verifyAuthStatus(token)

//     if (!verify) {
//         return res.status(400).json({ error: 'Invalid verification token' });
//     }

//     // Mark the user as verified
//     // user.verified = true;

//     res.json({ message: 'Email verified successfully' });
// });

module.exports = router;