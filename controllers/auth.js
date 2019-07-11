const passport = require('koa-passport')

exports.login = async (ctx, next) => {
  await passport.authenticate('local', async (err, user) => {
    if (err) return next(err)
    if (!user) ctx.throw(400)

    user.setToken()

    await user.save()
    await ctx.login(user)

    ctx.cookies.set('access_token', user.access_token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: false
    })

    ctx.body = user.getFields()
  })(ctx, next)
}

exports.authFromToken = async (ctx, next) => {
  let user = ctx.state.user

  if (Array.isArray(user)) user = user[0]

  if (user) ctx.body = user.getFields()
  else {
    ctx.cookies.set('access_token', null)
    ctx.status = 500
    ctx.path = '/'
  }
}
