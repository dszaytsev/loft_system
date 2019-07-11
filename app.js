require('dotenv').config()

const Koa = require('koa')
const Pug = require('koa-pug')
const MongooseStore = require('koa-session-mongoose')
const socket = require('./services/socket')
const config = require('./config')
const router = require('./routes')

const app = new Koa()

app.use(require('koa-static')('./public'))

require('./services/db')

app.use(require('koa-bodyparser')(config.bodyParser))

app.use(require('koa-session')({ ...config.session,
  store: new MongooseStore({ connection: require('mongoose') })
}, app))

const pug = new Pug(config.pug)
pug.use(app)

const passport = require('./services/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    console.error(err)

    ctx.status = err.status || 500
  }
})

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Server started on: ${port}`))
socket(server)
