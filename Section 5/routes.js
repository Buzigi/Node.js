const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/')
        {
            res.setHeader('content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body><h1>Hi</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end();
        }
        if(url === '/message' && method === 'POST')
        {
            const body = [];
            req.on('data', (chunk)=>{
                body.push(chunk);
            });
            return req.on('end', ()=>{
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('message.txt', message, (err)=>{
                    res.writeHead(302, {'Location': '/'});
                    return res.end();
                });
            })
            
        }
}

module.exports = requestHandler;