const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// index(home) router(首頁路由)
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//匯出路由模組
module.exports = router