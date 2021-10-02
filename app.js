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

//routes setting
const routes = require('./routes')
app.use(routes)

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
