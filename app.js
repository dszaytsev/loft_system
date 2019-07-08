const Koa = require('koa')
const Pug = require('koa-pug')
const config = require('./config')
const router = require('./routes')

const app = new Koa()

app.use(require('koa-static')('./public'))

app.use(require('koa-bodyparser')(config.bodyParser))

app.use(require('koa-session')(config.session, app))

const pug = new Pug(config.pug)
pug.use(app)

require('./db')

const passport = require('./config/passport')
app.use(passport.initialize())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
