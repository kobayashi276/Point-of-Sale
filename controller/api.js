const express = require('express')
const router = express.Router()
const { createUser, authUserLogin, changeUserActiveStatus, getUser, changeUserPassword, getAllUser, getAllProduct } = require('../database/database')