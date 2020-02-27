const mongoose = require('mongoose')
// const Todo = require('../todo')
const Restaurants = require('../restaurants')
const restaurant_list = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => {
  console.log('Database connection error')
})

db.once('open', () => {
  console.log('database connected.')
  data = restaurant_list.results
  // console.log(data)

  for (var i = 0; i < data.length; i++) {
    // console.log(data[i].name)
    Restaurants.create(data[i])
  }

  console.log('done')
})