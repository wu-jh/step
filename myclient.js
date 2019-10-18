var net = require("net");

var client = net.connect({port:'1337'},function(){
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable',function(){
        var chunk = process.stdin.read();
	    if(chunk !== null){
	        client.write(chunk);
	    }
    });
});

client.on('data',function(data){
    console.log(data.toString());
});

client.on('end',function(){
    console.log('Disconnect from server');
});
