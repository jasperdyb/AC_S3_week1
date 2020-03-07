const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// Index of restaurants
router.get('/', (req, res) => {
  const key = null

  Restaurants.find()
    .sort({})
    .lean()
    .exec((err, restaurants) => { // 把 model 所有的資料都抓回來
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants, keyword: key, sortKey: 'default' }) // 將資料傳給 index 樣板
    })
})

// search result
router.get('/search', (req, res) => {
  const key = req.query.searchKey
  const methodKey = req.query.sortMethod
  let method = {}

  if (!key && (methodKey === 'default')) {
    res.redirect('/')
  }

  switch (methodKey) {
    case 'default':
      method = { _id: 'asc' }
      break
    case 'name':
      method = { name: 'asc' }
      break
    case 'rating':
      method = { rating: 'desc' }
      break
    case 'category':
      method = { category: 'asc' }
      break
  }

  Restaurants.find()
    .lean()
    .sort(method)
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      const restaurantsResults = restaurants.filter(data => {
        return data.name.toLowerCase().includes(key.toLowerCase()) || data.category.toLowerCase().includes(key.toLowerCase())
      })

      return res.render('index', { restaurants: restaurantsResults, searchKey: key, sortKey: methodKey })
    })
})


// add new info page
router.get('/new', (req, res) => {
  const restaurantNull = {}
  res.render('new', { restaurant: restaurantNull })
})

// info added
router.post('/new', (req, res) => {
  const restaurant = new Restaurants(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/restaurants')// 新增完成後，將使用者導回首頁
  })
})

// detail page
router.get('/:id', (req, res) => {
  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurant })
    })
})

// info update page
router.get('/:id/edit', (req, res) => {
  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant }) // 利用new頁面編輯資訊
    })
})

// info updated
router.put('/:id', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    console.log(restaurant)
    for (var key in req.body) {
      restaurant[key] = req.body[key]
    }

    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}/`)
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  Restaurants.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err)
    restaurants.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/restaurants')
    })
  })
})

module.exports = router
