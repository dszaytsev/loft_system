const User = require('../models/User')
const uploadFile = require('../services/uploadFile')

exports.getAll = async (ctx, next) => {
  try {
    const users = await User.find()

    ctx.body = users.map(user => user.getFields())
  } catch (e) {
    ctx.throw(e)
  }
}

exports.register = async (ctx, next) => {
  const { username, password, ...userData } = ctx.request.body

  try {
    const user = await User.findOne({ username })

    if (user) throw new Error('User already exists')

    const newUser = new User({ ...userData, username })
    newUser.setToken()
    newUser.setPassword(password)

    await newUser.save()

    ctx.body = newUser.getFields()
  } catch (e) {
    next(e)
  }
}

exports.update = async (ctx, next) => {
  const userId = ctx.params.id
  try {
    // deprecated but useFindAndModify returns 404 ¯\_(ツ)_/¯
    const user = await User.findByIdAndUpdate(userId, ctx.request.body, { new: true, })

    ctx.body = user.getFields()
  } catch (e) {
    ctx.throw(e)
  }
}

exports.saveImage = async (ctx, next) => {
  const userId = ctx.params.id
  const file = ctx.req.files[0]

  try {
    const path = await uploadFile({
      name: file.originalname,
      path: file.path
    })

    await User.findByIdAndUpdate(userId, { image: path })

    ctx.body = { path }
  } catch (e) {
    ctx.throw(e)
  }
}

exports.delete = async (ctx, next) => {
  const userId = ctx.params.id

  try {
    await User.findByIdAndDelete(userId)

    ctx.status = 200
  } catch (e) {
    ctx.throw(e)
  }
}
