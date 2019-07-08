const api = new require('koa-router')()

const auth = require('./auth')
const user = require('./user')

api.use(auth.routes())
api.use(user.routes())

module.exports = api
