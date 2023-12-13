require('dotenv/config')

const authenticate = (req, res, next) => {
    const token = req.session.access_token

    if (token) {
        res.redirect('/');
    }
    else{
        next()
    }
};

module.exports = authenticate;