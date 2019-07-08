const path = require('path')
const fs = require('fs')
const uuid = require('uuid/v4')

const uploadFile = file => {
  const uploadDir = getUploadDir()

  const fileName = path.join(`${uuid()}${path.extname(file.name)}`)
  const filePath = path.join(uploadDir, fileName)

  return new Promise((resolve, reject) => {
    fs.rename(file.path, filePath, err => {
      if (err) reject(err)

      resolve(path.join('uploads', fileName))
    })
  })
}

const getUploadDir = () => {
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

  return uploadDir
}

module.exports = uploadFile
