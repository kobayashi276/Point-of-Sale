const jwt = require('jsonwebtoken');
require('dotenv/config')

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

console.log(SECRET_KEY)

const authenticate = (req, res, next) => {
    const token = req.session.access_token

    console.log(token)


    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        let decoded = null;
        try{
            decoded = jwt.verify(token, SECRET_KEY);
        }
        catch{
            res.redirect('/login')
        }
        if (decoded.permission==='admin'){
            req.user = decoded;
            next();
        }
        else{
            return res.status(401).json({ error: 'Access denied. No permisison.' });
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login')
    }
};

module.exports = authenticate;