
var app = getApp();

var urlData = {
  getAddress: 'repairPerson?token={0}'//地点接口 
}

/**地点 */
var getAddress = app.wxPromisify(function (obj) {
  var token = wx.getStorageSync(app.data.storageKey.token);//同步
  if (app.data.debug == 1) {
    obj.success(
      {
        "msg": "success", "body": [
          {key: 'B', cols: [
            { display: '冰河路', searchs: 'BHL',id:0}, 
            { display: '滨康路', searchs: 'BKL' ,id:2}]
          },
          {key: 'C', cols: [
              { display: '曹家桥', searchs: 'CJQ',id:3 },
              { display: '朝阳', searchs: 'CY',id:4 }]
          },
          {
            key: 'D', cols: [
              { display: '打铁关', searchs: 'DTG',id:5 },
              { display: '定安路', searchs: 'DAL' ,id:7}]
          },
          {
            key: 'X', cols: [
              { display: '西湖文化广场', searchs: 'XHWHGC',id:6 },
              { display: '湘湖', searchs: 'XH',id:8 }]

          }

        ], "code": 200
      }
    );
  } else {
    app.request({
      url: app.data.baseHost + urlData.getAddress.format(token),
      success: function (res) {
        obj.success(res)
      }
    })
  }
})







module.exports = {
  getAddress: getAddress
}