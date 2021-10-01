//express setting
const express = require('express')
const app = express()
const port = 3000

//mongoDB setting
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantlist')
const db = mongoose.connection

//express-handlebars setting
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

//static files setting
app.use(express.static('public'))

const restaurantList = require('./restaurant.json')

const Restaurant = require('./models/restaurant')

//body-parser setting
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//mongoDB connection
db.on('error', () => {
  console.log('mongoDB error ！')
})
db.once('open', () => {
  console.log('mongoDB connection!!!')
})


//index page router
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//create page router
app.get('/restaurants/create', (req, res) => {
  res.render('create')
})

app.post('/restaurant', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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
