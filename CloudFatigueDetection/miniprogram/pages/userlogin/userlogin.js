//自定义变量，存储用户输入的账号
let account = ''
//自定义变量，存储用户输入的密码
let password = ''
const app = getApp()
Page({

  //点击跳转到注册页
  toSign(){
    wx.navigateTo({
      url: '/pages/resigter/resigter',
    })
  },

  //获取用户输入的账号、密码
  getAccount(e){
    console.log("用户输入的账号",e.detail.value);
    account = e.detail.value
  },
  getPassword(e){
    console.log("用户输入的密码",e.detail.value);
    password = e.detail.value
  },

  //登录功能
  loadByAccount(){
    wx.cloud.database().collection("userlist")
    .where({
      username:account,
      password:password
    })
    .get({})
    .then(res=>{
      console.log("获取账号成功",res);
      app.globalData.loginstatue = true
      app.globalData.loginid = res.data[0]._id
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 3];
      console.log(res.data)
      app.globalData.info=res.data
      wx.switchTab({
        url: '../mine/mine',
      })
    })
    .catch(err=>{
      console.log("获取账号失败",err);
      wx.showToast({
        title: '账号不存在',
        icon:"none"
      })
    })
  },
})