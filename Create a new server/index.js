const http=require('http');
const fs =require('fs');
const path = require('path');
const url = require('url');

////////////////////////////////////////////////////////////////////
const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  // console.log(q);
  let pathname = q.pathname;
  if (pathname === "/") {
    pathname= "/index";
  } 
  pathname += ".html";
  const readFilePro=fs.readFile("docs" + pathname,'utf8', (err, data) => {
    if (err) {
      console.log(err.message);
      res.writeHead(404, { "content-type": "text/plain" });
      res.write("404- file not found");
      res.end();
    } else if(typeof readFilePro !="utf-8") {
      
      res.writeHead(500, { "content-type": "text/plain" });
      res.write("500- file can not be read");
      res.end();
               
    } else  {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      
      res.end();
    }
  })
  
  // if (q.pathname === "/") {
  //   res.writeHead(200, { "content-type": "application/json" });
  //   res.write(JSON.stringify({ now: new Date() }));
  //   res.end();
  // } else if (q.pathname=== "/about") {
  //   res.writeHead(200, { "content-type": "text/plain" });
  //   let msg = `${q.query.name} is ${q.query.age} years old`;
  //   res.write(msg);
  //   res.end();
  // } else {
  //   res.end("invalid request");
  // }
 
    
});
server.on("error", (err) => {
  console.log(err.message);
})

server.listen(3001,()=>{
  console.log('listening to requests on port 3001')
});



