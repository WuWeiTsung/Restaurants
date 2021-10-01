const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantlist')
const db = mongoose.connection

const Restaurant = require('../restaurant')
const restaurantSeed = require('./restaurant.json')

db.on('error', () => {
  console.log('mongoDB error!!!!')
})

db.once('open', () => {
  console.log('mongoDB connection!')
  restaurantSeed.results.forEach((restaurant) => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Restaurant seeds created !')
})

