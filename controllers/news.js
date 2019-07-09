const News = require('../models/News')

exports.create = async (ctx, next) => {
  const news = new News({ ...ctx.request.body,
    user: ctx.request.body.userId
  })

  try {
    await news.save()

    ctx.body = await News.getAll()
  } catch (e) {
    ctx.throw(e)
  }
}

exports.update = async (ctx, next) => {
  try {
    await News.findByIdAndUpdate(ctx.params.id, ctx.request.body)

    ctx.body = await News.getAll()
  } catch(e) {
    ctx.throw(e)
  }
}

exports.delete = async (ctx, next) => {
  try {
    await News.findByIdAndDelete(ctx.params.id)

    ctx.body = await News.getAll()
  } catch(e) {
    ctx.throw(e)
  }
}

exports.getAll = async (ctx, next) => {
  try {
    const news = await News.getAll()

    ctx.body = news
  } catch(e) {
    ctx.throw(e)
  }
}
