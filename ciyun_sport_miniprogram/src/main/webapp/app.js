//app.js
App({
  data: {
    motto: '欢迎查看慈云微报告',
    item: "images/logo.png",
    name: "中金慈云",
    btn: "login",
    code: "",
    Return: "",
    disabled: true,
  },
  onLaunch: function (options) {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //微信获取设备可用高度
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        // 计算主体部分高度,单位为px
        that.globalData.deviceHeigth = res.windowHeight;
        that.globalData.deviceWidth = res.windowWidth;
      }
    });
    // if (options.referrerInfo){
    //   //that.showToast(options.referrerInfo.appId);
    // }else{
    //   that.appId=1;
    // }
    //that.loginStatus = false
    // 在页面加载时获取thirdSession值
    // wx.login({
    //   success: function (res) {
    //     var code = res.code
    //     that.postCallBack('authorize/getThirdSession', { code: code }, that.callback);
    //   }
    // })
    // // 获取用户信息
    // wx.getUserInfo({
    //   lang: "zh_CN",
    //   success: function (res) {
    //     var userInfo = res.userInfo
    //     // 敏感数据
    //     var watermark = res.encryptedData;
    //     // 用户信息
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女 
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //     that.gender = gender
    //     that.nickName = nickName
    //     that.avatarUrl = avatarUrl
    //     that.city = city
    //     that.province = province
    //     that.country = country
    //     that.loginStatus = true
    //   }
    // })
    // console.log(that);
  },
  
  //向后台获取到的值后，执行函数
  callback: function (res) {

    this.thirdSession = res.data.datas.thirdSession;
    wx.setStorageSync('thirdSession', res.data.datas.thirdSession)
    wx.setStorageSync('jSessionId', res.data.datas.jSessionId)
    var personStatus = res.data.datas.personStatus;
    console.log(this.appId)
    if (personStatus == 1) {//用户未注册过慈云平台或已注册但是未登录过慈云小程序
      wx.navigateTo({
        url: '../register/register'
      })
    } else if (personStatus == 1) {//登录过慈云小程序
      wx.navigateTo({
        url: '../column/column'
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      //typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          //typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    shareTitle: "慈云微报告",
    errorMsg: '',
    appversion:'3.5.9',
    ceshihost:'https://testminisport.ciyun.cn',
    host:'https://minisport.ciyun.cn',
    devhost:'https://devminisport.ciyun.cn',
    toastIconList: ["../index/images/warning.png", "../index/images/secondary.png"]
  },
  //通用提示语
  showToast: function (title,type) {
    var imageUrl;
    if (this.isEmpty(type)){
      imageUrl = this.globalData.toastIconList[type];
    }

    wx.showToast({
      image: imageUrl,
      title: title || '',
      duration: 3000
    });
  },
  //简写为空判断
  isEmpty: function (str) {
    return (str === '' || str === null || str === undefined) ? false : true;
  },
  isLogin: function (type,data,callback){
    var that = this;
      wx.login({
        success: function (res) {
          var code = res.code
          wx.request({
            url: that.globalData.ceshihost + '/user/authorize/getThirdSession',
            data:{
              code:code
            },
            method: 'POST',
            success:function(res){
              that.thirdSession = res.data.datas.thirdSession;
              wx.setStorageSync('thirdSession', res.data.datas.thirdSession)
              wx.setStorageSync('jSessionId', res.data.datas.jSessionId);
              data.thirdSession = res.data.datas.thirdSession;
              that.postCallBack(type,data,callback);
            },
            fail:function(res){
              that.showToast(res.data.message, 0);
            }
          })
        }, fail: function (res) {
          that.showToast(res.data.message, 0);
        }
      });
  },
  //请求回调结果
  postCallBack: function (type, data, callback) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    //网络异常捕获；
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        console.log(networkType);
        if (networkType == 'none') {
          that.showToast(networkType,0);
        } else {
          var host = that.globalData.ceshihost  + type;
            wx.request({
              url: host, //仅为示例，并非真实的接口地址
              data: data,
              method: 'POST',
              header: {
                'content-type': 'application/json',
                'Cookie': 'JSESSIONID=' + wx.getStorageSync('jSessionId')
              },
              success: function (res) {
                wx.hideLoading();
                if (res.data.result == 0) {
                  callback(res);
                } else if (res.data.result == 30001 || res.data.result == 30008){//重新走1-6步流程
                    that.isLogin(type, data, callback);
                    console.log("服务器会话失效")
                }else {
                  that.showToast(res.data.message,0);
                }
              },
              fail: function (res) {
                console.log(res);
                wx.hideLoading();
                that.showToast(res.errMsg,0);
              }

            })
          
        }
      },
      fail: function (res) {
        that.showToast(res.data.message, 0);
        console.log(res);
      }
    })


  }
});

