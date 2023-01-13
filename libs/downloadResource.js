/**
 * 下载资源
 */

const fs = require('fs')
const request = require('request')
const util = require('util')
const { sleep } = require('./common')

const proxy = util.format('http://%s:%d', '127.0.0.1', 4780)

function downloadHandle(imageUrl, filePath, headers) {
  console.log('开始下载', imageUrl)
  sleep(2)
  var r = request({ url:  encodeURI(imageUrl), timeout: 10000}, function(err, res, body) {
    if (err) {
      console.log('+++++==', imageUrl, err)
      console.log('+++++==', res)
      console.log('+++++==', body)
      console.log('+++++==', r.uri.href)
      return false
    }
    if (filePath.indexOf('jpg') > -1 || filePath.indexOf('jpeg') > -1) {
      headers['content-type'] = 'image/jpeg'
    }
    if (filePath.indexOf('png') > -1) {
      headers['content-type'] = 'image/png'
    }
    request({ url: r.uri.href, headers, timeout: 10000 })
    .pipe(
      fs
        .createWriteStream(filePath)
        .on('close', (err) => {
          console.log(err ? '写入失败' : filePath + '下载成功！', err)
        })
        .on('error', (err) => {
          console.log(err)
        })
    )
    .on('error', (err) => {
      console.log('========', err)
    })
  })
}

module.exports = {
  downloadHandle
}
