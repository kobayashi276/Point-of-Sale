const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const user = require('./controller/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/',user)
app.set('view engine','ejs')

app.get('/',(req,res) => {
    res.send('index')
})

app.listen(3000, () =>{
    console.log('server run')
})
