// pages/test02/test02.js
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    uploaded: false,
    url: "",
    temp:"",
    videoList:[]
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
  chooseVideo() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          temp:res.tempFilePath
        })
        that.setData({
          videoList: that.data.videoList.concat(res.tempFilePath)
        });
      }
    })
    
  },
  uploadVideo() {
    var that = this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.mp4',
      filePath: that.data.temp, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
        let cnt = 0,index = 0 
        for(let i = 0; i < res.fileID.length; ++i){
          if (res.fileID[i] === '/'){
            cnt ++
            if (cnt === 3){
              index = i
              break
            }
          }
        }
        console.log(res.fileID[index])
        that.setData({
          // url: res.fileID.replace(res.fileID[index].toString(), ".tcb.qcloud.la/"),
          url: res.fileID.replace("cloud://tyf666-3g5e5bl60351a3df.", "https://"),
          uploaded: true,
        })
        console.log(that.data.url)
        that.setData({
          url: that.data.url.slice(0, 47) + ".tcb.qcloud.la/" + that.data.url.slice(48),
        })

        console.log(that.data.url)
      },
      fail: err => {
        // handle error
      }
    })
  },
  distingguish() {
    this.videodetect(this.data.url)
  },

  videodetect: function (url) {
      wx.request({
        url: 'http://127.0.0.1:8000/PictureResult/',
        data: {
          path: url
        },
        method: "POST",
        success (res) {
          let newStr = res.data.split("    ")
          let sumnormal = 0, sumfatigue = 0            
          for (let index = 0; index < newStr.length; ++ index ){
              if (newStr[index].split(" ")[3] === "normal," || newStr[index].split(" ")[3] === "normals,"){
                  sumnormal += parseInt(newStr[index].split(" ")[2])
              }else if (newStr[index].split(" ")[3] === "fatigue," || newStr[index].split(" ")[3] === "fatigues,"){
                  sumfatigue += parseInt(newStr[index].split(" ")[2])
              }
          }
          console.log(sumnormal)
          console.log(sumfatigue)
          wx.navigateTo({
              url: '../../pages/pie/pie?normalresult='+sumnormal+'&fatigueresult='+sumfatigue
          })
        }
      })
  }
})