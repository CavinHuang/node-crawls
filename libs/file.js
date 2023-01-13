const fs = require('fs')

function checkDirAndMk(path) {
  if (fs.existsSync(path)) return true
  fs.mkdirSync(path, true)
  return true
}

module.exports = {
  checkDirAndMk
}