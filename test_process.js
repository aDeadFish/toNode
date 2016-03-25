'user strict';

if(typeof(window)==='undefined'){
	console.log('node.js');
}else{
	console.log('browser');
}

var fs=require('fs');
var http=require('http');
var url=require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

try {
	var data = fs.readFileSync('input.txt', 'utf-8');
	console.log(data);
}catch(err){
	console.log(err);
}

var text_data='Hello, Node.js';
//参数依次为文件名、数据和回调函数
fs.writeFile('input.txt',text_data,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('ok.');
	}
});
try{
	fs.writeFileSync('input.txt',text_data);
	console.log('ok.');
}catch(err){
	console.log(err);
}
//statSync();
fs.stat('input.txt',function(err,stat){
	if(err){
		console.log(err);
	}else{
		console.log('isFile: '+stat.isFile());
		console.log('isDirectory: '+stat.isDirectory());
		if(stat.isFile()){
			console.log('size: '+stat.size);
			console.log('birth time: '+stat.birthtime);
			console.log('modified time: '+stat.mtime);
		}
	}
});
try {
	var statInfo = fs.statSync('input.txt');
	console.log('isFile: '+statInfo.isFile());
	console.log('isDirectory: '+statInfo.isDirectory());
	if(statInfo.isFile()){
		console.log('size: '+statInfo.size);
		console.log('birth time: '+statInfo.birthtime);
		console.log('modified time: '+statInfo.mtime);
	}
}catch(err){
	console.log(err);
}

fs.readFile('2D.png',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
		console.log(data.length+'bytes');
		//var text=data.toString('utf-8');
		//console.log(text);
	}
});

//流形式读出
var rs=fs.createReadStream('input.txt','utf-8');

rs.on('data',function(chunk){
	console.log('DATA:'+chunk);
});

rs.on('end',function(){
	console.log('END');
});

rs.on('error',function(err){
	console.log('ERROR: '+err);
});


//流形式写入

var ws1=fs.createWriteStream('input.txt','utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END');
ws1.end();

var ws2=fs.createWriteStream('input.txt');
ws2.write(new Buffer('使用Stream写入二进制文本数据...\n','utf-8'));
ws2.write(new Buffer('END','utf-8'));
ws2.end();

var ws3=fs.createWriteStream('output.txt');
rs.pipe(ws3);

process.on('exit',function(code){
	console.log("about to exit with code" + code);
});
process.nextTick(function(){
	console.log("nextTick callback!");
});


console.log("nextTick was set!");
console.log("nextTick was set!2");


var server=http.createServer(function(request,response){
	console.log(request.method + ';' +request.url);
	response.writeHead(200,{'content-Type':'text/html'});
	response.end('<h1>Hello world!</h1>');
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
