const router = new require('koa-router')()

const api = require('./api')

router.get('/*', ctx => ctx.render('index'))
router.use('/api', api.routes())

module.exports = router
