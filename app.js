const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const restaurant_list = require('./restaurant.json')

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

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

//detail page
app.get('/restaurants/:id', (req, res) => {
  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      // console.log(restaurant)
      return res.render('show', { restaurant: restaurant })
    })
})

//search result
app.get('/search', (req, res) => {
  const key = req.query.keyword

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


//add new info page
app.get('/new', (req, res) => {
  res.render('new')
})

//info added
app.post('/new', (req, res) => {
  console.log('new added!')
  console.log(req.body)

  const restaurant = new Restaurants(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
  // res.render('new')
})

//info update page
app.get('/:id/edit', (req, res) => {
  res.render('new')
})

//info updated
app.post('/:id/edit', (req, res) => {

})

//info delete
app.get('/delete/', (req, res) => {
  Restaurants.find()
    .lean()
    .exec((err, restaurants) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, deleting: true }) // 將資料傳給 index 樣板
    })
})

app.get('/:id/delete', (req, res) => {
  console.log(req.params.id)

  Restaurants.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err)
    restaurants.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })

})

// server start
app.listen(port, () => {
  console.log(`server started.`)
})