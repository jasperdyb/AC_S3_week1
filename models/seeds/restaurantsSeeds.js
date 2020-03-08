const mongoose = require('mongoose')
const Restaurants = require('../restaurants')
const User = require('../user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const restaurant_list = require('./restaurant.json')
const user_list = require('./user.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => {
  console.log('Database connection error')
})

db.once('open', () => {
  console.log('database connected.')
  restaurant = restaurant_list.results
  user = user_list.results

  for (var i = 0; i < user.length; i++) {
    let { name, email, password } = user[i]

    User.findOne({ email: email }).then(user => {
      if (user) {                                       // 檢查 email 是否存在
        console.log('user already exist!')
      } else {
        let newUser = new User({    // 如果 email 不存在就直接新增
          name,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash

            newUser
              .save()
              .catch(err => console.log(err))

          })
        )
      }
    })
  }


  User.findOne({ email: "user1@example.com" })
    .lean()
    .exec((err, user) => {
      for (var i = 0; i < 3; i++) {
        restaurant[i].userId = user._id
        Restaurants.create(restaurant[i])
      }
    })

  User.findOne({ email: "user2@example.com" })
    .lean()
    .exec((err, user) => {
      for (var i = 3; i < 6; i++) {
        restaurant[i].userId = user._id
        Restaurants.create(restaurant[i])
      }
    })


  console.log('done')
})