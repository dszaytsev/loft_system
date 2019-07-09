const news = new require('koa-router')()
const newsController = require('../../controllers/news')

news.get('/getNews', newsController.getAll)
news.post('/newNews', newsController.create)
news.put('/updateNews/:id', newsController.update)
news.delete('/deleteNews/:id', newsController.delete)

module.exports = news
