const mongoose = require('mongoose')
const { connectionString } = require('../config')

mongoose.Promise = global.Promise

mongoose.set('useCreateIndex', true)

mongoose.connect(connectionString, { useNewUrlParser: true })

mongoose.connection.on('connected', _ => console.log('DB connection open'))
mongoose.connection.on('error', err => console.error(err))
mongoose.connection.on('disconnected', _ => console.log('DB disconnected'))

process.on('SIGINT', _ => mongoose.connection.close(() => {
  console.log('DB connection closed')
  process.exit(0)
}))
