const User = require('../models/User')
const uuidv4 = require('uuid/v4')

exports.register = async (ctx, next) => {
  // *TODO: create middleware for json | Created at: 07.Jul.2019
  const { username, password, ...userData } = JSON.parse(ctx.request.body)

  try {
    const user = await User.findOne({ username })

    if (user) throw new Error('User already exists')

    const newUser = new User({ ...userData,
      username,
      access_token: uuidv4()
    })
    newUser.setPassword(password)

    await newUser.save()

    ctx.body = newUser.getFields()
  } catch (e) {
    next(e)
  }
}
