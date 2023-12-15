const { Sequelize } = require('sequelize')
const userModel = require('./model/user')
const authStatusModel = require('./model/authstatus')
const productModel = require('./model/product')
const bcrypt = require('bcrypt')
const { use } = require('../controller/user')
require('dotenv/config')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost:3306',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '123456',
    database: process.env.DATABASE_NAME || 'finalnodejs',
})

const User = userModel(sequelize);
const AuthStatus = authStatusModel(sequelize);
const Product = productModel(sequelize)

sequelize.sync()

const getAllProduct = async () => {
    Product.sync()

    try{
        const product = await Product.findAll()
        if (product){
            return product
        }
        else{
            return null
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}

const getProduct = async (barcode) =>{
    Product.sync()

    try{
        const product = await Product.findOne({
            where:{
                barcode: barcode
            }
        })

        if (product){
            return product
        }
        else{
            return null
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}

const createAuthStatus = async (id, token) => {
    AuthStatus.sync()

    try {
        const auth = await AuthStatus.create({
            id: id,
            token: token
        })


        return auth
    }
    catch (err) {
        console.log(err)
        return null
    }
}

const getTokenVerifyAuthStatus = async (id) => {
    AuthStatus.sync()
    try {
        const auth = await AuthStatus.findByPk(id)
        await AuthStatus.destroy({
            where: {
                id: id
            }
        })
        return auth.token
    }
    catch {
        return null
    }
}

const changeUserActiveStatus = async (id) => {
    User.sync()

    try {
        const user = await User.update({
            active: 'true'
        },
            {
                where: {
                    id: id
                },
                returnning: true
            })

        return user
    }
    catch {
        return null
    }
}

const createUser = async (fullname, email, password) => {
    User.sync()

    try {
        const user = await User.destroy({
            where: {
                email: email
            }
        })
    }
    catch {

    }

    const hashed = await bcrypt.hash(password, 10)

    try {
        const newUser = await User.create({
            fullname: fullname,
            email: email,
            password: hashed,
            phone: null,
            country: null,
            permission: 'seller',
            active: "false",
            lock: 'false'
        })

        return newUser
    }
    catch {
        return null
    }
}

const authUserLogin = async (username, password) => {
    User.sync()

    try {
        var user = await User.findOne({
            where: {
                fullname: username,
            }
        })

        if (user) {
            const isvalid = await bcrypt.compare(password, user.password)

            if (isvalid) {
                return user
            }
            else {
                return null
            }
        }
        else{
            return null
        }


    }
    catch (err) {
        console.log(err)
        return null
    }
}

const getUser = async (email) => {
    User.sync()

    try {
        var user = await User.findOne({
            where: {
                email: email
            }
        })

        if (user) {
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

const getAllUser = async () => {
    User.sync()

    try {
        var user = await User.findAll({
            where: {
                permission: 'seller'
            }
        })

        if (user) {
            return user;
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

const changeUserPassword = async (email, password) => {
    User.sync()

    const hashed = await bcrypt.hash(password, 10)

    try {
        var user = await User.update({
            password: hashed
        },
            {
                where: {
                    email: email
                },
                returnning: true
            })

        if (user) {
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

const lockUser = async (email) => {
    User.sync()

    try{
        const user = await User.update({
            lock: 'true'
        },
        {
            where:{
                email: email
            },
            returnning: true
        })

        if (user){
            return user
        }
        else{
            return null
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}

const unblockUser = async (email) => {
    User.sync()

    try{
        const user = await User.update({
            lock: 'false'
        },
        {
            where:{
                email: email
            },
            returnning: true
        })

        if (user){
            return user
        }
        else{
            return null
        }
    }
    catch(err){
        console.log(err)
        return null
    }
}


(async () => {
    try {
        const adminpassword = await bcrypt.hash('admin', 10)
        const adminUser = await User.create({
            fullname: 'admin',
            email: 'admin@gmail.com',
            password: adminpassword,
            phone: null,
            country: null,
            permission: 'admin',
            active: "true",
            lock: "false"
        });
    } catch (error) {
    }
})();

(async () => {
    try {
        const product = await Product.create({
            barcode: '0000001',
            name: 'Giay',
            importprice: '999999',
            retailprice: '9999999',
            category: 'Clothes'
        });
    } catch (error) {
    }
})();

(async () => {
    try {
        const product = await Product.create({
            barcode: '0000002',
            name: 'Giay',
            importprice: '999999',
            retailprice: '9999999',
            category: 'Clothes'
        });
    } catch (error) {
    }
})();

(async () => {
    try {
        const product = await Product.create({
            barcode: '0000003',
            name: 'Giay',
            importprice: '999999',
            retailprice: '9999999',
            category: 'Clothes'
        });
    } catch (error) {
    }
})();

module.exports = { lockUser, unblockUser, createUser, authUserLogin, createAuthStatus, getTokenVerifyAuthStatus, changeUserActiveStatus, getUser, changeUserPassword, getAllUser, getAllProduct, getProduct }