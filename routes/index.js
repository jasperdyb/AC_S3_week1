const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// main index page
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

module.exports = router
