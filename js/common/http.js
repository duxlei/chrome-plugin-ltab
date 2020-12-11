(function (win) {
  function http() {}

  http.prototype.HOST = "http://www.duxlei.top"
  // http.prototype.HOST = "http://127.0.0.1"
  http.prototype.PORT = 8080
  http.prototype.URL_RPE = http.prototype.HOST + ":" + http.prototype.PORT + "/ltab"
  
  
  /** GET 请求封装 */
  http.prototype.GET = function (url, data, callback) {
    $.get(http.prototype.URL_RPE + url, data, callback)
  }
  
  /** GET 请求封装 */
  http.prototype.POST = function (url, data, callback) {
    $.post(http.prototype.URL_RPE + url, data, callback)
  }
  win.http = new http()
} (window))
