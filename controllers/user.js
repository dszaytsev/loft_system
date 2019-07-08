const User = require('../models/User')

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
