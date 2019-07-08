const user = new require('koa-router')()
const userController = require('../../controllers/user')

user.post('/saveNewUser', userController.register)

module.exports = user
