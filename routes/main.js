const express = require('express')
const router = express.Router()
const Restaurants = require('../models/restaurants')
const { authenticated } = require('../config/authMain')

// home page
router.get('/', authenticated, (req, res) => {
  const key = null
  registering = false
  // 載入home.pug
  res.render('home', registering)

})



module.exports = router
