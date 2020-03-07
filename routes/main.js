const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')

// home page
router.get('/', (req, res) => {
  const key = null

  // 載入home.pug
  res.render('home')

})



module.exports = router
