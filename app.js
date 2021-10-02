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

//method-override setting
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// const restaurantList = require('./restaurant.json')

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
    .sort({ _id: 'asc' })
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
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page router
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name,
        restaurant.name_en = req.body.name_en,
        restaurant.category = req.body.category,
        restaurant.image = req.body.image,
        restaurant.location = req.body.location,
        restaurant.phone = req.body.phone,
        restaurant.google_map = req.body.google_map,
        restaurant.rating = req.body.rating,
        restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete routers
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
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
