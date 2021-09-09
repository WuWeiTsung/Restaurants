//express setting
const express = require('express')
const app = express()
const port = 3000

//express-handlebars setting
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

//static files setting
app.use(express.static('public'))

const restaurantList = require('./restaurant.json')

//index page router
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//show page router
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

//search page router
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const lowerCaseKeyword = keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(lowerCaseKeyword) || restaurant.category.toLowerCase().includes(lowerCaseKeyword)
  })
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`Express is listened on http://localhost:${port}`)
})
