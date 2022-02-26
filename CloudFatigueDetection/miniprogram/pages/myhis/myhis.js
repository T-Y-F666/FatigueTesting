const DB = wx.cloud.database().collection("userhis")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
          {value: 'All', name: '全部', checked: 'true'},
          {value: 'Picture', name: '图片'},
          {value: 'Video', name: '视频'}
        ],
        showdata:[],
        isShown: true
      },
    radioChange(e) {
        var that = this
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        if (e.detail.value==='All'){
            that.showAll()
        }
        if (e.detail.value==='Picture'){
          that.showPicture()
        }
        if (e.detail.value==='Video'){
          that.showVideo()
        }
      },
      showAll(){
        var that = this  
        DB.where({
          user: app.globalData.loginid
        }).get({
            success(res){
                console.log("查询成功",res)
                that.setData({
                    showdata: res.data
                })
            }
        }) 
     },
     showVideo() {
      var that = this  
      DB.where({
        fileID: {
          $regex: '.*' + '.mp4'
        }
      })
      .get({
        success: function(res) {
          console.log(res.data)
          that.setData({
            showdata: res.data
          })
        }
      })
     },
     showPicture() {
      var that = this  
      DB.where({
        fileID: {
          $regex: '.*' + 'png' + '.*'
        }
      })
      .get({
        success: function(res) {
          console.log(res.data)
          that.setData({
            showdata: res.data
          })
        }
      })
     }
})