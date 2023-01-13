const { httpRequest } = require('../../libs/request')
const { baseUrl, token } = require('./config.js')

function setSign(sign) {
  return encode(sign + "###" + timestamp());
}

/**
 *  当前时间戳（10位）
 */
function timestamp() {
  var time = Math.round(new Date().getTime() / 1e3).toString();
  return time;
}

function getCurrentTime() {
  return new Date().getTime();
}

function encode(_str) {
  var staticchars = "PXhw7UT1B0a9kQDKZsjIASmOezxYG4CHo5Jyfg2b8FLpEvRr3WtVnlqMidu6cN";
  var encodechars = "";
  for (var i = 0; i < _str.length; i++) {
    var num0 = staticchars.indexOf(_str[i]);
    if (num0 == -1) {
      var code = _str[i];
    } else {
      var code = staticchars[(num0 + 3) % 62];
    }
    var num1 = parseInt(Math.random() * 62, 10);
    var num2 = parseInt(Math.random() * 62, 10);
    encodechars += staticchars[num1] + code + staticchars[num2];
  }
  return encodechars;
}

function post(url, data, needToken, header = {}) {
  if (Object.keys(header).length) {
    header = header
  }
  if (needToken) header.sign = setSign(token)
  return httpRequest(baseUrl + url, data, 'POST', header)
}

function get(url, data, needToken, header = {}) {
  if (Object.keys(header).length) {
    header = header
  }
  if (needToken) header.sign = setSign(token)
  return httpRequest(baseUrl + url, data, 'GET', header)
}

module.exports = {
  post, get, getCurrentTime
}