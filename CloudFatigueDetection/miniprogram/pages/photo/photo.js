// pages/photo/photo.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
      tempimageList1: [
        { path: '', size: '', percent:0 }
      ],
      tempimageList2: [
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 }
      ],
      tempimageList3: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
      ],
      tempimageList4: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
      ],
      tempimageList5: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
      ],
      tempimageList6: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
      ],
      tempimageList7: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 }
      ],
      tempimageList9: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 }
      ],
      tempimageList9: [
        { path: '', size: '', percent:0 }, 
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 },
        { path: '', size: '', percent:0 }
      ],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

      // 拍摄按钮按下, 执行record 触发拍摄
  record(){
    var that = this
    that.data.cameraContext = wx.createCameraContext()
    that.data.cameraContext.takePhoto({
      quality:"high", //高质量的图片
      success: res => {
        //res.tempImagePath照片文件在手机内的的临时路径
        let tempImagePath = res.tempImagePath
        wx.saveFile({
          tempFilePath: tempImagePath,
          success: function (res) {
              that.data.tempimageList1[0].path = res.savedFilePath
            var result=JSON.stringify(that.data.tempimageList1);
              wx.navigateTo({
                url: '../../pages/publish/publish?result='+result,
              })
            wx.cloud.uploadFile({
              cloudPath: 'temp.png'+uuid.wxuuid(),
              filePath: imgurl.path,
              success: res=>{
                console.log(res)
                console.log("上传成功",res.fileID)
                var index = that.data.Index
                that.setData({
                  ['imageList[' + index + '].percent']: 25,
                })
                that.addData(res.fileID)
                that.addImagePath(res.fileID)
              }, 
              fail: err => {
                console.log("上传失败",err)
              }
            })

            console.log(res)
            wx.request({
                url: 'http://127.0.0.1:8000/PictureResult/', //仅为示例，并非真实的接口地址
                data: {
                  path: res.savedFilePath
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: "POST",
                success (res) {
                  console.log(res.data)
                }
              })
          },
          //保存失败回调（比如内存不足）
          fail: console.log
        })
      }
    })
  },
  upImgs: function (imgurl) {
  var that = this
  wx.cloud.uploadFile({
    cloudPath: 'temp.png'+uuid.wxuuid(),
    filePath: imgurl.path,
    success: res=>{
      console.log(res)
      console.log("上传成功",res.fileID)
      var index = that.data.Index
      that.setData({
        ['imageList[' + index + '].percent']: 25,
      })
      that.addData(res.fileID)
      that.addImagePath(res.fileID)
    }, 
    fail: err => {
      // handle error
      console.log("上传失败",err)
    }
  })
 },
 addData(fileid) {
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
      fileID: fileid,
      user: app.globalData.loginid
    },
    success(res){
      console.log("添加成功",res)
    },
    fail(res){
      console.log("添加失败",res)
    }
  })
 },
 addImagePath(fileId) {
  var that = this 
  console.log(fileId)
  wx.cloud.getTempFileURL({
    fileList: [fileId],
    success: res => {
      let index1 = that.data.Index
      console.log(that.data.Index)
      console.log(that.data.imageList.length)
      that.setData({
        ['imageList[' + index1 + '].percent']: 100,
        imgList: that.data.imgList.concat(res.fileList[0].tempFileURL)
      })
      if (that.data.Index < that.data.imageList.length ) {
        that.setData({
          Index: that.data.Index+=1
        })
        if(that.data.Index < that.data.imageList.length){
          that.upImgs(that.data.imageList[that.data.Index])
        }
        console.log(that.data.imgList)
      }
    that.setData({
      uploaded: true
    })
    wx.showToast({
      title: '上传成功',
      icon: 'succes',
      duration: 1000,
      mask:true
  })
 },
    fail: console.error
 })
},
})