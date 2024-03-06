const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/write') {
        // Write data to a file
        fs.writeFile('data.txt', 'Hello, world!', (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error writing to file');
            } else {
                res.statusCode = 200;
                res.end('Data written to file');
            }
        });
    } else if (req.url === '/read') {
        // Read data from a file
        fs.readFile('data.txt', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.statusCode = 200;
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
