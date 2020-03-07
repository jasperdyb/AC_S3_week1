const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000


//Database connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })   // 設定連線到 mongoDB
const db = mongoose.connection


// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//載入模板
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 載入路由器
app.use('/', require('./routes/main.js'))
app.use('/restaurants', require('./routes/restaurants.js'))
app.use('/users', require('./routes/user.js'))


// server start
app.listen(port, () => {
  console.log(`server started.`)
})