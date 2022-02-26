var app = getApp();

const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    code:"",
    Remainingspace: "",
    usedspace: ""
  },
  bindPhoneInput: function (e) {
    this.setData({ phone: e.detail.value });
  },
  bindCodeInput: function (e) {
    this.setData({ code: e.detail.value });
  },
  /** 
   * 点击获取短信验证码
   */
  onClickCheckCode: function (e) {
    // 判断手机号格式是否正确
    if (this.data.phone.length == 0) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
      return
    }
    var reg = /^(1[3|4|5|6|7|8|9])\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none'
      })
      return
    }
    // 发送短信验证码，登录成功之后获取jwt和微信用户信息，保存到globalData和本地存储中。
    wx.request({
      url: "http://127.0.0.1:8000/MessageResult/",
      data: { phone: this.data.phone },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if(res.data.status){
          // 倒计时计数器
          wx.showToast({ title: res.data.message, icon: 'none' });
        }else{
          // 短信发送失败
          wx.showToast({title: res.data.message,icon: 'none'});
        }
      }
    })
    


  },
  password(){
    wx.navigateTo({
      url: '../../pages/userlogin/userlogin',
    })
  },
  onClickSubmit:function(e){
    let that = this
    e.detail.userInfo
    wx.request({
      url: "http://127.0.0.1:8000/VerificationResult/",
      data: { phone: that.data.phone, code: that.data.code },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        if (res.data === 'ValidationFailed') {
          db.collection('userlist').where({
            phone: that.data.phone
          })
          .get({
            success: function(res) {
              console.log(res.data)
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              prevPage.setData({//设置上个页面中message属性值，
                Remainingspace: res.data[0].Remainingspace,
                usedspace: res.data[0].usedspace,
              })
              app.globalData.loginstatue = true
              wx.navigateBack({
                delta: 1
              }) 
            }
          })
        } else {
          wx.showToast({ title: "登录失败", icon: 'none' });
        }
      }
    })
  },
  onClickLogin:function(e){
    wx.request({
      url: "http://127.0.0.1:8000/api/login/",
      data: { phone: this.data.phone,code:this.data.code },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        if(res.data.status){
          // 初始化用户信息
          wx.getUserInfo({
            success:function(local){
              console.log(local);
              app.initUserInfo(res.data.data, local.userInfo);
            }
          })
          wx.navigateBack({});
        }else{
          wx.showToast({ title: "登录失败", icon: 'none' });
        }
        
      }
    })
  },
  resigter(){
    wx.navigateTo({
      url: '../resigter/resigter',
    })
  }
})