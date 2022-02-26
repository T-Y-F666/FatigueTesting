const DB = wx.cloud.database().collection("userlist")

//自定义变量，存储用户输入的账号
let account = ''
//自定义变量，存储用户输入的密码
let password = ''
let passwordagain =  '' 
Page({
    // data: {
    //     account : '',
    //     password : ''
    // },

  //点击跳转到注册页
  toSign(){
    if(account===''){
      wx.showToast({
        title: '请输入用户名',
        duration: 2000
      })
    }
    if(account.length<3){
      wx.showToast({
        title: '用户名至少3位',
        icon:"none"
      })
      return
    }
    
    else if(password===''){
      wx.showToast({
        title: '请输入密码',
        duration: 2000
      })
    }

    if(password.length<4){
        wx.showToast({
          title: '密码至少4位',
          icon:"none"
        })
        return
      }
    
    
    else if(passwordagain===''){
      wx.showToast({
        title: '请再次输入用户名',
        duration: 2000
      })
    }
    else if (password === passwordagain && password!==''){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        DB.add({
          data:{
            time: year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second,
            username: account,
            password: password,
            usedspace: 0,
            Remainingspace: 1073741824,
            phone: "",

          },
          success(res){
            console.log("添加成功",res)
            wx.navigateTo({
              url: '../login/login',
            })
          },
          fail(res){
            console.log("添加失败",res)
          }
        })
    }
    else {
        wx.showToast({
          title: '两次输入的密码不一致',
          duration: 3000
        })
    }
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
  getPasswordAgain(e){
    console.log("用户输入的密码",e.detail.value);
    passwordagain = e.detail.value
  },

//   //登录功能
//   loadByAccount(){
//       wx.navigateTo({
//         url: '../userlogin/userlogin',
//       })
//     //校验账号
//     if(account.length<4){
//       wx.showToast({
//         title: '账号至少4位',
//         icon:"none"
//       })
//       return
//     }
//     //登录功能的实现
//     wx.cloud.database().collection("users")
//     .where({
//       Account:account
//     })
//     .get({})
//     .then(res=>{
//       console.log("获取账号成功",res);
//       //校验密码长度
//       if(password.length<4){
//         wx.showToast({
//           title: '密码至少4位',
//           icon:"none"
//         })
//         return
//       }
//       //校验密码是否等于数据库中的密码
//       if(password==res.data[0].Password){
//         console.log("登录成功",res);
//         //显示登录成功提示
//         wx.showToast({
//           title: '登录成功',
//           icon:"success",
//           duration:2000,
//           //提示2秒后自动跳转到首页
//           success:function(){
//             setTimeout(function(){
//               wx.switchTab({
//               url: '/pages/index/index',
//               })
//             },2000)
//           }
//         })
//       }else{
//         console.log("密码不正确，登录失败");
//         wx.showToast({
//           title: '密码不正确',
//           icon:"none"
//         })
//       }
//     })
//     .catch(err=>{
//       console.log("获取账号失败",err);
//       wx.showToast({
//         title: '账号不存在',
//         icon:"none"
//       })
//     })
//   },




})