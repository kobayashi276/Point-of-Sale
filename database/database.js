const { Sequelize } = require('sequelize')
const userModel = require('./model/user')
const bcrypt = require('bcrypt')
require('dotenv/config')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
})

const User = userModel(sequelize);

sequelize.sync()

async function createUser(fullname,email,password){
    User.sync()

    const hashed = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        fullname: fullname,
        email: email,
        password: hashed
    })

    console.log('User added');
}

module.exports = {createUser}