require('dotenv/config')

const authenticate = (req, res, next) => {
    const token = req.session.access_token

    if (!token) {
        res.redirect('/login');
    }
    else{
        next()
    }
};

module.exports = authenticate;