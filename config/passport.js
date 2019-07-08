const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

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
