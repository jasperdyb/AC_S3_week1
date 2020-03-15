const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')(passport)
const flash = require('connect-flash')
const port = 3000


//Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// Session設定
app.use(session({
  secret: 'the special key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

// 設定 middleware
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()

  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  //passport authenticate failed 時傳送的錯誤訊息
  let errorMessage = req.flash('error')[0]

  //將passport預設訊息轉譯
  switch (errorMessage) {
    case 'Missing credentials':
      res.locals.passport_error_msg = '請填寫信箱及密碼'
      break
    case 'Email or Password incorrect':
      res.locals.passport_error_msg = '錯誤的信箱或密碼'
  }

  next()
})

// 載入路由器
app.use('/', require('./routes/main.js'))
app.use('/restaurants', require('./routes/restaurants.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auth.js'))//facebook authentication


// server start
app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})