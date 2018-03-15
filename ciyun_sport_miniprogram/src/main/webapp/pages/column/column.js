var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    data: [6723, 4089, 8923, 11255, 2381, 7809, 6359],
    categories: ['02/08', '02/09', '02/10', '02/11', '02/12', '02/13', '02/14']
  }
};
Page({
  data: {
    chartTitle: '',
    isMainChartDisplay: true,
    jinribushu: 0,//今日步数变量初始值
    knowClass: "prompt-conent",//知道了样式控制
  },
  onShow: function (e) {
    var windowWidth = 320;
    var windowHeight = 170;
    var that = this;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;

      app.windowWidth = windowWidth;
      app.windowHeight = res.windowHeight*0.26;
     
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    // 获取计步数据
    wx.getWeRunData({
      lang: "zh_CN",
      success: function (res) {
        console.log(res);
        var param = {
          thirdSession: wx.getStorageSync('thirdSession'),
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        app.postCallBack('/step/save', param, that.callback);
      },
      fail:function(res){
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.werun"]) {////如果用户重新同意了授权登录
                    // 获取计步数据
                    wx.getWeRunData({
                      lang: "zh_CN",
                      success: function (res) {
                        console.log(res);
                        var param = {
                          thirdSession: wx.getStorageSync('thirdSession'),
                          encryptedData: res.encryptedData,
                          iv: res.iv
                        }
                        app.postCallBack('/step/save', param, that.callback);
                      }
                    })
                  }
                }, fail: function (res) {

                }
              })

            }
          }
        })
      },
    });
    



  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return m + d;
  },
  callback(res) {
    var that = this;
    var datas = res.data.datas;

    var timeArray = datas.map(function (item, index) {
      return that.timestampToTime(item.timestamp);
    });
    var bushuArray = datas.map(function (item, index) {
      return item.step;
    });
    that.setData({ jinribushu: bushuArray[bushuArray.length - 1] })
    console.log(app.windowHeight);
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: timeArray,
      color: "#6fba2c",
      legend:false,
      subtitle:{
        color: "#6fba2c"
      },
      series: [{
        name: '步数',
        data: bushuArray,
        color: "#6fba2c",

      }],
      yAxis: {
        format: function (val) {
          return '';
        },
        title: '',
        color: "#6fba2c",
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration',
        color: "#6fba2c"
      },
      extra: {
        column: {
          width: 10
        }
      },
      width: app.windowWidth,
      height: 140,
    });
  },
  onPullDownRefresh(){
    console.log('--------下拉刷新-------');
    wx.stopPullDownRefresh();
    this.onShow();
  },
  clickKnow() {
    this.setData({ knowClass: "none" });
  }

});