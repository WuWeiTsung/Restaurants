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

//search page router
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  //find()用法
  //or表示在陣列裡的條件滿足一個即可，$regex表示一個正規表示式，匹配了keyword。同時，加入了$option的$i表示忽略大小寫
  Restaurant.find({
    $or: [
      { 'name': { '$regex': keyword, $options: '$i' } },
      { 'category': { '$regex': keyword, $options: '$i' } }]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

//匯出路由模組
module.exports = router