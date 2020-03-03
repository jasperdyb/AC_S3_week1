const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')




//add new info page
router.get('/new', (req, res) => {
  restaurant_null = {}
  res.render('new', { restaurant: restaurant_null })
})

//info added
router.post('/new', (req, res) => {

  const restaurant = new Restaurants(req.body)

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})

//detail page
router.get('/:id', (req, res) => {
  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurant })
    })
})


//info update page
router.get('/:id/edit', (req, res) => {

  Restaurants.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant }) //利用new頁面編輯資訊
    })

})

//info updated
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
      return res.redirect('/')
    })
  })

})


module.exports = router