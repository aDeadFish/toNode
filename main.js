var fs = require("fs");
var http =  require('http');
var textData;


fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    textData=data.toString();
    console.log(data.toString());
});

http.createServer(function(request,response){
	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	// var textData=data.toString();
	console.log(textData);
	response.end(textData);
}).listen(8888);

console.log("程序执行结束!");