const user = new require('koa-router')()
const userController = require('../../controllers/user')

const { uploadDir } = require('../../config')
const multer = require('koa-multer')({ dest: uploadDir })

user.delete('/deleteUser/:id', userController.delete)
user.post('/saveUserImage/:id', multer.any(), userController.saveImage)
user.post('/saveNewUser', userController.register)
user.put('/updateUserPermission/:id', userController.update)
user.put('/updateUser/:id', userController.update)
user.get('/getUsers', userController.getAll)

module.exports = user
