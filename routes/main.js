const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')
const { authenticated } = require('../config/authMain')

// home page
router.get('/', authenticated, (req, res) => {
  const key = null

  // 載入home.pug
  res.render('home')

})



module.exports = router
