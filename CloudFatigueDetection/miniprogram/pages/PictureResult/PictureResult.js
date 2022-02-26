// pages/PictureResult/PictureResult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShown: false

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(JSON.parse(options.result))
        console.log(JSON.parse(options.imgList))
        this.setData({
            result:JSON.parse(options.result),
            imgList:JSON.parse(options.imgList)
        })
    },
    _cancelEvent(e) {
        console.log('你点击了取消');
        //do something when cancle is clicked
        this.setData({
            isShown: false
        })
    },

    _confirmEvent(e) {
        console.log('你点击了确定');
        ////do something when sure is clicked
        this.setData({
            isShown: false
        })
    } ,
    more: function () {
        this.setData({
            isShown: true
        })
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})