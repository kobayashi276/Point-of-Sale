const jwt = require('jsonwebtoken');
require('dotenv/config')

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const authenticate = (req, res, next) => {
    const token = req.session.access_token

    console.log(token)


    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;