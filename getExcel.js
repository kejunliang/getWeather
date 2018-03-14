var xlsx = require('node-xlsx');
var fs = require('fs');

/**
 * 功能：根据传进来的参数去excel里对比找到对应地点坐标并返回
 * @param {*} data  地点参数 
 * 作者：kejl
 */
var  getExcel=function(data){
    return new Promise(function (resolve,reject) {
        //读取文件内容
        var obj = xlsx.parse(__dirname+'/weatherData.xlsx');
        var excelObj=obj[0].data;
              
        var location=data;
        var resLocationcode="";
        excelObj.forEach(element => {
            //console.log(element[2])
            if(location===element[2]){
                resLocationcode=element[0]
            }
        });
        resolve(resLocationcode)
    })
}
//导出数据
module.exports=getExcel
