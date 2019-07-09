const News = require('../models/News')

exports.create = async (ctx, next) => {
  const news = new News({ ...ctx.request.body,
    user: ctx.request.body.userId
  })

  try {
    await news.save()

    const allNews = await News.getAll()

    ctx.body = allNews
  } catch (e) {
    ctx.throw(e)
  }
}
