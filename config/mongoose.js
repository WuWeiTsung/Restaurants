const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurantlist')
const db = mongoose.connection

//mongoDB connection
db.on('error', () => {
  console.log('mongoDB error ！')
})
db.once('open', () => {
  console.log('mongoDB connection!!!')
})

module.exports = db