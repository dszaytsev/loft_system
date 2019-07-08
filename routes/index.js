const router = new require('koa-router')()

const api = require('./api')

router.use('/api', api.routes())
router.get('/*', ctx => ctx.render('index'))

module.exports = router
