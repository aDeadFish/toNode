'use strict';

var
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
	// 获得URL的path，类似 '/css/bootstrap.css':
	var pathname = url.parse(request.url).pathname;
	var location = url.parse(request.url).href;
	console.log(location);
	// 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
	var fullpath = path.join(root, pathname);
	// 获取文件状态:
	fs.stat(fullpath, function (err, stats) {
		if (!err && stats.isFile()) {
			// 没有出错并且文件存在:
			console.log('200 ' + request.url);
			// 发送200响应:
			response.writeHead(200);
			// 将文件流导向response:
			fs.createReadStream(fullpath).pipe(response);
		}else if(!err && stats.isDirectory()){
			fs.readdir(fullpath, function(err, files){
				if (err) {
					console.log("no files found in this dir!");
				} else {
					console.log("list all files and dirs!");
					var list = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Document</title></head><body>';
					for (var file of files) {
						console.log(file);
						var filepath = path.join(location, file);
						console.log(filepath);
						list += '<a href="' + filepath + '">' + file + '</a><br />';
					}
					list += '</body></html>';
					response.end(list);
				}
			});
		} else {
			// 出错了或者文件不存在:
			console.log('404 ' + request.url);
			// 发送404响应:
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');