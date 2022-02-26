var uuid = require('../../utils/uuid')
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    imgList: [],
    result: [],
    resultArray: [{cnt: '', size: '', num: '', att: '', url: ''},{cnt: '', size: '', num: '', att: '', url: ''},],
    // tempFileURL:[],
    Index: 0,
    publish: true,
    uploaded: false ,
    distingguishbtn: false
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imageList: [],
      result:options.result,
      imgList: [
      
      ],
      resultArray1:[
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray2: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray3: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray4: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray5: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray6: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray7: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray8: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],
      resultArray9: [
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
        {cnt: '', size: '', num: '', att: '', url: ''},
      ],

      Index: 0,
    });
    console.log(this.data.result)
    console.log(JSON.parse(this.data.result).length)
    for(let index = 0; index < JSON.parse(this.data.result).length; ++ index ){
      console.log(JSON.parse(this.data.result)[index])
      this.setData({
        imageList:this.data.imageList.concat(JSON.parse(this.data.result)[index])
      })

    }
  },


  checkth: function () {
    
  },

  uploadImage: function() {
    var that = this;
        wx.showActionSheet({
         itemList: ['从相册中选择', '拍照'],
         itemColor: "#00000",
         success: function (res) {
          if (!res.cancel) {
           if (res.tapIndex == 0) {
            console.log("成功")
            wx.chooseImage({
              
              count: 9,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              success: res => {
                var oldLength = parseInt(that.data.imageList.length);
                // 最多上传9张
                let totalCount = res.tempFiles.length + that.data.imageList.length;
                if (totalCount > 9) {
                  wx.showToast({
                    title: '图片最多选择9张',
                    icon: 'none'
                  });
                  return
                };
                console.log(that.data.imageList.concat(res.tempFiles));
                // 本地图片在页面预览
                console.log(res.tempFiles)
                that.setData({
                  imageList: that.data.imageList.concat(res.tempFiles)
                });
              }
            })

           } 
           else if (res.tapIndex == 1) {
            wx.navigateTo({
                url: '/pages/photo/photo',	//跳转到自定义的一个拍照页面
              })
           }
          }
         }
        })
    // 选择图片并上传
  },


  removeImage: function(event) {
    // 判断是否正在上传，如果正在上传就终止，否则就删除；
    // 删除图片，终止 & 删除
    var index = event.currentTarget.dataset['index'];
    var item = event.currentTarget.dataset['item'];
    if (item.percent == 100) {
      wx.cloud.deleteFile({
        fileList: ['cloud://tyf666-3g5e5bl60351a3df.7479-tyf666-3g5e5bl60351a3df-1307943554/temp.png01036eee-a5b0-4a82-89dd-ec9b3dc1e7ca']
      }).then(res => {
        // handle success
        console.log(res.fileList)
      }).catch(error => {
        // handle error
      })

    }


  },

  publishNews: function() {
    var that=this;
    //发布至少需要一张图片
    if (that.data.imageList.length < 1) {
      wx.showToast({
        title: '至少选择一张图片',
        icon: 'none'
      });
      return
    }
    if(that.data.publish){
      that.upImgs(that.data.imageList[0])
      that.setData({
        publish: false
      }) 
    }   
  },

distingguish :function () {
  var that = this
  that.setData({
    distingguishbtn: true
  })
  that.detect(0);
},



preview(event) {
  let currentUrl = event.currentTarget.dataset.src
  wx.previewImage({
    current: currentUrl, // 当前显示图片的http链接
    urls: this.data.imgList // 需要预览的图片http链接列表
  })
},
detect(i) {
  var that = this
  console.log(that.data.imgList)
  wx.request({
    url: 'http://127.0.0.1:8000/PicturesResult/', //仅为示例，并非真实的接口地址
    data: {
      path: that.data.imgList[i]
    },
    method: "POST",
    success (res) {
      let cntindex = 0, sizeleftindex = 0, sizerightindex = 0, spacecnt = 0, numleftindex = 0, numrighrindex = 0
      for (let i = 0; i < res.data.length; ++i ){
        if (res.data[i] === ':') 
          cntindex = i
        if (res.data[i] === ' ') {
          spacecnt ++
        if (spacecnt === 1) 
          sizeleftindex = i
        if (spacecnt === 2)
          sizerightindex = i
        if (spacecnt === 3)
          numrighrindex = i  
        }
      }
      if(that.data.imageList.length === 1){
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray1[' + i + '].cnt']: that.data.resultArray1[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray1[' + i + '].size']: that.data.resultArray1[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray1[' + i + '].num']: that.data.resultArray1[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray1[' + i + '].att']: that.data.resultArray1[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray1[' + i + '].url']: that.data.imgList[i],
            })
            wx.navigateTo({
              url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray1)+'&imgList='+JSON.stringify(that.data.imgList)
            })
          }
      }
      if(that.data.imageList.length === 2){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray2[' + i + '].cnt']: that.data.resultArray2[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray2[' + i + '].size']: that.data.resultArray2[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray2[' + i + '].num']: that.data.resultArray2[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray2[' + i + '].att']: that.data.resultArray2[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray2[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray2[' + i + '].cnt']: that.data.resultArray2[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray2[' + i + '].size']: that.data.resultArray2[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray2[' + i + '].num']: that.data.resultArray2[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray2[' + i + '].att']: that.data.resultArray2[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray2[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray2)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 3){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray3[' + i + '].cnt']: that.data.resultArray3[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray3[' + i + '].size']: that.data.resultArray3[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray3[' + i + '].num']: that.data.resultArray3[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray3[' + i + '].att']: that.data.resultArray3[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray3[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray3[' + i + '].cnt']: that.data.resultArray3[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray3[' + i + '].size']: that.data.resultArray3[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray3[' + i + '].num']: that.data.resultArray3[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray3[' + i + '].att']: that.data.resultArray3[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray3[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray3)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 4){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray4[' + i + '].cnt']: that.data.resultArray4[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray4[' + i + '].size']: that.data.resultArray4[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray4[' + i + '].num']: that.data.resultArray4[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray4[' + i + '].att']: that.data.resultArray4[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray4[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray4[' + i + '].cnt']: that.data.resultArray4[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray4[' + i + '].size']: that.data.resultArray4[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray4[' + i + '].num']: that.data.resultArray4[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray4[' + i + '].att']: that.data.resultArray4[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray4[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray4)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 5){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray5[' + i + '].cnt']: that.data.resultArray5[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray5[' + i + '].size']: that.data.resultArray5[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray5[' + i + '].num']: that.data.resultArray5[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray5[' + i + '].att']: that.data.resultArray5[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray5[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray5[' + i + '].cnt']: that.data.resultArray5[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray5[' + i + '].size']: that.data.resultArray5[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray5[' + i + '].num']: that.data.resultArray5[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray5[' + i + '].att']: that.data.resultArray5[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray5[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray5)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 6){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray6[' + i + '].cnt']: that.data.resultArray6[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray6[' + i + '].size']: that.data.resultArray6[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray6[' + i + '].num']: that.data.resultArray6[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray6[' + i + '].att']: that.data.resultArray6[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray6[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray6[' + i + '].cnt']: that.data.resultArray6[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray6[' + i + '].size']: that.data.resultArray6[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray6[' + i + '].num']: that.data.resultArray6[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray6[' + i + '].att']: that.data.resultArray6[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray6[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray6)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 7){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray7[' + i + '].cnt']: that.data.resultArray7[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray7[' + i + '].size']: that.data.resultArray7[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray7[' + i + '].num']: that.data.resultArray7[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray7[' + i + '].att']: that.data.resultArray7[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray7[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray7[' + i + '].cnt']: that.data.resultArray7[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray7[' + i + '].size']: that.data.resultArray7[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray7[' + i + '].num']: that.data.resultArray7[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray7[' + i + '].att']: that.data.resultArray7[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray7[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray7)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 8){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray8[' + i + '].cnt']: that.data.resultArray8[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray8[' + i + '].size']: that.data.resultArray8[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray8[' + i + '].num']: that.data.resultArray8[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray8[' + i + '].att']: that.data.resultArray8[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray8[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray8[' + i + '].cnt']: that.data.resultArray8[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray8[' + i + '].size']: that.data.resultArray8[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray8[' + i + '].num']: that.data.resultArray8[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray8[' + i + '].att']: that.data.resultArray8[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray8[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray8)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
      if(that.data.imageList.length === 9){
        if(i+1<that.data.imageList.length){
          console.log(res)
          that.setData({
            ['resultArray9[' + i + '].cnt']: that.data.resultArray9[i].cnt.concat(res.data.substring(0,cntindex)),
            ['resultArray9[' + i + '].size']: that.data.resultArray9[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
            ['resultArray9[' + i + '].num']: that.data.resultArray9[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
            ['resultArray9[' + i + '].att']: that.data.resultArray9[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
            ['resultArray9[' + i + '].url']: that.data.imgList[i],
          })
          that.detect(i+=1)
          if(i+1===that.data.imageList.length){
            console.log(res)
            that.setData({
              ['resultArray9[' + i + '].cnt']: that.data.resultArray9[i].cnt.concat(res.data.substring(0,cntindex)),
              ['resultArray9[' + i + '].size']: that.data.resultArray9[i].size.concat(res.data.substring(sizeleftindex,sizerightindex)),
              ['resultArray9[' + i + '].num']: that.data.resultArray9[i].num.concat(res.data.substring(sizerightindex, numrighrindex)),
              ['resultArray9[' + i + '].att']: that.data.resultArray9[i].att.concat(res.data.substring(numrighrindex, res.data.length-2)),
              ['resultArray9[' + i + '].url']: that.data.imgList[i],
            })
          }
        }
        else{
          wx.navigateTo({
            url: '../PictureResult/PictureResult?result='+JSON.stringify(that.data.resultArray9)+'&imgList='+JSON.stringify(that.data.imgList)
          }) 
        }
      }
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
      let fileid  = res.fileID
      that.setData({
        ['imageList[' + index + '].percent']: 25,
      }),
      db.collection('userlist').where({
        _id: app.globalData.loginid
      }).get({
        success(res) {
          console.log(res)
          if (res.data[0].Remainingspace >= parseInt(JSON.parse(that.data.result)[index].size)){
            that.updateData(fileid, JSON.parse(that.data.result)[index].size)
          }
          else{
            wx.showToast({
              title: '空间不足',
              duration: 2000
            })
          }
        }
      })
      console.log(app.globalData.loginid)
      console.log(fileid)
    },
     
    fail: err => {
      // handle error
      console.log("上传失败",err)
    }
  })
 },
  /**
   * 用户数据空间修改
   */
 updateData( fileid , size){
  let that = this
  db.collection('userlist').doc(app.globalData.loginid).update({
    data:{
      usedspace : _.inc(parseInt(size)),
      Remainingspace: _.inc(-1*parseInt(size)), 
    }
  }).then(res=>{
    console.log(res);
    that.addData(fileid)
  })
 },
 /**
   * 用户历史记录修改
   */
 addData(fileid) {
  let that = this
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  db.collection('userhis').add({
    data:{
      time: year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second,
      fileID: fileid,
      user: app.globalData.loginid
    },
    success(res){
      console.log("添加成功",res)
      console.log(fileid)
      that.addImagePath(fileid)

    },
    fail(res){
      console.log("添加失败",res)
    }
  })
 },
 addImagePath(fileid) {
  var that = this 
  console.log(fileid)
  wx.cloud.getTempFileURL({
    fileList: [fileid],
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