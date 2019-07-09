const mongoose = require('mongoose')

const news = new mongoose.Schema({
  date: { type: String, require: true },
  theme: { type: String, required: true },
  text: { type: String, require: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

news.methods.getFields = function () {
  return {
    id: this._id,
    theme: this.theme,
    text: this.text,
    date: this.date,
    userId: this.user._id,
    user: this.user.getFields()
  }
}

news.statics.getAll = async function () {
  const news = await this.find().populate('user')

  return news.map(news => news.getFields())
}

module.exports = mongoose.model('News', news)
