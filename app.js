const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const restaurant_list = require('./restaurant.json')

app.set('view engine', 'pug')

app.use(express.static('public'))

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


// routers
app.get('/', (req, res) => {
  let key = null

  Restaurants.find()
    .lean()
    .exec((err, restaurants) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, keyword: key }) // 將資料傳給 index 樣板
    })
})

app.get('/restaurants/:id', (req, res) => {
  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      // console.log(restaurant)
      return res.render('show', { restaurant: restaurant })
    })
})

app.get('/search', (req, res) => {
  const key = req.query.keyword

  Restaurants.find()
    .lean()
    .exec((err, restaurants) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)
      restaurants_results = restaurants.filter(data => {
        return data.name.toLowerCase().includes(key.toLowerCase()) || data.category.toLowerCase().includes(key.toLowerCase())
      })

      return res.render('index', { restaurants: restaurants_results, keyword: key }) // 將資料傳給 index 樣板
    })

})

// server start
app.listen(port, () => {
  console.log(`server started.`)
})