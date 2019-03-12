const os = require('os');
const http = require('http');
let cnt = 0;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); 
   var url = req.url;
    if(url ==='/healthz'){
       res.write('<h1>contact us page<h1>'); 
       res.end(); 
    } else {
        res.end(`Node Hello on ${os.hostname()}:${cnt++} \n`);
    }
   }).listen(8080, function(){
    console.log("server start at port 8080"); 
});
