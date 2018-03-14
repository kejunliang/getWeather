


const Koa = require('koa');
const app = new Koa();
var getW=require("./getWeath");

app.use(async ctx => {
        console.log(ctx.request.path)
    
     if (ctx.request.path == '/getWeather') {
        //等待爬虫返回数据
        var location="西安"
         
         await  getW(location).then(function(data){
                ctx.response.type="json"
                ctx.response.body = data;
            })
       
        
      } else {
        ctx.response.type="json"
        ctx.response.body = "{'itme':'未找到数据资源'}";
      }
});
console.log("启动服务在端口:3000")
app.listen(3000);

