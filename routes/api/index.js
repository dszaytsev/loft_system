const api = new require('koa-router')()

const auth = require('./auth')
const news = require('./news')
const user = require('./user')

api.use(auth.routes())
api.use(news.routes())
api.use(user.routes())

module.exports = api
