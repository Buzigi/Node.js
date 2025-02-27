const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/')
    {
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>Hi there! Welcome!</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/users')
    {
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write(`
        <body>
            <h1>List of Users</h1>
                <ul>
                <li>User 1: John Doe</li>
                <li>User 2: Jane Smith</li>
                <li>User 3: Alice Johnson</li>
                <li>User 4: Bob Brown</li>
                <li>User 5: Charlie Davis</li>
                </ul>
        </body>`);
        res.write('</html>');
        return res.end();
    }
    else if(url === '/create-user' && method === 'POST')
    {
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(`username is ${username}`);
            res.writeHead(302, {'Location': '/'});
            return res.end();
        })
        
    }
}

module.exports = requestHandler;