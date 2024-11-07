const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    console.log('request made');
    res.setHeader('content-type','text/html');
    fs.readFile('./html/main.html', (err,data) => {
        if (err) {
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end();

        }
    })
    
});
server.listen(3000,'localhost',() => {
    console.log('listening for requests on port 3000')
});