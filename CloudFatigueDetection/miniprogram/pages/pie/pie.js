import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['20%', '40%'],
      data: [{
        value: app.globalData.normalcnt,
        name: 'normal'
      }, {
        value: app.globalData.fatiguecnt,
        name: 'fatigure'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({
  data:{
    result: "",
    normalcnt: 0,
    fatiguecnt: 0
  },
  onLoad: function (options) {
    console.log(options.normalresult)
    console.log(options.fatigueresult)
    if (options.normalresult === NaN) {
      options.normalresult = 0 
    }
    if (options.fatigueresult === NaN) {
      options.fatigueresult = 0
    }
    this.setData({
      normalcnt: options.normalresult,
      fatiguecnt: options.fatigueresult
    })
    app.globalData.normalcnt = options.normalresult 
    app.globalData.fatiguecnt = options.fatigueresult


},
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {

  }, 
});