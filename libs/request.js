const request = require('request')
const util = require('util')
const Bagpipe = require('bagpipe')

const bagpipe = new Bagpipe(10, {
  timeout: 6000
})

const objectToUrlParmas = (obj) => {
  let query = ''
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      query += key + '=' + element + '&'
    }
  }
  return query.slice(0, query.length - 1)
}

/**
 * http 请求封装
 * @param    {[string]}                     type   [请求类型]
 * @param    {[string]}                     url    [请求地址]
 * @param    {[json/array]}                 data   [请求数据]
 * @param    {[object]}                     header [请求header]
 * @param    {[bool]}                       debug  [是否打印请求信息]
 * @return   {[promise]}                            [promise]
 * @Author:  slade
 * @DateTime :2017-09-15T10:30:42+080
 */
function httpRequest(url, data = {}, type = 'GET', header = {}, debug = false) {
  // 数据
  let options = {
    url: url,
    headers: header,
    method: type,
    timeout: 10000
  }
  if (type.toLowerCase() === 'post') {
    options = Object.assign(options, {
      body: JSON.stringify(data)
    })
  } else if (type.toLowerCase() === 'get') {
    options.url = url + '?' + objectToUrlParmas(data)
  }
  const proxy = util.format('http://%s:%d', '127.0.0.1', 4780)

  console.log('开始请求' + type, options.url)

  // options.proxy = proxy

  console.log('请求参数',options)
  // 调用
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (debug) {
        console.log('请求返回\n', response)
        console.log('请求返回内容\n', body)
        console.error('请求错误\n', error)
      }
      if (!error && response.statusCode == 200) {
        try {
          // var info = typeof body === 'Object' ? body : JSON.parse( body )

          console.log('url\n', url, 'success')
          resolve(body)
        } catch (e) {
          console.log('url\n', url)
          console.log('参数', options)
          console.log('请求返回内容\n', body)
          reject(e)
        }
      } else {
        console.log('url\n', url)
        console.log('参数', options)
        console.log('请求返回内容\n', body)
        reject(error)
      }
    })
  })
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

module.exports = {
  httpRequest,
  sleep
}
