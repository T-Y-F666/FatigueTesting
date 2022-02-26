Page({

    /**
     * 页面的初始数据
     */
    data: {
      //tempimageList1 识别结果信息存储容器
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
      // 轮播图url
      imgUrls: [
        'https://7479-tyf666-3g5e5bl60351a3df-1307943554.tcb.qcloud.la/image/Img01.jpg',
        'https://7479-tyf666-3g5e5bl60351a3df-1307943554.tcb.qcloud.la/image/Img02.jpg',
        'https://7479-tyf666-3g5e5bl60351a3df-1307943554.tcb.qcloud.la/image/Img03.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000

    },
    // 初次选择 点击即选择
    chooseImageTap: function () {
        var that = this;
        wx.showActionSheet({
         itemList: ['从相册中选择', '拍照'],
         itemColor: "#00000",
         success: function (res) {
          if (!res.cancel) {
           if (res.tapIndex == 0) {
            that.chooseWxImage('album')

           } else if (res.tapIndex == 1) {
            wx.navigateTo({
                url: '/pages/photo/photo',	//跳转到自定义的一个拍照页面
              })
           }
          }
         }
        })
       },
       //二次选择 调转页面后选择
       chooseWxImage: function (type) {
        var that = this;
        wx.chooseImage({
         sizeType: ['original', 'compressed'],
         sourceType: [type],
         success: function (res) {
           console.log(res)
          if (res.tempFilePaths.length === 1){
            
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList1[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList1);
            console.log(result)
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 2){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList2[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList2); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 3){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList3[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList3); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 4){
            console.log(res)
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList4[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList4); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 5){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList5[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList5); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 6){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList6[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList6); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 7){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList7[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList7); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 8){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList8[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList8); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
          else if (res.tempFilePaths.length === 9){
            for (let index = 0; index < res.tempFilePaths.length; index ++ ){
            that.data.tempimageList9[index].path = res.tempFilePaths[index]
            that.data.tempimageList1[index].size = res.tempFiles[index].size
            }
            var result=JSON.stringify(that.data.tempimageList9); 
            wx.navigateTo({
              url: '../../pages/publish/publish?result='+result,
            })
          }
         }
        }) 
       },
       
       upImgs: function (imgurl) {
        console.log(imgurl)
        wx.cloud.uploadFile({
          cloudPath: 'temp.png',
          filePath: imgurl,
          success: res=>{
            console.log("上传成功",res.fileID)
            this.addImagePath(res.fileID)
          }, 
          fail: err => {
            // handle error
            console.log("上传失败",err)
          }
        
        })
       },
       addImagePath(fileId) {
        console.log(fileId)
        wx.cloud.getTempFileURL({
          fileList: [fileId],
          success: res => {
            console.log("获取url地址：",res.fileList[0].tempFileURL);
            wx.request({
                    url: 'http://127.0.0.1:8000/PictureResult/', //仅为示例，并非真实的接口地址
                    data: {
                      path: res.fileList[0].tempFileURL
                    },
                    method: "POST",
                    success (res) {
                      console.log(res.data)
                      var result=res.data
                      console.log(result)
                      wx.navigateTo({
                        url: '../PictureResult/PictureResult?result='+result
                      })
                    }
                  })
          },
          fail: console.error
        })
      },

    chooseVideoTap: function(){
       wx.navigateTo({
        url: '/pages/video/video',	//跳转到自定义的一个拍照页面
      })
    },

    chooseRealTimeMonitoringTap: function(){
      wx.navigateTo({
        url: '/pages/RealTimeMonitoring/RealTimeMonitoring',
      })
    },
})