const news = new require('koa-router')()
const newsController = require('../../controllers/news')

news.post('/newNews', newsController.create)

module.exports = news
