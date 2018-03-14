
var http=require("http");
var fs=require("fs");
var cheerio=require("cheerio"); //需要导入模块
var request=require("request");  //需要导入模块
var iconv= require('iconv-lite') //需要导入模块
var getE=require("./getExcel");
/*
功能：根据url分析页面内容并返回天气json
备注：
作者：kejl
日期：
*/
const getWeather=function (argument){


   //创建promise 等待获取结果返回后再执行下一步操作
    return new Promise(function(resolve,reject){
      //101010100为地点
      console.log(argument)
      getExcel(argument).then(function(reslaocatcode){
        console.log("进来了llllll"+reslaocatcode)
        location=reslaocatcode //这里需要做地点对应表 后期计划 方法为 getLoaction()
        var url ="http://www.weather.com.cn/weather/"+location+".shtml"
        console.log('正在爬取 ' + url + '\n');  
        http.get(url,function(res){
              var chunks=[]
              res.on("data",function(data){
                      chunks.push(data)
              })
              res.on("end",function(){
                  
                  // 将二进制数据解码成 gb2312/utf-8 编码数据
                  var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
                // console.log(html)
                  var $ = cheerio.load(html,{decodeEntities: false});
                  //获取数据  根据中国天气网分析结果得来的               
                  var AllHtml=$('#7d').html(); //获取html字符串
                  var weatherData=AllHtml.substring(AllHtml.indexOf("<script>"),AllHtml.indexOf("</script>"))
                  weatherData=weatherData.substring(weatherData.indexOf("=")+1,weatherData.length)
                  //json数据 返回数据               
                  resolve(weatherData)
              })
         }).on('error',function (e) {  
          reject(e);  
          console.log("获取课程数据出错！");  
         }) 
      })
    
   
      
    }) 
}

var getExcel=function(location){
   return  new  Promise(function(resolve,reject){
    getE(location).then(function(obj){
         console.log("返回的地点标记"+obj)
         resolve(obj)
    })
   })
}





//将获取方法返回供主方法调用
module.exports=getWeather





/*
功能：html实体转移
备注：
作者：参考
日期：
*/
function htmlDecode(str) { 
  // 一般可以先转换为标准 unicode 格式（有需要就添加：当返回的数据呈现太多\\\u 之类的时）
  str = unescape(str.replace(/\\u/g, "%u"));
  // 再对实体符进行转义
  // 有 x 则表示是16进制，$1 就是匹配是否有 x，$2 就是匹配出的第二个括号捕获到的内容，将 $2 以对应进制表示转换
  str = str.replace(/&#(x)?(\w+);/g, function($, $1, $2) {
    return String.fromCharCode(parseInt($2, $1? 16: 10));
  });
  return str;
}



 
 