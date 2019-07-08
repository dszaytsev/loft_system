const auth = new require('koa-router')()
const authController = require('../../controllers/auth')

auth.post('/login', authController.login)
auth.post('/authFromToken', authController.authFromToken)

module.exports = auth
