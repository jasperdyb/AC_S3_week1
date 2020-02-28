const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const restaurant_list = require('./restaurant.json')

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


//Database connection
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })   // 設定連線到 mongoDB
const db = mongoose.connection

// 載入 model
const Restaurants = require('./models/restaurants')


// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入路由器
app.use('/restaurants', require('./routes/restaurants.js'))


//Routers

//main index page
app.get('/', (req, res) => {
  let key = null

  Restaurants.find()
    .lean()
    .exec((err, restaurants) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, keyword: key }) // 將資料傳給 index 樣板
    })
})



//search result
app.get('/search', (req, res) => {
  const key = req.query.keyword

  if (!key) {
    res.redirect('/')
  }

  Restaurants.find()
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      restaurants_results = restaurants.filter(data => {
        return data.name.toLowerCase().includes(key.toLowerCase()) || data.category.toLowerCase().includes(key.toLowerCase())
      })

      return res.render('index', { restaurants: restaurants_results, keyword: key })
    })

})


// server start
app.listen(port, () => {
  console.log(`server started.`)
})