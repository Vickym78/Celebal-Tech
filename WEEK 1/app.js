const http =require("http");
Port = 3000;
const server = http.createServer(function(req,res){
        req.write("Hello World");
})


server.listen(Port,()=>{
        console.log("Connected to Server at port",Port);
})
