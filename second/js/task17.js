
window.onload=function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var timeRadio=document.getElementsByName("gra-time");
var citySelect=document.getElementById("city-select");
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var key in aqiSourceData){
    chartData[key]={};
    chartData[key].day=[];
    chartData[key].week=[];
    chartData[key].month=[];
    var count=0,weekSum=0,monthSum=0;
    for(var i in aqiSourceData[key]){
        chartData[key].day.push(aqiSourceData[key][i]);
        count++;
        weekSum+=aqiSourceData[key][i];
        monthSum+=aqiSourceData[key][i];
        if(count%7===0){
            chartData[key].week.push(Math.round(weekSum/7));
            weekSum=0;
        }
        if(count===31||count===60||count===91){
            if(count===60){
                chartData[key].month.push(Math.round(monthSum/29))
            }
            else{
                chartData[key].month.push(Math.round(monthSum/31));
            }
            monthSum=0;
        }
    }
  }
}
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: 0
}

/**
 * 渲染图表
 */
function renderChart() {
    var city=["北京","上海","广州","深圳","成都","西安","福州","厦门","沈阳"];
    var time=["day","week","month"];
    var width=["7px","30px","100px"];
    var container=document.getElementById("aqi-chart-wrap");
    var str="";
    var data=chartData[city[pageState.nowSelectCity]][time[pageState.nowGraTime]];
    for(var i=0;i<data.length;i++){
        str+="<div title='日期:"+getDay(i,time[pageState.nowGraTime])+"\n污染指数:"+data[i]+"' style='height:"+data[i]+"px;background-color:"+getColor(data[i])+";width:"+width[pageState.nowGraTime]+"''></div>";
    }
    container.innerHTML=str;
    function getDay(num,size){
      if(size==="day"){  
        if(num>59){return "2016-03-"+(num-59>9?num-59:'0'+(num-59))}
        else if(num>30){return "2016-02-"+(num-30>9?num-30:'0'+(num-30))}
        else return "2016-01-"+(num>9?num+1:'0'+(num+1))
        }
      else if(size==="week")return "2016年第"+(num+1)+"周";
      else return "2016年"+(num+1)+"月";
    }
    function getColor(num){
        var color=["#666","#4F4F2F","#2F4F2F","green","#5C4033","blue","yellow","#9F5F9F","red","#aaa","black"]
        return color[Math.floor(num/50)];
    }
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  pageState.nowGraTime=getCheck();
  renderChart();
  function getCheck(){
    for(var i=0;i<timeRadio.length;i++){
        if(timeRadio[i].checked){return i;}
    }
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  pageState.nowSelectCity=this.selectedIndex;
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    for(var i=0;i<timeRadio.length;i++){
        timeRadio[i].onclick=graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onclick=citySelectChange;
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();

renderChart();
}