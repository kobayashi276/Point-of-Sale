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

            return user.JSON()
        }
        catch{
            return null
        }
}

// async function createUser(fullname,email,password){
//     User.sync()

//     const hashed = await bcrypt.hash(password, 10)

//     try{
//         const newUser = await User.create({
//             fullname: fullname,
//             email: email,
//             password: hashed
//         })

//         console.log('User added');
//     }
//     catch{
//         console.log('User existed')
//     }
// }

module.exports = { createUser }