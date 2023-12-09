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

const createUser = async (fullname, email, password) => {
        User.sync()

        const hashed = await bcrypt.hash(password, 10)

        try{
            const newUser = await User.create({
                fullname: fullname,
                email: email,
                password: hashed
            })

            return newUser.JSON()
        }
        catch{
            return null
        }
}

const authUserLogin = async (email,password) =>{
    User.sync()

    try{
        const user = await User.findUser(email)

        const isvalid = await bcrypt.compare(password,user.password)

        if (isvalid){
            return user
        }
        else{
            return null
        }
    }
    catch{
        return null
    }
}

module.exports = { createUser, authUserLogin }