var net = require('net');
var qs = require('querystring');
var fs = require('fs')
var buf = new Buffer.alloc(1024);
server = net.createServer(function(socket){
    socket.on('data',function(data){
        //把获取的响应转成数组
        var arr = data.toString().split('\r\n');
        //获取服务器地址和端口
        var host = arr[1];
        //获取传输方式
        var method = arr[0].split(' ')[0];
        //获取路径
        var path = arr[0].split(' ')[1];
        var index = path.indexOf('?');
        if(index>0){
            path = path.slice(0,index);
        }
        if(host == 'Host: 127.0.0.1:8001'){
            // console.log(method);
            // console.log(path);
            // console.log(data.toString());
            success(socket,path,method);
            admin(socket,path,method,data);
            login(socket,path,method,data);
        }
        socket.end();
    });

    socket.on('end',function(){
		
    });
});

server.listen('8001','127.0.0.1');
console.log("server listening on 127.0.0.1:8001");

function success(obj,path,method){
    if(path == '/' && method == 'GET'){
        obj.write('HTTP/1.1 200\nContent-Type: text/html\n\n');
        obj.write('<meta charset="UTF-8">');
        obj.write('<h1>welcome</h1><a href="/admin">进入管理后台</a>');
    }
}

function admin(obj,path,method,data){
    if(path == '/admin' && method == 'GET'){

        //判断cookie是否存在
        var cookie = data.toString().match(/Cookie:(.*?)\r\n/);
        if(cookie){
            cookie[1] = cookie[1].trim();
            var obj_cookie = qs.parse(cookie[1]);
            //判断cookie中是否包含SESSID
            if(obj_cookie.SESSID){
                //判断文件是否存在
                var exist = fs.existsSync('./'+obj_cookie.SESSID);
                if(exist){
                    data = fs.readFileSync('./'+obj_cookie.SESSID, 'utf8');
                    obj.write('HTTP/1.1 200\nContent-Type: text/html\n\n');
                    obj.write('<meta charset="UTF-8">');
                    obj.write('<h1>' + data + '</h1>');
                }else{
                    obj.write('HTTP/1.1 302\nlocation: http://127.0.0.1:8001/login');
                }

            }else{
                obj.write('HTTP/1.1 302\nlocation: http://127.0.0.1:8001/login');
            }

        }else{
            obj.write('HTTP/1.1 302\nlocation: http://127.0.0.1:8001/login');
        }
        
    }
}

function login(obj,path,method,data){

    if(path == '/login' && method == 'GET'){
        obj.write('HTTP/1.1 200\nContent-Type: text/html\n\n');
        obj.write('<meta charset="UTF-8">');
        obj.write('<form action="" method="post">');
        obj.write('用户名：<input type="text" name="username"><br>');
        obj.write('密码：<input type="password" name="password"><br>');
        obj.write('<input type="submit" value="登陆">');
        obj.write('</form>');

    }else if(path == '/login' && method == 'POST'){

        //获取参数
        var pathData = data.toString().split('\r\n\r\n')[1];
        //把参数转为对象
        var parameter = qs.parse(pathData);
        var uname = parameter.username;
        var pwd = parameter.password;

        //判断登陆是否成功
        if(uname === 'admin' && pwd === '123456'){
            //生成文件名
            var char = "0123456789abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM";
            var fileName = '';

            for(var i=0;i<8;i++){
                let index = Math.floor(Math.random()*char.length);
                fileName += char[index];
            }

            //创建文件
            fs.writeFile(fileName,uname,function(error){
                if(error){
                    return console.log(error);
                }
            });

            obj.write('HTTP/1.1 302\nSet-Cookie:SESSID=' + fileName + '\nlocation:http://127.0.0.1:8001/admin');

        }else{
            obj.write('HTTP/1.1 302\nlocation: http://127.0.0.1:8001/login\nContent-Type: text/html\n\n');
        }
        
    }
}