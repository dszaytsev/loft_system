const Koa = require('koa')
const Pug = require('koa-pug')
const Router = require('koa-router')
const config = require('./config.json')

const app = new Koa()
const pug = new Pug(config.pug)
const router = new Router()

app.use(require('koa-static')('./public'))

pug.use(app)

require('./db')

router.get('/*', ctx => ctx.render('index'))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
