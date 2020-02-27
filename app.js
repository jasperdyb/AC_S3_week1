const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const restaurant_list = require('./restaurant.json')


// app.engine('handlebars', exphbs({ defaultLayout: 'Main' }))
// app.set('view engine', 'handlebars')
app.set('view engine', 'pug')

app.use(express.static('public'))

// routers
app.get('/', (req, res) => {
  let key = null
  res.render('index', { restaurants: restaurant_list.results, keyword: key })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurant_list.results.find(data => req.params.id === data.id.toString())
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const key = req.query.keyword
  const restaurants = restaurant_list.results.filter(data => {
    return data.name.toLowerCase().includes(key.toLowerCase()) || data.category.toLowerCase().includes(key.toLowerCase())
  })

  res.render('index', { restaurants: restaurants, keyword: key })
})

// server start
app.listen(port, () => {
  console.log(`server started.`)
})