//app.js
App({
  data: {
    debug: 1,
    baseHost: 'http://192.168.1.126:8090/wechat/',//项目的基础路径
    storageKey: {
      token: '$token'
    }

  },

  // es6
  wxPromisify: function (fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) {
          resolve(res)
        }

        obj.fail = function (res) {
          reject(res)
        }

        fn(obj)
      })
    }
  },
  //self-request
  request: function (obj) {
    console.log('====')
    wx.request({
      //header: obj.header||{},
      data: obj.data || {},
      method: obj.method || 'GET',
      header: (obj.method == 'POST' ? { 'content-type': 'application/x-www-form-urlencoded' } : {}),
      url: obj.url,
      success: function (res) {
        var data = res.data
        if (data.code == 200) {
          obj.success(res.data)
        } else if (data.code == 704) {//out of login,redirect to login
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: data.msg,
            success: function (res) {

            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: data.msg,
            success: function (res) {

            }
          })
        }

      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.errMsg,
          success: function (res) {

          }
        })
      },
      complete: function () {
        wx.hideLoading()



      }
    })



  },

  // 获取设备高度
  getScreenHeight() {
    var screenHeight = ''
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.windowHeight - 45
      }
    })
    return screenHeight
  },

  // 字符串中是否有某个值
  permis: function (arr, str) {
    if (arr.split(',').indexOf(str) > -1) {
      return true
    } else {
      return false
    }
  }
})


//js的占位符
String.prototype.format = function () {
  if (arguments.length == 0)
    return this;
  for (var s = this, i = 0; i < arguments.length; i++)
    s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
  return s;
};