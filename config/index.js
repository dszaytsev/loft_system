exports.pug = {
  'viewPath': './views',
  'basedir': './views',
  'pretty': true,
  'noCache': true
}

exports.connectionString = 'mongodb://loftsystem:password@localhost:27017/loftsystem'

exports.bodyParser = {
  extendTypes: { json: ['text/plain'] }
}

exports.session = {
  'key': 'koa:sess',
  'maxAge': 'session',
  'overwrite': true,
  'httpOnly': true,
  'signed': false,
  'rolling': false,
  'renew': false
}

exports.uploadDir = './public/uploads'
