var net = require('net');
var clientList = [];
server = net.createServer(function(socket){
    clientList.push(socket);
    socket.name = '';
    socket.write("Please input your name.\r\n");
    console.log('conneted: ' + socket.remoteAddress + ':' + socket.remotePort);
    socket.on('data',function(data){
        if(!this.name){
			var match = true;
			for(var i=0;i<clientList.length;i++){
				if(clientList[i].name == data.toString().replace('\n','')){
					this.write("该名字已经被使用，请重新输入");
					match = false;
				}
			}

			if(match){
				this.write('success!');
				this.name = data.toString().replace('\n','');
				console.log('on data login: ' + data.toString());
			}
			
		}else{
			var record = this.name + ':' + data.toString();
			var str = data.toString();
			console.log(record);
			if(str[0] == '@'){
				var private = str.slice(1,str.indexOf(' '));
				var tmp = false;
				for(var i=0;i<clientList.length;i++){
					if(clientList[i].name == private && clientList[i] !== this){
						clientList[i].write(`${this.name}:${data}`);
						tmp = true;
					}
				}
				if(!tmp){
					this.write("找不到你@的用户");
				}
			}else{
				for(var i=0;i<clientList.length;i++){
					if(clientList[i] === this){
						continue;
					}
		
					if(clientList[i].name){
						clientList[i].write(`${this.name}:${data}`);
					}
				}
			}
			
		}
    });

    socket.on('end',function(){
		console.log(this.name + ' sign out');
		for(var i=0;i<clientList.length;i++){
	        if(clientList[i] === this){
				var index = i;
				continue;
			}

			if(clientList[i].name){
				clientList[i].write(this.name + ' sign out');
			}
		}
		clientList.splice(index,1);
    });
});

server.listen('1337','127.0.0.1');
console.log("server listening on 127.0.0.1:1337");
