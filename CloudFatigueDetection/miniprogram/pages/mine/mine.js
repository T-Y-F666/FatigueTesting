var app = getApp();
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Remainingspace: '',
    usedspace: '',
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    db.collection('userlist').where({
      _id:app.globalData.loginid 
    }).get({
      success(res){
        console.log(res)
        that.setData({
          Remainingspace: res.data[0].Remainingspace,
          usedspace:res.data[0].usedspace
        })
      }
    })
  },
  his:function () {
    if (app.globalData.loginid){
    wx.navigateTo({
      url: '../../pages/myhis/myhis',
    })
  }
    else{
      wx.showToast({
        title: '请先登录',
        image: '../image/NoPower.jpg',
        duration: 2000
      })
    }    
  },
  pay(){
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      method: "post",
      data:{ 
        appid:res.code
      },
      success:function(response){
        console.log(response.data);
        // jwt 认证
        wx.setStorageSync('session_key', response.data.session_key);
        wx.setStorageSync('openid', response.data.openid);
        wx.setStorageSync('code', res.code);
      }
    })
  },
})