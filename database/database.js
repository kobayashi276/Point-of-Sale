const { Sequelize } = require('sequelize')
const userModel = require('./model/user')
const bcrypt = require('bcrypt')
require('dotenv/config')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost:3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'finalnodejs',
})

const User = userModel(sequelize);

(async () => {
    try {
        const adminpassword = await bcrypt.hash('admin', 10)
        const adminUser = await User.create({
            fullname: 'admin',
            email: 'admin@gmail.com',
            password: adminpassword,
            permission: 'admin'
        });
        // Continue with code after the User creation
    } catch (error) {
        // Handle errors here
    }
})();

sequelize.sync()

const createUser = async (fullname, email, password) => {
    User.sync()

    const hashed = await bcrypt.hash(password, 10)

    try {
        const newUser = await User.create({
            fullname: fullname,
            email: email,
            password: hashed,
            permission: 'admin'
        })

        return newUser.JSON()
    }
    catch {
        return null
    }
}

const authUserLogin = async (email, password) => {
    User.sync()

    try {
        var user = await User.findOne({
            where: {
                email: email,
            }
        })

        user = user.toJSON()

        const isvalid = await bcrypt.compare(password, user.password)

        if (isvalid) {
            return user
        }
        else {
            return null
        }
    }
    catch (err) {
        console.log(err)
        return null
    }
}

module.exports = { createUser, authUserLogin }