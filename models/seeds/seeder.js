const mongoose = require('mongoose')
const Restaurants = require('../restaurants')
const User = require('../user')
const bcrypt = require('bcryptjs')
const restaurantList = require('./restaurant.json')
const userList = require('./user.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true })

db = mongoose.connection

db.on('error', () => {
  console.log('Database connection error')
})

db.once('open', () => {
  console.log('database connected.')
  restaurant = restaurantList.results
  user = userList.results

  for (var i = 0; i < user.length; i++) {
    let { name, email, password } = user[i]

    User.findOne({ email: email }).then(user => {
      if (user) {                                       // 檢查 email 是否存在
        console.log('user already exist!')
      } else {
        console.log('add new user')
        let newUser = new User({    // 如果 email 不存在就直接新增
          name,
          email,
          password
        })

        let salt = bcrypt.genSaltSync(10)
        newUser.password = bcrypt.hashSync(newUser.password, salt)

        newUser
          .save((err, userAdded) => {
            console.log(userAdded._id)
            if (userAdded.email === 'user1@example.com') {
              for (var i = 0; i < 3; i++) {
                restaurant[i].userId = userAdded._id
                Restaurants.create(restaurant[i])
                console.log('record added!')
              }
            }
            else if (userAdded.email === 'user2@example.com') {
              for (var i = 3; i < 6; i++) {
                restaurant[i].userId = userAdded._id
                Restaurants.create(restaurant[i])
                console.log('record added!')
              }
            }
          })
          .catch(err => console.log(err))
        console.log('User added!')

        console.log(newUser)
      }
    })
  }

  console.log('done')
})