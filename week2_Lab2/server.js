let http = require('http');
let fs = require('fs');
let fileName = 'index.html';
http.createServer(function (request, response) {
    console.log('request ', request.url);
    let url = request.url;
    console.log('request ', url);
    switch (url) {
        case '/':
            fileName = 'index.html';
            break;
        case '/assessments':
            fileName = 'assessments.html';
            break;
        case '/topics':
            fileName = 'topics.html';
            break;
        default:
            fileName = '404.html';
            break;
    }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');

