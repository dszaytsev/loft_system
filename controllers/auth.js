const passport = require('koa-passport')

exports.login = async (ctx, next) => {
  await passport.authenticate('local', { session: false }, async (err, user) => {
    if (err) return next(err)
    if (!user) ctx.throw(400)

    user.setToken()
    await user.save()

    ctx.body = user.getFields()
  })(ctx, next)
}
