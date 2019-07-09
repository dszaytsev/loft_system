const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.find({ _id: id })
  done(null, user)
})

passport.use(new LocalStrategy(
  { passReqToCallback: true },

  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ username })

      if (!user || !user.validatePassword(password))
        return done(null, false)

      return done(null, user)
    } catch (e) {
      done(e)
    }
  })
)

module.exports = passport
